import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/entities/content.entity';
import { OrderList } from 'src/entities/order-list.entity';
import { Seat } from 'src/entities/seats.entity';
import { TimeSale } from 'src/entities/time-sale.entity';
import { In, Not, Repository } from 'typeorm';

@Injectable()
export class OrderSeatsService {
  constructor(
    @InjectRepository(Content) private contentRepository: Repository<Content>,
    @InjectRepository(Seat) private seatRepository: Repository<Seat>,
    @InjectRepository(TimeSale)
    private timeSaleRepository: Repository<TimeSale>,
    @InjectRepository(OrderList)
    private orderListRepository: Repository<OrderList>
  ) {}
  //공연 정보 상세 출력 (모든 회차)
  async getContentsByPerformId(performId: string) {
    const contents = await this.contentRepository.find({
      where: {
        deletedAt: null,
        performId,
      },
      relations: ['kopisApi'],
    });

    //타임세일이 진행중일 때만 값이 반환됨 (length > 0)
    const timeSale = await this.getCurrentAllTimeSaleByPerformId(performId);
    if (timeSale.length === 0) {
      return contents;
    }

    return { contents, timeSale };
  }

  //공연 정보 상세 출력 (특정 회차)
  async getAContentByContentId(contentId: number) {
    const content = await this.contentRepository.findOne({
      where: {
        id: contentId,
      },
      relations: ['kopisApi'],
    });

    return content;
  }

  //공연의 특정회차 모든 좌석들의 정보 출력
  async getAllSeatsOfAContent(contentId: number) {
    const seats = await this.seatRepository.find({
      where: {
        contentId,
        deletedAt: null,
      },
      order: { seat: 'ASC' },
    });

    return seats;
  }

  // //공연의 특정회차 모든 좌석들 정보 출력 + 본인의 선택 좌석 정보 출력
  // async getAllSeatsAndMySeatsOfAContent(userId: number, contentId: number){
  //   const query = `

  //   `;
  // }

  //예매 중 좌석 임시 확보(선점)하기
  async seatsReservationTemporarilyWhilePay(
    userId: number,
    contentId: number,
    seats: Array<string>
  ) {
    let tempString = '';
    let falseCount = 0;

    if (seats.length === 0 || seats.length > 4) {
      return { errMsg: '잘못된 접근입니다. 클라이언트 변조 의심' };
    }

    // const timeSale = await this.getCurrentTimeSaleByPerformIdAndPerformRound(
    //   contentId,
    //   performInfo
    // );

    // const timeSaleRate = timeSale[0]['rate'];

    for (let i = 0; i < seats.length; i++) {
      let statusCheck = await this.checkASeatOrderStatus(contentId, seats[i], [
        0,
      ]);

      if (statusCheck === false) {
        falseCount++;
        tempString += seats[i] + ' ';
      }
    }

    if (falseCount > 0) {
      return { errMsg: '이미 선택된 좌석입니다: ' + tempString };
    }

    // for (let i = 0; i < seats.length; i++) {}

    for (let i = 0; i < seats.length; i++) {
      let price = 0;
      const seatInfo = await this.seatRepository.findOne({
        where: {
          contentId,
          seat: seats[i],
        },
      });

      price = seatInfo.price;

      this.seatRepository.update(
        // { contentId, seat: seats[i], deletedAt: null },
        // deletedAt: null 을 하면 안되는 이유가멀까
        { contentId, seat: seats[i] },
        { orderStatus: 1 }
      );

      this.orderListRepository.insert({
        userId,
        contentId,
        orderStatus: 1,
        seat: seats[i],
        priceBeforeDiscount: price,
      });
    }

    return { msg: '좌석 임시확보 성공' };
  }

