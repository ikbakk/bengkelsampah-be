import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,

    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     type: 'postgres',
    //     host: process.env.POSTGRES_HOST || 'localhost',
    //     port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    //     username: process.env.POSTGRES_USER || 'nestuser',
    //     password: process.env.POSTGRES_PASSWORD || 'nestpassword',
    //     database: process.env.POSTGRES_DB || 'nestdb',
    //     autoLoadEntities: true, // Automatically load entities
    //     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    //     synchronize: true, // Set to false in production
    //     logger: 'advanced-console',
    //     logging: ['error'],
    //   }),
    // }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
