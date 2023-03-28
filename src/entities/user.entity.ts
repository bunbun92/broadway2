import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Content } from './content.entity';
import { Like } from './like.entity';
import { Theater } from './theater-info.entity';
import { PriceInfo } from './theater-price.entity';
import { SeatsInfo } from './theater-seats.entity';
import { TimeSale } from './time-sale.entity';

@Entity({ schema: 'broadway', name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Index({ unique: true })
  @Column()
  userId: string;

  @Column('varchar', { length: 10, select: false })
  password: string;

  @Column('varchar', { length: 10 })
  name: string;

  @Column('varchar')
  email: string;

  @Column('int')
  userType: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(type => Content, contents => contents.users)
  contents: Content;

  @OneToMany(type => TimeSale, timeSale => timeSale.users)
  timeSale: TimeSale;

  @OneToMany(type => Theater, theaterInfo => theaterInfo.users)
  theaterInfo: Theater;

  @OneToMany(type => PriceInfo, priceInfo => priceInfo.users)
  priceInfo: PriceInfo;

  @OneToMany(type => SeatsInfo, seatsInfo => seatsInfo.users)
  seatsInfo: SeatsInfo;

  @OneToMany(() => Comment, comments => comments.user)
  comments: Comment[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];
}
