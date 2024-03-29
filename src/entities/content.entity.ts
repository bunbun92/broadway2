import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { KopisApi } from './kopisApi.entity';
import { TimeSale } from './time-sale.entity';
import { User } from './user.entity';

@Entity({ schema: 'broadway', name: 'contents' })
export class Content {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { length: 30 })
  performId: string;

  @Column('int')
  performRound: number;

  @Column('varchar', { length: 30 })
  performDate: string;

  @Column('varchar', { length: 30 })
  performTime: string;

  @Column('int')
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(type => KopisApi, kopisApi => kopisApi.contents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'performId', referencedColumnName: 'performId' })
  kopisApi: KopisApi;

  @ManyToOne(type => User, users => users.contents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  users: User;

  @OneToOne(type => TimeSale, timeSale => timeSale.contents)
  timeSale: TimeSale;
}
