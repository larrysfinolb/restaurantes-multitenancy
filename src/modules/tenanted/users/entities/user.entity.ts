import { BaseEntity } from '@/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
