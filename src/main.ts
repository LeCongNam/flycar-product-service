import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Tạo HTTP app

  // Gắn Kafka microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9094'],
      },
      consumer: {
        groupId: 'nestjs-group-server',
        allowAutoTopicCreation: true,
      },
    },
  });

  app.enableCors();
  // app.set('trust proxy', true);
  // app.setGlobalPrefix('api');

  // Start HTTP server
  const PORT = process.env.PORT ?? 3002;
  if (process.env.NODE_ENV !== 'production') {
    try {
      await Promise.all([
        // Start Kafka microservice
        app.startAllMicroservices(),
        app.listen(PORT),
      ]);
    } catch (error) {
      Logger.error('Error starting the application:', error);
      process.exit(1); // Exit if there's an error starting the app
    }
  } else {
    // Start Kafka microservice in production mode
    await app.startAllMicroservices();
    await app.listen(PORT);
  }
  Logger.log(`HTTP Server is running on port ${PORT}`);
}

bootstrap().catch((err) => {
  Logger.error('Application failed to start', err);
  process.exit(1);
});
