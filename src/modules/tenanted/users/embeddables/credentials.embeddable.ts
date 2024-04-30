import { Column } from 'typeorm';

export class CredentialEmbedded {
  @Column({
    default: 0,
    type: 'int',
  })
  version: number;

  @Column({
    nullable: true,
  })
  lastPassword: string;

  updatePassword(password: string) {
    this.version++;
    this.lastPassword = password;
  }

  updateVersion() {
    this.version++;
  }
}
