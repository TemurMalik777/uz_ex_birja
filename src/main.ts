import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ConsoleLogger, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { winstonConfig } from './common/logger/winston.logger';
import { WinstonModule } from 'nest-winston';
import { AllExceptionFilter } from './common/errors/error.handling';

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule, {
      logger: false,
      // logger: WinstonModule.createLogger(winstonConfig),
      // logger: ['error', 'log']
      // logger: new ConsoleLogger({
      //   colors: true,
      //   prefix: "Uzex",
      //   json: true
      // })
    });
    app.useGlobalFilters(new AllExceptionFilter(app.get('winston')));

    app.setGlobalPrefix('api');
    app.use(cookieParser());

    const config = new DocumentBuilder()
      .setTitle('UzEx birja project')
      .setDescription('UZEX BERJA API')
      .setVersion('1.0')
      .addTag('NestJS')
      .addTag('Guard')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Tokenni shu yerga yozing',
          in: 'header',
        },
        'access-token', // key bu nomda bo'ladi
      )

      .build();

    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigin = [
          'http://localhost:3004',
          'http://localhost:8000',
          'http://localhost:3000',
          'http://localhost:3001', 
          'http://localhost:3333',
          'http://smartnavbat.uz',
          'http://smart.navbat.uz',
          'http://smart.navbat.app',
        ];
        if (!origin || allowedOrigin.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Not allowed by CORS'));
        }
      },
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      credentials: true,
    });

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
