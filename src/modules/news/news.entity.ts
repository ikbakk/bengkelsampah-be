import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn('uuid')
  newsID: string;

  @Column()
  title: string;

  @Column()
  imageUrl: string;

  @Column()
  imageDesc: string;

  @Column()
  content: string;

  @Column({ default: 'ADMIN' })
  author: string;

  @CreateDateColumn()
  createdAt: Date;
}
