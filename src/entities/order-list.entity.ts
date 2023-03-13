import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