  //선택(임시확보, 선점)한 좌석 정보 표시
  async getReservedSeats(userId: number, contentId: number) {
    // const seats = await this.orderListRepository.find({
    //   where: {
    //     userId,
    //     contentId,
    //     orderStatus: In([1, 2]),
    //     deletedAt: null,
    //   },
    //   relations: ['seats'],
    // });

    const query = `
      select ol.id, ol.userId, ol.contentId, ol.seat, ol.orderStatus, ol.priceBeforeDiscount, s.theater from orderList ol
      left join seats s on s.contentId = ol.contentId
      where s.seat = ol.seat
      and ol.userId = ${userId}
      and ol.contentId = ${contentId}
      and ol.orderStatus in(1, 2)
      and ol.deletedAt is null
    `;

    const seats = await this.orderListRepository.query(query);

    //타임세일이 진행중일 때만 값이 반환됨 (length > 0)
    const timeSale = await this.getCurrentTimeSaleByContentId(contentId);
    if (timeSale.length > 0) {
      return seats.map(seat => {
        return {
          orderListId: seat.id,
          userId: seat.userId,
          contentId: seat.contentId,
          seat: seat.seat,
          orderStatus: seat.orderStatus,
          timeSaleRate: timeSale[0]['rate'],
          timeSaleEndTime: this.dateToStringForQuery(timeSale[0]['endTime']),
          theater: seat.theater,
          priceBeforeDiscount: seat.priceBeforeDiscount,
          priceAfterDiscount: Math.trunc(
            seat.priceBeforeDiscount * (1 - timeSale[0]['rate'])
          ), //가격 구조 완성되면 제대로 설정해야함
        };
      });
    }

    return seats;
  }

  //좌석 예매
  //가격관련 DB완성되면 결제 관련 기능 추가 필요
  async payReservedSeats(
    userId: number,
    contentId: number,
    seats: Array<string>
  ) {
    let price: number = 1; // 결제관련 DB 구현 후 이부분 수정 필요

    //현재 확보된 DB내의 좌석정보와 req.body에서 받은 좌석정보가 완벽하게 일치하는지 한번 더 검증
    const seatsOrderStatusCheck = await this.getReservedSeatsInfoSpecific(
      userId,
      contentId,
      seats,
      [1, 2]
    );

    if (seatsOrderStatusCheck.length < seats.length) {
      return { errMsg: '잘못된 접근입니다. 좌석 확보 정보 만료' };
    }

    price = seatsOrderStatusCheck[0].priceBeforeDiscount;

    const timeSale = await this.getCurrentTimeSaleByContentId(contentId);

    if (timeSale.length > 0) {
      price *= 1 - timeSale[0]['rate'];
    }

    //아래 orderListRepository와 seatRepository join해서 한번에 바꾸는 방법 고려
    await this.orderListRepository.update(
      {
        userId,
        contentId,
        // deletedAt: null,
        orderStatus: In([1, 2]),
        seat: In(seats),
      },
      { orderStatus: 3, pricePaid: price, timeSaleRate: timeSale[0]['rate'] }
    );

    await this.seatRepository.update(
      {
        contentId,
        // deletedAt: null,
        orderStatus: In([1, 2]),
        seat: In(seats),
      },
      {
        orderStatus: 3,
      }
    );

    return { msg: '구매 성공' };
  }

  //미결제 상태의 좌석 변경
  //contents 테이블 확정되면 공연 시작시간과 연관지어서 변경 못하게 하는 기능 추가 필요
  async editReservedSeats(
    userId: number,
    contentId: number,
    seatsBefore: Array<string>,
    seatsAfter: Array<string>
  ) {
    //DB내의 좌석 정보와 req.body로 받은 좌석정보가 일치하는지 검증
    const seats = await this.getReservedSeatsInfoSpecific(
      userId,
      contentId,
      seatsBefore,
      [1, 2]
    );

    if (seats.length < seatsBefore.length) {
      return { errMsg: '잘못된 접근입니다. 좌석 확보 정보 만료' };
    }

    //기존의 타임스탬프가 훼손되지 않도록 보존 후 입력할것임
    const originalCreatedAt: Date = seats[0].createdAt;

    //orderListId를 반환된 seats에서 추출
    let orderListIds: Array<number> = new Array(seats.length);
    for (let i = 0; i < seats.length; i++) {
      orderListIds[i] = seats[i].id;
    }

    //좌석 전부 해제했을 때
    if (seatsAfter.length === 0) {
      await this.deleteSeatsByIds(userId, orderListIds, [1, 2]);
      return { msg: '좌석 선택 해제 완료' };
    }

    //새로 바꿀 좌석이 다른 고객에게 선택된 좌석인지 검증
    const alreadyChoosedSeats = await this.orderListRepository.find({
      where: {
        userId: Not(userId),
        contentId,
        seat: In(seatsAfter),
      },
      select: {
        seat: true,
      },
    });

    if (alreadyChoosedSeats.length > 0) {
      return {
        errMsg: '이미 다른 고객에게 선택된 좌석입니다.',
        alreadyChoosedSeats,
      };
    }

    //좌석의 갯수가 달라질 때 예외 처리
    // const editLength: number = seatsAfter.length - seatsBefore.length;
    // if (editLength > 0) {
    //   // this.seatsReservationTemporarilyWhilePay()
    // } else if (editLength === 0) {
    //   for (let i = 0; i < editLength; i++) {
    //     await this.orderListRepository.;
    //   }
    // } else {
    // }

    //일괄 예매취소 후 재예매 하는 방식으로 구현.
    await this.deleteSeatsByIds(userId, orderListIds, [1, 2]);
    await this.seatsReservationTemporarilyWhilePay(
      userId,
      contentId,
      seatsAfter
    );

    //createdAt을 기존의 타임스탬프로 변경
    //논의 해보고 이 정보를 담을 컬럼 새로 추가 유무 결정
    await this.orderListRepository.update(
      { userId, contentId, seat: In(seatsAfter) },
      { createdAt: originalCreatedAt }
    );

    return { msg: '좌석 변경 완료' };
  }

