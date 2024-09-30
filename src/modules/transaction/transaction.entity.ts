import { TransactionSource } from 'src/types/enums/transactionsSource';
import { TransactionStatus } from 'src/types/enums/transactionStatus';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { WasteBank } from '../wasteBank/wasteBank.entity';
import { WasteSubmission } from '../wasteSubmission/wasteSubmission.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  transactionID: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.READY,
  })
  status: TransactionStatus;

  // User who initiates the transaction
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userID' })
  user: User;

  @CreateDateColumn()
  transactionDate: Date;

  @Column({ nullable: true })
  description?: string;

  @Column()
  address: string;

  @OneToMany(
    () => WasteSubmission,
    (wasteSubmission) => wasteSubmission.transaction,
    {
      cascade: true,
    },
  )
  wasteSubmissions: WasteSubmission[];

  @Column({
    type: 'enum',
    enum: TransactionSource,
  })
  source: TransactionSource;

  // Partner involved in the transaction (nullable)
  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'partnerID' })
  partner?: User;

  @ManyToOne(() => WasteBank, (wasteBank) => wasteBank.transactions, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'wasteBankID' })
  wasteBank?: WasteBank;
}
