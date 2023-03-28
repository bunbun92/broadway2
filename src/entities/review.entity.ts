import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { KopisApi } from './kopisApi.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity({ schema: 'broadway', name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar')
  performId: string;

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

  @ManyToOne(() => KopisApi, KopisApi => KopisApi.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'performId', referencedColumnName: 'performId' })
  kopisApi: KopisApi;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
