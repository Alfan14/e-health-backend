import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse , AxiosError} from 'axios';
import { firstValueFrom ,Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  axios from 'axios';

import { catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class BedManagerService {
    constructor(private readonly httpService: HttpService) {}

    async getBedForecasts() {
        const url = ' https://rs-bed-covid-api.vercel.app/api/get-provinces';
        const { data } = await firstValueFrom(this.httpService.get(url));
        return data;
    }

    async getBedKabupaten(provinceId: string) : Promise<any> {
        console.log('Received provinceId in Service:', provinceId);
        const url =(`https://rs-bed-covid-api.vercel.app/api/get-cities?provinceid=${provinceId}`)
        console.log('Constructed URL:', url);

        try {
            const response = await firstValueFrom(
              this.httpService.get(url).pipe(
                catchError((error: AxiosError) => {
                  console.error(`Error fetching bed data: ${error.message}`);
                  throw new Error('Failed to fetch bed data');
                }),
              ),
            );
            return response.data;
          } catch (error) {
            throw new Error(`An error occurred: ${error.message}`);
          }
        }
    }