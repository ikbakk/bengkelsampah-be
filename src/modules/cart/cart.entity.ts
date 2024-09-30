import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { CartItem } from '../cartItem/cartItem.entity';
import { User } from '../user/user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  cartID: string;

  @Column({ unique: true })
  userID: string;

  @OneToOne(() => User, (user) => user.cart, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userID' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
  })
  cartItems: CartItem[];

  @CreateDateColumn()
  createdAt: Date;
}
