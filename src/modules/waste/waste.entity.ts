import { WasteType } from 'src/types/enums/WasteType';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from '../cartItem/cartItem.entity';
import { WasteSubmission } from '../wasteSubmission/wasteSubmission.entity';

@Entity()
export class Waste {
  @PrimaryGeneratedColumn('uuid')
  wasteID: string;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column({
    type: 'enum',
    enum: WasteType,
  })
  wasteType: WasteType;

  @Column()
  unit: string;

  @OneToMany(() => WasteSubmission, (wasteSubmission) => wasteSubmission.waste)
  wasteSubmission: WasteSubmission[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.waste)
  cartItem: CartItem[];
}
