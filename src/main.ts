import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
      origin: 'http://localhost:5433', 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
      credentials: true, 
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();


