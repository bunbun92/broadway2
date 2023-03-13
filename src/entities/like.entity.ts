import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity({ schema: 'broadway', name: 'like' })
export class Like {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  // @Column('int')
  // reviewid: number;

  @ManyToOne(() => Review, review => review.likes)
  review: Review;

  @ManyToOne(() => User, user => user.likes)
  user: User;

  // @Column('int')
  // userid: number;

  @Column('varchar', { length: 400 })
  commnet: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
