import { Module } from '@nestjs/common';
import { DevicesModule } from './devices.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'src', 'client', 'dist'),
    }),
    DevicesModule,
  ],
})
export class AppModule {}
