import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './content.entity';
import { User } from './user.entity';

@Entity({ schema: 'board', name: 'timeSale' })
export class TimeSale {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  contentId: number;

  @Column('datetime')
  startTime: string;

  @Column('datetime')
  endTime: string;

  @Column('float')
  rate: number;

  @Column('int')
  userId: number;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(type => User, users => users.timeSale)
  @JoinColumn({ name: 'userId' })
  users: User;

  @OneToOne(type => Content, contents => contents.timeSale)
  @JoinColumn({ name: 'contentId' })
  contents: Content;
}
