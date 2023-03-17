import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KopisApi } from './kopisApi.entity';
import { PriceInfo } from './theater-price.entity';
import { SeatsInfo } from './theater-seats.entity';
import { User } from './user.entity';

@Entity({ schema: 'broadway', name: 'theaterInfo' })
export class Theater {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { length: 30 })
  theater: string;

  @Column('int')
  userId: number;

  @ManyToOne(type => User, users => users.theaterInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  users: User;

  @OneToMany(type => SeatsInfo, seatsInfo => seatsInfo.theaterInfo)
  seatsInfo: SeatsInfo;

  @OneToMany(type => PriceInfo, priceInfo => priceInfo.theaterInfo)
  priceInfo: PriceInfo;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
