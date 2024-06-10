import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RestaurantEntity } from './entities/restaurant.entity';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  @ApiOkResponse({ type: [RestaurantEntity] })
  @ApiQuery({ name: 'columns', required: false })
  findAll(@Query('columns') columns?: string) {
    //return this.restaurantsService.findAll({ columns });
    return {"test":"hello world!!"};
  }

  @Get(':restaurantId')
  @ApiOkResponse({ type: RestaurantEntity })
  findOne(@Param('restaurantId') restaurantId: string) {
    return this.restaurantsService.findOne({ where: { id: restaurantId } });
  }

  @Post()
  @ApiCreatedResponse({
    type: RestaurantEntity,
  })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }
}
