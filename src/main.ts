import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const PORT: number = Number(process.env.PORT) || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5000',
      'http://localhost:3000',
      'http://localhost:8080',
    ],
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  });

  await app.listen(PORT, () => console.log(`starting, port - ${PORT}`));
}
bootstrap();
