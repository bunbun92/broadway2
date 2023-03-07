import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/entities/content.entity';
import { OrderList } from 'src/entities/order-list.entity';
import { Seat } from 'src/entities/seats.entity';
import { TimeSale } from 'src/entities/time-sale.entity';
import { Repository } from 'typeorm';

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
  //공연 정보 상세 출력
  async getAContent(contentId: number) {
    const content = await this.contentRepository.findOne({
      where: {
        deletedAt: null,
        id: contentId,
      },
    });

    const timeSale = await this.getCurrentTimeSale(contentId);
    if (timeSale.length === 0) {
      return content;
    }

    return { content, timeSale };
  }

  //공연의 모든 좌석들의 정보 출력
  async getAllSeatsOfAContent(contentId: number, performInfo: number) {
    const seats = await this.seatRepository.find({
      where: {
        contentId,
        performInfo,
        deletedAt: null,
      },
    });

    return seats;
  }

  //예매 중 좌석 임시 확보(선점)하기
  async seatsReservationTemporarilyWhilePay(
    userId: number,
    contentId: number,
    performInfo: number,
    seats: Array<string>
  ) {
    let tempString = '';
    let falseCount = 0;
    const timeSale = await this.getCurrentTimeSaleForARound(
      contentId,
      performInfo
    );
    const timeSaleRate = timeSale[0]['rate'];

    for (let i = 0; i < seats.length; i++) {
      let statusCheck = await this.checkASeatOrderStatus(
        contentId,
        performInfo,
        seats[i]
      );
      if (statusCheck === false) {
        falseCount++;
        tempString += seats[i] + ' ';
      }
    }

    if (falseCount > 0) {
      return { msg: '이미 선택된 좌석입니다: ' + tempString };
    } else {
      for (let i = 0; i < seats.length; i++) {
        await this.seatRepository.increment(
          { contentId, performInfo, seat: seats[i] },
          'orderStatus',
          1
        );
      }
    }

    for (let i = 0; i < seats.length; i++) {
      await this.orderListRepository.insert({
        userId,
        timeSaleRate,
        contentId,
        performInfo,
        orderStatus: 1,
        seat: seats[i],
      });
    }

    return { msg: '좌석 임시확보 성공' };
  }

  //좌석 예매
  async buySeats(
    userId: number,
    contentId: number,
    performInfo: number,
    seats: Array<string>
  ) {
    // await this.orderListRepository.update({orderStatus [2, 3]}, {})
    // for (let i = 0; i < seats.length; i++) {}
  }

  // 여기서부터 API 미연결 함수들
  //타임세일 정보 출력 (모든 회차)
  async getCurrentTimeSale(contentId: number) {
    let today: Date = new Date();
    let timeNow: string = this.dateToStringForQuery(today);

    let query =
      `select contentId, performInfo, rate, ` +
      `start` +
      `, ` +
      `end` +
      ` from timeSale ts
      left join contents c on c.id = ts.contentId
      where ts.` +
      `end` +
      ` > "${timeNow}" and ts.contentId = ${contentId}`;

    const timeSale = await this.timeSaleRepository.query(query);

    return timeSale;
  }

  //타임세일 정보 출력 (특정 회차)
  async getCurrentTimeSaleForARound(contentId: number, performInfo: number) {
    let today: Date = new Date();
    let timeNow: string = this.dateToStringForQuery(today);

    let query =
      `select contentId, performInfo, rate, ` +
      `start` +
      `, ` +
      `end` +
      ` from timeSale ts
      left join contents c on c.id = ts.contentId
      where ts.` +
      `end` +
      ` > "${timeNow}" and ts.contentId = ${contentId} and ts.performInfo = ${performInfo}`;

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

  //예매 가능한(orderStatus === 0) 좌석이 있는지 검증 함수
  async checkASeatOrderStatus(
    contentId: number,
    performInfo: number,
    seat: string
  ): Promise<boolean> {
    const result = await this.seatRepository.findOne({
      where: {
        contentId,
        performInfo,
        seat,
        orderStatus: 0,
        deletedAt: null,
      },
    });

    if (result == null) {
      return false;
    }
    return true;
  }
}
