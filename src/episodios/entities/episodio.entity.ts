import { Serie } from 'src/series/entities/serie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Episodio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column('int')
  duracion: number;

  @Column('int')
  numeroCapitulo: number;

  @ManyToOne(() => Serie, (serie) => serie.episodios, { onDelete: 'CASCADE' })
  serie: Serie;
}
