import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateSerieDto) {
    return this.seriesService.create(dto);
  }

  @Get()
  findAll() {
    return this.seriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seriesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSerieDto) {
    return this.seriesService.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seriesService.remove(id);
  }
}
