import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Content } from './content.entity';
import { Review } from './review.entity';
import { Theater } from './theater-info.entity';
import { PriceInfo } from './theater-price.entity';

@Entity({ schema: 'broadway', name: 'kopisApi' })
export class KopisApi {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { length: 30, unique: true })
  performId: string; //공연 ID

  @Column('varchar', { length: 50 })
  performName: string; //공연명

  @Column('varchar', { length: 30 })
  startDate: string; //공연시작일

  @Column('varchar', { length: 30 })
  endDate: string; //공연종료일

  @Column('varchar', { length: 30 })
  theater: string; //공연장명

  @Column('varchar', { length: 300 })
  poster: string; //포스트이미지경로

  @Column('varchar', { length: 30 })
  genreName: string; //공연장르

  @Column('varchar', { length: 30 })
  performStatus: string; //공연상태

  // @Column('varchar', { length: 10 })
  // openrun: string; // 오픈런

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(type => Content, contents => contents.kopisApi)
  contents: Content;

  @OneToMany(type => PriceInfo, priceInfo => priceInfo.kopisApi)
  priceInfo: PriceInfo;

  @OneToMany(type => Review, reviews => reviews.kopisApi)
  reviews: Review;
}
