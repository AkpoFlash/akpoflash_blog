import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesModule } from '../articles/articles.module';
import { UsersModule } from '../users/users.module';
import { AppController } from '../../controllers/app/app.controller';
import { AppService } from '../../services/app/app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/akpoflash'),
    ArticlesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
