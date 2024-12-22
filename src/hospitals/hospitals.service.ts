import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './hospital/hospital.entity'

@Injectable()
export class HospitalsService {
    constructor(
        @InjectRepository(Hospital)
        private hospitalRepository: Repository<Hospital>,
      ) {}
    
      async findById(id: number): Promise<Hospital> {
        return this.hospitalRepository.findOne({ where: { id } });
      }
    
      async create(user: Partial<Hospital>): Promise<Hospital> {
        const newuser = this.hospitalRepository.create(user);
        return this.hospitalRepository.save(newuser);
      }
    
      async findAll(): Promise<Hospital[]> {
        return this.hospitalRepository.find();
      }
      
      async update(id: number, user: Partial<Hospital>): Promise<Hospital> {
        await this.hospitalRepository.update(id, user);
        return this.hospitalRepository.findOne({ where: { id } });
      }
      async delete(id: number): Promise<void> {
        await this.hospitalRepository.delete(id);
      }
}
