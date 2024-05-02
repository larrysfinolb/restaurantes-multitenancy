import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RestaurantsService } from '../public/restaurants/restaurants.service';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const subdomain = req.headers.origin?.split('.')[0];

    req.restaurantId = subdomain
      ? (await this.restaurantsService.findOne({ where: { subdomain } }))?.id
      : null;

    next();
  }
}
