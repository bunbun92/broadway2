import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity({ schema: 'broadway', name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  contentId: number;

  @Column('int')
  userId: number;

  @Column('int')
  rating: number;

  @Column('varchar', { length: 1000 })
  review: string;

  @OneToMany(() => Comment, comments => comments.review)
  comments: Comment[];

  @OneToMany(() => Like, like => like.review)
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
