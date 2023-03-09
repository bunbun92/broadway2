import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Content } from './content.entity';

@Entity({ schema: 'broadway', name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Index({ unique: true })
  @Column()
  userId: string;

  @Column('varchar', { length: 10, select: false })
  password: string;

  @Column('varchar', { length: 10 })
  name: string;

  @Column('varchar')
  email: string;

  @Column('int')
  userType: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(type => Content, contents => contents.users)
  contents: Content;
}
