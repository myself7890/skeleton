import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PasswordLink {
  @PrimaryGeneratedColumn('uuid')
  public ID!: string;

  @OneToOne(() => User)
  @JoinColumn()
  public user!: User;

  @Column()
  public code!: string;

  @Column()
  public expiresAt!: Date;
}
