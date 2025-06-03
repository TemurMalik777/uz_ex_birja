import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { winstonConfig } from './common/logger/winston.logger';
import { WinstonModule } from 'nest-winston';
import { AllExceptionFilter } from './common/errors/error.handling';

async function start() {
  try {
    // NestJS loglarini o'chirib qo'yish
    // Logger.overrideLogger(false);

    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule,{
      logger: WinstonModule.createLogger(winstonConfig),
      // logger: ['error', 'log']
      // logger: new ConsoleLogger({
      //   colors: true,
      //   prefix: "PrismaJon", 
      //   json: true
      // })
    });
    app.useGlobalFilters(new AllExceptionFilter(app.get('winston')))

    app.setGlobalPrefix('api');
    app.use(cookieParser());

    const config = new DocumentBuilder()
      .setTitle('Nest-One project')
      .setDescription('NEST-ONE REST API')
      .setVersion('1.0')
      .addTag('NestJS')
      .addTag('Guard')
      .addBearerAuth()
      .build();

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
