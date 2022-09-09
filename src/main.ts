import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  // const options = {
  //   "origin": "*",
  //   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  //   "preflightContinue": false,
  //   "optionsSuccessStatus": 204,
  //   "credentials": true
  // }
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(`3D Toy Cars`)
    .setDescription(`REST API Docs`)
    .setVersion(`1.0.0`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)
  await app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
}

start();
