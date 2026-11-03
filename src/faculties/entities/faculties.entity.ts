
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('faculties')
export class Faculties {
  @PrimaryColumn()
  Id: string;

  @Column()
  Name: string;

  @Column()
  expertise: string;

  @Column()
  noOfPublication: number;
}
