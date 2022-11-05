import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const logger: Logger = new Logger('SERVER');
    
    const app = await NestFactory.create(AppModule);
    
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.setGlobalPrefix(process.env.PREFIX);
    
    const config = new DocumentBuilder()
        .setVersion('1.0')
        .setTitle('Party Game Services')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(process.env.SWAGGER_URL, app, document);

    await app.listen(process.env.PORT);
    logger.log(`Listening on port ${process.env.PORT}`);
}
bootstrap();
