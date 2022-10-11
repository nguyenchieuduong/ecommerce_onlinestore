import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

const bcrypt = require('bcrypt');

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    default: true,
  })
  isAdmin: boolean;

  @Column({
    default: true,
  })
  isActived: boolean;

  @BeforeInsert()
  async log() {
    this.password = await bcrypt.hash(this.password, 4);
  }
}