  //좌석 예매 취소 - 입력한 orderStatus Array에 해당하는 좌석 취소 (결제, 미결제 다 가능)
  //contents 테이블 확정되면 공연 시작시간과 연관지어서 환불 못하게 하는 기능 추가 필요
  async deleteSeatsByIds(
    userId: number,
    orderListIds: Array<number>,
    orderStatusArray: Array<number>
  ) {
    //해당 유저의 orderListId가 올바른지 먼저 검증
    const orders = await this.orderListRepository.find({
      where: {
        userId,
        id: In(orderListIds),
        orderStatus: In(orderStatusArray),
      },
    });

    if (orders.length !== orderListIds.length) {
      return { msg: '잘못된 접근입니다.' };
    }

    const query = `
      update seats s
      left join orderList ol on s.contentId = ol.contentId
      set s.orderStatus = 0
      where s.deletedAt is null
      and s.seat = ol.seat
      and ol.id in (${orderListIds})
    `;

    // seats 테이블 orderStatus 초기화
    await this.seatRepository.query(query);
    await this.orderListRepository.softDelete(orderListIds);

    if (orderStatusArray.includes(3) && orderStatusArray.length === 1) {
      return { msg: '예매 취소 성공' };
    } else {
      return { msg: '좌석 해제 성공' };
    }
  }

  //선점 좌석 해제 기능 (deleteSeatsById와 기능적으로 동일)
  async releaseSeatsByIds(
    userId: number,
    orderListIds: Array<number>,
    orderStatusArray: Array<number>
  ) {
    const msg = await this.deleteSeatsByIds(
      userId,
      orderListIds,
      orderStatusArray
    );

    return msg;
  }

  //contentId 받아서 좌석 예매 취소
  async deleteSeatsByContentId(
    userId: number,
    contentId: number,
    orderStatusArray: Array<number>
  ) {
    // contentId에 해당하는 예매내역이 있는지 먼저 검증
    const seats = await this.orderListRepository.find({
      where: {
        userId,
        contentId,
        orderStatus: In(orderStatusArray),
      },
    });

    if (seats.length === 0) {
      return { errMsg: '잘못된 접근입니다. 좌석 확보 정보 만료' };
    }

    //seats 에서 orderListId 배열 추출
    let orderListIds: Array<number> = new Array(seats.length);
    for (let i = 0; i < seats.length; i++) {
      orderListIds[i] = seats[i].id;
    }
    const msg = await this.deleteSeatsByIds(
      userId,
      orderListIds,
      orderStatusArray
    );

    return msg;
  }

  //지정된 초 만큼 초과된 선점 좌석들 해제 && 일정 주기 실행
  async releaseSeatsInterval(
    exceededSeconds: number,
    orderStatusArray: Array<number>
  ) {
    //현재시간에서 지정된 초 만큼 빼서 timeNow로 toString
    let date: Date = new Date();
    date.setTime(date.getTime() - exceededSeconds * 1000);
    const timeNow: String = this.dateToStringForQuery(date);

    //선점 해제 대상 좌석들 orderList Id find
    //updatedAt이 기준
    let query = `
      select ol.id from orderList ol
      left join seats s on s.contentId = ol.contentId 
      where ol.deletedAt is NULL
      and s.seat = ol.seat
      and ol.orderStatus in (${orderStatusArray})
      and ol.updatedAt < "${timeNow}"
    `;

    const targetSeatsIds = await this.orderListRepository.query(query);

    if (targetSeatsIds.length === 0) {
      return {
        msg: `선점 후 ${exceededSeconds}초 경과한 해제 필요 좌석 없음`,
      };
    }

    let orderListIds: Array<number> = new Array(targetSeatsIds.length);

    //array로 orderList Id들 추출
    for (let i = 0; i < targetSeatsIds.length; i++) {
      orderListIds[i] = targetSeatsIds[i].id;
    }

    //seats테이블 orderStatus 초기화, orderList 테이블 softDelete
    query = `    
      update seats s
      left join orderList ol on s.contentId = ol.contentId
      set s.orderStatus = 0
      where s.deletedAt is null
      and s.seat = ol.seat
      and ol.id in (${orderListIds})
    `;

    await this.seatRepository.query(query);
    await this.orderListRepository.softDelete(orderListIds);

    return {
      msg: `선점 후 ${exceededSeconds}초 경과한 ${targetSeatsIds.length}개의 좌석 선점 해제 완료`,
    };
  }

