import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Restaurants } from './restaurants';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RestaurantEntity } from './entities/restaurant.entity';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurants: Restaurants) {}

  @Get()
  @ApiOkResponse({ type: [RestaurantEntity] })
  findAll() {
    return this.restaurants.findAll();
  }

  @Get(':restaurantId')
  @ApiOkResponse({ type: RestaurantEntity })
  findOne(@Param('restaurantId') restaurantId: string) {
    return this.restaurants.findOne({ where: { id: restaurantId } });
  }

  @Post()
  @ApiCreatedResponse({
    type: RestaurantEntity,
  })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurants.create(createRestaurantDto);
  }
}
