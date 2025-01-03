import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    
  } from '@nestjs/websockets';
  import { UseFilters , Catch, ArgumentsHost } from '@nestjs/common'
  import { BaseWsExceptionFilter } from "@nestjs/websockets";
  import { from, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Server } from 'socket.io';
  

  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })


export class NotificationGateway{
    @WebSocketServer()
    server: Server;
    
    @UseFilters()
    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
      return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }
  
    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
      return data;
    }

}