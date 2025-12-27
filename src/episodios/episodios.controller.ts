import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EpisodiosService } from './episodios.service';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';

@Controller('episodios')
export class EpisodiosController {
  constructor(private readonly episodiosService: EpisodiosService) {}

  @Post()
  create(@Body() dto: CreateEpisodioDto) {
    return this.episodiosService.create(dto);
  }

  @Get()
  findAll() {
    return this.episodiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.episodiosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEpisodioDto,
  ) {
    return this.episodiosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.episodiosService.remove(id);
  }
}
