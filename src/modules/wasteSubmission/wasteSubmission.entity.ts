import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Waste } from '../waste/waste.entity';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class WasteSubmission {
  @PrimaryGeneratedColumn('uuid')
  wasteSubmissionID: string;

  @Column()
  transactionID: string;

  @ManyToOne(() => Transaction, (transaction) => transaction.wasteSubmissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'transactionID' })
  transaction: Transaction;

  @Column()
  wasteID: string;

  @ManyToOne(() => Waste, (waste) => waste.wasteSubmission, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'wasteID' })
  waste: Waste;

  @Column('float')
  totalWeight: number;

  @Column('float')
  totalPrice: number;
}
