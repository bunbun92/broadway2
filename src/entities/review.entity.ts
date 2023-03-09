import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
