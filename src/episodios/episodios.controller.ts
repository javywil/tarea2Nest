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
import { EpisodiosService } from './episodios.service';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('episodios')
export class EpisodiosController {
  constructor(private readonly episodiosService: EpisodiosService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEpisodioDto,
  ) {
    return this.episodiosService.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.episodiosService.remove(id);
  }
}
