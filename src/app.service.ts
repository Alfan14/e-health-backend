import { Injectable } from '@nestjs/common';
import { BedManagerService } from './bed/bed-manager.service';


@Injectable()
export class AppService {
  constructor(private bedManagerService: BedManagerService) {}

  getHello(): string {
    this.bedManagerService.getBedForecasts().then(console.log);
    return 'Hello Girls!';
  }
}
