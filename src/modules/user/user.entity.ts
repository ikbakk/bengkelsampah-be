import { Role } from 'src/types/enums/role';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { Customer } from '../customer/customer.entity';
import { Driver } from '../driver/driver.entity';
import { Member } from '../member/member.entity';
import { Partner } from '../partner/partner.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  passwordHash: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address?: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role;

  @OneToOne(() => Partner, (partner) => partner.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'partnerID' })
  partner?: Partner;

  // Customer-specific info
  @OneToOne(() => Customer, (customer) => customer.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'customerID' })
  customer?: Customer;

  // Driver-specific info
  @OneToOne(() => Driver, (driver) => driver.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'driverID' })
  driver?: Driver;

  // Member-specific info (linked to a Waste Bank)
  @OneToOne(() => Member, (member) => member.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'memberID' })
  member?: Member;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @CreateDateColumn()
  createdAt: Date;
}
