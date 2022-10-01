import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { LoggerService } from '../infrastructure/logger/logger.service';
import { CrashService } from './crash/crash.service';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

export class Server {
  static async start(): Promise<void> {
    const app = await NestFactory.create(AppModule);


    app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
    // Logger
    const logger = app.get(LoggerService);
    const serverLogger = logger.create('Server');

    const crashGame = app.get(CrashService);

    // Start
    await app.listen(5050);
    crashGame.gameStart();

    serverLogger.ready('Initialization complete!');
  }
}
