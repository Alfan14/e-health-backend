import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './hospital/hospital.entity'

@Injectable()
export class HospitalsService {
    private readonly hospital = [
        {
          id: 1,
          name: 'Adi Sucipto',
          location : 'Jln.Kemuning , Jakarta Pusat',
          bedCapacity: 50,
          availableBeds: 15
        },
        {
          id: 2,
          name: 'Gatot Subrotot',
          location : 'Jln.Pegangsaan , Bandung',
          bedCapacity: 25,
          availableBeds: 12
        },
      ];
      async findOne(name: string): Promise<Hospital | undefined> {
        return this.hospital.find(hospital => hospital.name === name);
      }

    constructor(
        @InjectRepository(Hospital)
        private hospitalRepository: Repository<Hospital>,
      ) {}
    
      async findById(id: number): Promise<Hospital> {
        return this.hospitalRepository.findOne({ where: { id } });
      }
    
      async create(hospital: Partial<Hospital>): Promise<Hospital> {
        const newhospital = this.hospitalRepository.create(hospital);
        return this.hospitalRepository.save(newhospital);
      }
    
      async findAll(): Promise<Hospital[]> {
        return this.hospitalRepository.find();
      }
      
      async update(id: number, hospital: Partial<Hospital>): Promise<Hospital> {
        await this.hospitalRepository.update(id, hospital);
        return this.hospitalRepository.findOne({ where: { id } });
      }
      async delete(id: number): Promise<void> {
        await this.hospitalRepository.delete(id);
      }
}
