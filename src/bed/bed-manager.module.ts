import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BedManagerService } from './bed-manager.service';
import { BedManagerController } from './bed-manager.controller';


export interface BedManagerModuleOptions {
  global?: boolean;
}

@Module({
    imports: [
      HttpModule
    ],
    providers: [BedManagerService],
    controllers: [BedManagerController],
    exports: [BedManagerService],
    
  })
export class BedManagerModule {}