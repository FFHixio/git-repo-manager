import { Connection } from 'mongoose';
import { RepoSchema } from './schemas/repo.schema';

export const repositoriesProviders = [
  {
    provide: 'RepoModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Repo', RepoSchema),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'CustomRepoModelToken',
    useFactory: (connection: Connection) =>
        connection.model('CustomRepos', RepoSchema),
    inject: ['DbConnectionToken']
  }
];
