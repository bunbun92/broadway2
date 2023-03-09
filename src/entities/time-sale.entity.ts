import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './content.entity';

@Entity({ schema: 'board', name: 'timeSale' })
export class TimeSale {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { length: 30 })
  performId: string;

  @Column('datetime')
  start: string;

  @Column('datetime')
  end: string;

  @Column('float')
  rate: number;

  @Column('int')
  performInfo: number;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Content)
  @JoinColumn({ name: 'performId' })
  content: Content;
}