  //결제내역, 결제 후 취소 내역 모두 출력
  async getAllOrders(userId: number) {
    const orders = await this.orderListRepository.find({
      where: {
        userId,
        orderStatus: 3,
      },
      order: {
        id: 'DESC',
      },
    });

    return orders;
  }

  async getAnOrder(userId: number, orderId: number) {
    const order = await this.orderListRepository.findOne({
      where: {
        id: orderId,
        userId,
        orderStatus: 3,
      },
    });

    return order;
  }

  //진행중 or 예매완료된 예매 모두 출력
  async getAllProcessingReservations(
    userId: number,
    orderStatusArray: Array<number>
  ) {
    const query = `
      select ol.id, ol.contentId, ol.orderStatus, c.performRound, k.performName, c.performDate from orderList ol
      left join contents c on c.id = ol.contentId
      left join kopisApi k on k.performId = c.performId 
      where ol.orderStatus in (${orderStatusArray})
      and ol.userId = ${userId}
      and ol.deletedAt is null
      group by ol.contentId 
      order by ol.id desc
    `;

    const reservations = await this.orderListRepository.query(query);

    return reservations;
  }

  // 여기서부터 API 미연결 함수들
  //타임세일 정보 출력 (모든 회차)
  async getCurrentAllTimeSaleByPerformId(performId: string) {
    let today: Date = new Date();
    let timeNow: string = this.dateToStringForQuery(today);

    let query = `
      select c. performId, ts.contentId, c.performRound, rate, startTime, endTime from contents c
      left join timeSale ts on c.id = ts.contentId 
      where c.deletedAt is null
      and ts.deletedAt is null
      and c.performId = "${performId}"
      and ts.endTime > "${timeNow}"
      and ts.startTime < "${timeNow}"
      `;

    const timeSale = await this.timeSaleRepository.query(query);

    return timeSale;
  }

  //타임세일 정보 출력 (특정 회차)
  async getCurrentTimeSaleByContentId(contentId: number) {
    let today: Date = new Date();
    let timeNow: string = this.dateToStringForQuery(today);

    let query = `
      select c. performId, ts.contentId, c.performRound, rate, startTime, endTime from contents c
      left join timeSale ts on c.id = ts.contentId 
      where c.deletedAt is null
      and ts.deletedAt is null
      and ts.contentId = ${contentId}
      and ts.endTime > "${timeNow}"
      and ts.startTime < "${timeNow}"
      `;

    const timeSale = await this.timeSaleRepository.query(query);

    return timeSale;
  }

  //Date 객체를 mySQL의 datetime 타입 양식에 맞게 문자열로 변환
  dateToStringForQuery(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return result;
  }

  //설정한 orderStatus들의 좌석이 존재하는지 검증 함수
  async checkASeatOrderStatus(
    contentId: number,
    seat: string,
    orderStatusArray: Array<number>
  ): Promise<boolean> {
    const result = await this.seatRepository.findOne({
      where: {
        contentId,
        seat,
        orderStatus: In(orderStatusArray),
        deletedAt: null,
      },
    });

    if (result === null) {
      return false;
    }
    return true;
  }

  //예매 정보 올바른지 검증
  async getReservedSeatsInfoSpecific(
    userId: number,
    contentId: number,
    seats: Array<string>,
    orderStatusArray: Array<number>
  ) {
    const result = await this.orderListRepository.find({
      where: {
        userId,
        contentId,
        deletedAt: null,
        orderStatus: In(orderStatusArray),
        seat: In(seats),
      },
    });

    return result;
  }
}
