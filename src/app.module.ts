import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './app/shared/module/config-module/config.service';
import { ApplicationModule } from './app/modules/application/application.module';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';
import { SentryModule } from '@sentry/nestjs/setup';

@Module({
  imports: [
    ApplicationModule,
    HttpModule,
    SentryModule.forRoot(),
    MongooseModule.forRoot(
     `mongodb+srv://${config.getString('DATABASE_USERNAME')}:${config.getString('DATABASE_PASSWORD')}@${config.getString('DATABASE_HOST')}/?retryWrites=true&w=majority&appName=@${config.getString('DATABASE_APP_NAME')}/`,
    ),
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: SentryGlobalFilter,
  }],
})
export class AppModule {}
