import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.enableCors();
  const config = new DocumentBuilder()
  .setTitle('bai tap')
  .setDescription(' baitap description')
  .setVersion('1.0')
  .addTag('')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors() 
  await app.listen(3000);
}
bootstrap();