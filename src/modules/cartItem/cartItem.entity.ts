import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { Waste } from '../waste/waste.entity';

@Entity()
@Unique(['cartID', 'wasteID']) // Ensures a combination of cartID and wasteID is unique
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  cartItemID: string;

  @Column()
  cartID: string;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cartID' })
  cart: Cart;

  @Column('float')
  price: number;

  @Column('float')
  weight: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  wasteID: string;

  @ManyToOne(() => Waste, (waste) => waste.cartItem)
  @JoinColumn({ name: 'wasteID' })
  waste: Waste;
}
