import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 어디서나 ConfigService를 사용할 수 있게 함
    }),
    // 추후 TypeORMModule 등 추가 예정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true, // 엔티티 자동 로드
        synchronize: true, // 개발 단계에서 스키마 자동 동기화 (운영환경에서는 false로)
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class AppModule {}
