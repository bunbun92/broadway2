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
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity({ schema: 'broadway', name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Review, review => review.comments)
  @JoinColumn({ name: 'reviewId' })
  review: Review;

  @ManyToOne(() => User, user => user.comments)
  user: User;

  // @Column('int')
  // reviewId: number;

  @Column('int')
  userId: number;

  @Column('varchar', { length: 400 })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
