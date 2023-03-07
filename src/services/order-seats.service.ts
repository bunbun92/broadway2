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
  //타임세일 정보 출력 (타 메소드에 포함시켜 사용)
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

    // console.log(today + '//' + timeNow);

    // const content = await this.timeSaleRepository.findOne({
    //   where: {
    //     deletedAt: null,
    //     id: contentId,
    //   },
    //   relations: ['content'],
    // });

    // console.log(timeNow < content.end);
    // console.log(timeNow > content.end);
    // console.log(timeNow === content.end);

    // console.log(this.dateToStringForQuery(today));

    return timeSale;
  }

  async takeSeats(
    userId: number,
    contentId: number,
    performInfo: number,
    seats: Array<string>
  ) {}

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
}
