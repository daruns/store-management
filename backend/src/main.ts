import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomValidatePipe } from './shared/pipes/validation.pipes';
import * as rateLimit from "express-rate-limit";
import * as helmet from "helmet";
import * as cors from "cors";


// Read port number from env file
const port = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: Number(process.env.RATELIMIT_MINS) * 60 * 1000, // 15 minutes
  max: Number(10000), // limit each IP to 100 requests per windowMs
  message: "Too many Requests from this Device and IP, please try again after an Half Hour"
});

async function bootstrap() {
  // Create nestFactory instance for make server instance
  const corsConfig = {
    credentials: true,
    origin: function(origin, callback){
      callback(null, true);
    },
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors(corsConfig))

  // app.useWebSocketAdapter(new WsAdapter(3000));
  // app.useWebSocketAdapter(new WsAdapter(app)) 
  
  // Custome validation on request using pipe and class-validator
  app.use(limiter);
  app.useGlobalPipes(new CustomValidatePipe());
  app.useGlobalPipes(new ValidationPipe({transform: true}));

  // Add prefix to all api for request
  app.setGlobalPrefix('api/v1');

  Logger.log(`Server ready at http://127.0.0.1:${port} `, 'ServerStarted');
  // Run server on port
  await app.listen(port);
}
bootstrap();
