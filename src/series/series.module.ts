import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from './entities/serie.entity';
import { Episodio } from 'src/episodios/entities/episodio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Serie, Episodio])],
  controllers: [SeriesController],
  providers: [SeriesService],
  exports: [TypeOrmModule],
})
export class SeriesModule {}
