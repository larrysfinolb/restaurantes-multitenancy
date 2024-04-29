import { BaseEntity } from '@/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('restaurants')
export class RestaurantEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  subdomain: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @Column({
    default: false,
  })
  confirmed: boolean;
}
