import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Serie } from './entities/serie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Serie)
    private readonly serieRepo: Repository<Serie>,
  ) {}
  async create(dto: CreateSerieDto): Promise<Serie> {
    const serie = this.serieRepo.create(dto);
    return this.serieRepo.save(serie);
  }

  findAll(): Promise<Serie[]> {
    return this.serieRepo.find({ relations: ['episodios'] });
  }

  async findOne(id: number): Promise<Serie> {
    const serie = await this.serieRepo.findOne({
      where: { id },
      relations: ['episodios'],
    });
    if (!serie) {
      throw new NotFoundException(`Serie ${id} no encontrada`);
    }
    return serie;
  }

  async update(id: number, dto: UpdateSerieDto): Promise<Serie> {
    const serie = await this.findOne(id);
    Object.assign(serie, dto);
    return this.serieRepo.save(serie);
  }

  async remove(id: number): Promise<void> {
    const serie = await this.findOne(id);
    await this.serieRepo.remove(serie);
  }
}
