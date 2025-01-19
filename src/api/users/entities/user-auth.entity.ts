import { Entity, Column, PrimaryGeneratedColumn ,OneToMany} from 'typeorm';


@Entity()
export class UserAuth {
    @PrimaryGeneratedColumn()
    userId: number;
  
    @Column()
    username: string;
    
    @Column()
    email: string;

    @Column()
    password: string;
  

}
