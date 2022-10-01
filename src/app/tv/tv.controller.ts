import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { TvService } from './tv.service';

@Controller('tv')
export class TvController {
  constructor(private readonly tvService: TvService) {}
  @Get()
  async getSlide(@Query() { offset, limit, year }) {
    return await this.tvService.getAll(offset, limit, year);
  }

  @Post('search')
  async search(@Body() { country, years, genres, category, search }) {
    return await this.tvService.search(
      country,
      years,
      genres,
      category,
      search,
    );
  }
  @Post('sort')
  async sorting(@Body() { offset, limit, year, serial, genre, rating }) {
    return await this.tvService.sorting(
      offset,
      limit,
      year,
      serial,
      genre,
      rating,
    );
  }

  @Get('id')
  async getById(@Query() { id }) {
    return await this.tvService.getById(id);
  }
}
