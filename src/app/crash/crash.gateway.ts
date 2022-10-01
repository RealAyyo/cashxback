import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8000, {
  transports: ['websocket'],
  allowEIO3: true,
  cors: {
    origin: 'http://127.0.0.1:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 101,
    credentials: true,
  },
})
export class CrashGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  clients: any[] = [];

  afterInit(server: any) {
    console.log('INITIALIZATED');
  }

  handleConnection(client: Socket, ...args): any {
    console.log(`CONNECTED ${client.id}`);
  }

  handleDisconnect(client: any): any {
    console.log(`DISCONECTED ${client.id}`);
  }

  sendData(data) {
    this.server.emit('events', data);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joined', room);
    console.log(room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leave', room);
  }

  @SubscribeMessage('test')
  handleMessage(client: Socket, payload: string): void {
    console.log(payload);
  }

  sendInitialData(data): void {
    this.server.emit('initialData', data);
  }
}
