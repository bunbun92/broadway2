import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Theater } from './theater-info.entity';
import { User } from './user.entity';

@Entity({ schema: 'broadway', name: 'seatsInfo' })
export class SeatsInfo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  theaterId: number;

  @Column('varchar', { length: 10 })
  seat: string;

  @Column('int')
  userId: number;

  @ManyToOne(type => User, users => users.seatsInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  users: User;

  @ManyToOne(type => Theater, theaterInfo => theaterInfo.seatsInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'theaterId' })
  theaterInfo: Theater;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
