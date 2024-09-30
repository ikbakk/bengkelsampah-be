import { DriverStatus } from 'src/types/enums/driverStatus';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  driverID: string;

  @Column({
    type: 'enum',
    enum: DriverStatus,
    default: DriverStatus.ACTIVE,
  })
  driverStatus: DriverStatus;

  @OneToOne(() => User, (user) => user.driver, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userID' })
  user: User;
}
