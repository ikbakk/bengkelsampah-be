import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  customerID: string;

  @Column({ default: 0 })
  balance: number;

  @OneToOne(() => User, (user) => user.customer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userID' })
  user: User;
}
