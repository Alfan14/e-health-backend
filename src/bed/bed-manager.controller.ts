import { Controller, Get, Param } from '@nestjs/common';
import { BedManagerService } from './bed-manager.service';

@Controller('bed')
export class BedManagerController {
  constructor(private readonly bedManagerService: BedManagerService) {}

  @Get()
  getBed(){
    return this.bedManagerService.getBedForecasts();
  }
  @Get(':provinceId')
  getBedKabupaten(@Param('provinceId') provinceId: string) {
    console.log('Received provinceId in Controller:', provinceId); 
    return this.bedManagerService.getBedKabupaten(provinceId);
  }
}