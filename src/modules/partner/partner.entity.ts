import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  partnerID: string;

  @Column()
  businessName: string;

  @Column()
  registrationNumber: string;

  @OneToOne(() => User, (user) => user.partner, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userID' })
  user: User;
}
