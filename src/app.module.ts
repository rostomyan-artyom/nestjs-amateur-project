import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './main-api/auth/users/users.module';
import { AuthModule } from './main-api/auth/auth/auth.module';
import { TitlesModule } from './main-api/common/title/titles.module';
import { DescriptionsModule } from './main-api/common/descriptions/descriptions.module';
import { ShortDescriptionsModule } from './main-api/common/short-descriptions/short-descriptions.module';
import { ImagesModule } from './main-api/common/image/images.module';
import { WizardsModule } from './main-api/content/wizards/wizards.module';
import { GendersModule } from './main-api/content/genders/genders.module';
import { StatusesModule } from './main-api/common/statuses/statuses.module';
import { ProgramsTypesModule } from './main-api/content/programs-types/programs-types.module';
import { ProgramsModule } from './main-api/content/programs/programs.module';
import { BlogsModule } from './main-api/content/blogs/blogs.module';
import { VacancyModule } from './main-api/content/vacancy/vacancy.module';
import { InteriorModule } from './main-api/content/interior/interior.module';
import { PagesBlogsModule } from './main-api/content/pages-blogs/pages-blogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      exclude: ['/api*'],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    AuthModule,
    TitlesModule,
    DescriptionsModule,
    ShortDescriptionsModule,
    ImagesModule,
    WizardsModule,
    GendersModule,
    StatusesModule,
    ProgramsTypesModule,
    ProgramsModule,
    BlogsModule,
    VacancyModule,
    InteriorModule,
    PagesBlogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
