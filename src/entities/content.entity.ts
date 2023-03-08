import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'broadway', name: 'contents' })
export class Content {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  stdate: number;

  @Column('int')
  eddate: number;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('varchar', { length: 50 })
  theater: string;

  @Column('varchar', { length: 50 })
  theaterCode: string;

  @Column('varchar', { length: 50 })
  genreCode: string;

  @Column('int')
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
