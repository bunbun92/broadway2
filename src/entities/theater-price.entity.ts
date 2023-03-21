import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KopisApi } from './kopisApi.entity';
import { Theater } from './theater-info.entity';
import { User } from './user.entity';

@Entity({ schema: 'broadway', name: 'priceInfo' })
export class PriceInfo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  grade: number;

  @Column('int')
  price: number;

  @Column('varchar', { length: 30 })
  performId: string;

  @Column('int')
  theaterId: number;

  @Column('int')
  userId: number;

  @ManyToOne(type => User, users => users.priceInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  users: User;

  @ManyToOne(type => Theater, theaterInfo => theaterInfo.priceInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'theaterId' })
  theaterInfo: Theater;

  @ManyToOne(type => KopisApi, kopisApi => kopisApi.priceInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'performId', referencedColumnName: 'performId' })
  kopisApi: KopisApi;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
