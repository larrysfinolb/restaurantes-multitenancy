import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Restaurants } from '../public/restaurants/restaurants';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  constructor(private readonly restaurants: Restaurants) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const subdomain = req.headers.origin?.split('.')[0];

    req.restaurantId = subdomain
      ? (await this.restaurants.findOne({ where: { subdomain } }))?.id
      : null;

    next();
  }
}
