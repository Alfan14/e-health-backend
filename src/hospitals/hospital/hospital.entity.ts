import { Entity, Column, PrimaryGeneratedColumn ,OneToMany} from 'typeorm';

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  bedCapacity: number;

  @Column()
  availableBeds: number;
}
