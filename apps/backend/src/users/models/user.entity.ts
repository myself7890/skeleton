import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public ID!: string;

  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @Column()
  public salt!: string;
}
