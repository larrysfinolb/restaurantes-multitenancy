import { BaseEntity } from '@/base.entity';
import { Column, Entity } from 'typeorm';
import { CredentialEmbedded } from '../embeddables/credentials.embeddable';

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

  @Column(() => CredentialEmbedded)
  credential: CredentialEmbedded;
}
