import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GithubAuthController } from './controllers/github-auth.controller';

import { LayerService } from './services/layer.service';
import { GithubAuthService } from './services/github-auth.service';
import { databaseProviders } from '../../database/database.providers';
import { gitHubRepositoriesProviders } from '../../database/repositories.providers';
import { GithubStrategy } from './starategies/github.strategy';
import { ENTITIES } from './entities';

@Module({
  controllers: [ GithubAuthController ],
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([...ENTITIES])
  ],
  exports: [],
  providers: [
    LayerService,
    GithubStrategy,
    GithubAuthService,
    ...databaseProviders,
    ...gitHubRepositoriesProviders
  ]
})

export class AuthModule {  }
