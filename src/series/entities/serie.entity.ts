import { Episodio } from 'src/episodios/entities/episodio.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Serie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  genero: string;

  @Column({ type: 'text' })
  sinopsis: string;

  @Column()
  urlPortada: string;

  @OneToMany(() => Episodio, (episodio) => episodio.serie, { cascade: true })
  episodios: Episodio[];
}
