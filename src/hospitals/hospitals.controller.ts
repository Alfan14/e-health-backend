import { Controller, Get, Post, Body, Put, Param, Delete , NotFoundException} from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { Hospital } from './hospital/hospital.entity';

@Controller('hospitals')
export class HospitalsController {
    constructor(private readonly hospitalService: HospitalsService) {}
    
      // Get all hospital
      @Get()
      async findAll(): Promise<Hospital[]> {
        return this.hospitalService.findAll();
      }
      //  Get specific hospital
      @Get(':id')
      async findById(@Param('id') id: number): Promise<Hospital> {
        const hospital = await this.hospitalService.findById(id);
        if (!hospital) {
          throw new NotFoundException('User does not exist!');
        } else {
          return hospital;
        }
      }
    
      // Create hospital
      @Post()
      async create(@Body() hospital: Hospital): Promise<Hospital> {
        return this.hospitalService.create(hospital);
      }
    
      // Update specific hospital
      @Put(':id')
      async update (@Param('id') id: number, @Body() hospital: Hospital): Promise<any> {
        return this.hospitalService.update(id, hospital);
      }
    
      // Delete specific hospital
      @Delete(':id')
      async delete(@Param('id') id: number): Promise<any> {
        //handle error if user does not exist
        const user = await this.hospitalService.findById(id);
        if (!user) {
          throw new NotFoundException('Hospital does not exist!');
        }
        return this.hospitalService.delete(id);
        }
}
