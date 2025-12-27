import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Episodio } from './entities/episodio.entity';
import { Serie } from 'src/series/entities/serie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EpisodiosService {
  constructor(
    @InjectRepository(Episodio)
    private readonly episodioRepo: Repository<Episodio>,
    @InjectRepository(Serie)
    private readonly serieRepo: Repository<Serie>,
  ) {}

  async create(dto: CreateEpisodioDto): Promise<Episodio> {
    const serie = await this.serieRepo.findOne({ where: { id: dto.serieId } });
    if (!serie) {
      throw new NotFoundException(`Serie ${dto.serieId} no encontrada`);
    }

    const episodio = this.episodioRepo.create({
      titulo: dto.titulo,
      duracion: dto.duracion,
      numeroCapitulo: dto.numeroCapitulo,
      serie,
    });

    return this.episodioRepo.save(episodio);
  }

  findAll(): Promise<Episodio[]> {
    return this.episodioRepo.find({ relations: ['serie'] });
  }

  async findOne(id: number): Promise<Episodio> {
    const episodio = await this.episodioRepo.findOne({
      where: { id },
      relations: ['serie'],
    });
    if (!episodio) {
      throw new NotFoundException(`Episodio ${id} no encontrado`);
    }
    return episodio;
  }

  async update(id: number, dto: UpdateEpisodioDto): Promise<Episodio> {
    const episodio = await this.findOne(id);

    if (dto.serieId !== undefined) {
      const serie = await this.serieRepo.findOne({ where: { id: dto.serieId } });
      if (!serie) {
        throw new NotFoundException(`Serie ${dto.serieId} no encontrada`);
      }
      episodio.serie = serie;
    }

    Object.assign(episodio, {
      titulo: dto.titulo ?? episodio.titulo,
      duracion: dto.duracion ?? episodio.duracion,
      numeroCapitulo: dto.numeroCapitulo ?? episodio.numeroCapitulo,
    });

    return this.episodioRepo.save(episodio);
  }

  async remove(id: number): Promise<void> {
    const episodio = await this.findOne(id);
    await this.episodioRepo.remove(episodio);
  }
}
