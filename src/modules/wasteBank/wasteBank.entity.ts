import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Member } from '../member/member.entity';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class WasteBank {
  @PrimaryGeneratedColumn('uuid')
  wasteBankID: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Member, (member) => member.wasteBank)
  members: Member[];

  @OneToMany(() => Transaction, (transaction) => transaction.wasteBank)
  transactions: Transaction[];
}
