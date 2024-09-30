import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { WasteBank } from '../wasteBank/wasteBank.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  memberID: string;

  @Column()
  wasteBankID: string;

  @Column({ default: 0 })
  balance: number;

  // Relation between Member and WasteBank (Many members can belong to one WasteBank)
  @ManyToOne(() => WasteBank, (wasteBank) => wasteBank.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'wasteBankID' })
  wasteBank: WasteBank;

  @OneToOne(() => User, (user) => user.member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userID' })
  user: User;
}
