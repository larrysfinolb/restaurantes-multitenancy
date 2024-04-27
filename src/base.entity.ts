import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: false,
    generated: 'increment',
    type: 'integer',
  })
  autoIncrement: number;

  @ApiProperty()
  @Column({
    default: false,
  })
  isDeleted: boolean;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;
}
