import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ schema: 'broadway', name: 'orderList' })
export class OrderList {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  userId: number;

  @Column('int')
  contentId: number;

  @Column('int')
  performInfo: number;

  @Column('tinyint')
  orderStatus: number;

  @Column('varchar', { length: 10 })
  seat: string;

  @Column('float', { default: 0 })
  timeSaleRate: number | null;

  @Column('int')
  priceBeforeDiscount: number | null;

  @Column('int')
  pricePaid: number | null;

  @Column('int')
  orderId: number | null;

  @ManyToOne(type => Order, orders => orders.orderList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  orders: Order;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
