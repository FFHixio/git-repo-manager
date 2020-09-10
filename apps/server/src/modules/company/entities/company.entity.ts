import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  Generated, ManyToOne, JoinColumn,
} from 'typeorm';

import { AccessTokensEntity } from '../../account/entities/access-tokens.entity';
import { AvailableDependenciesEntity } from '../../dependencies/entities/available-dependencies.entity';
import { BranchesEntity } from '../../auth/entities/branches.entity';
import { VcsServicesEntity } from '../../vcs-services/entities/vcs-services.entity';
import { RepositoriesEntity } from '../../repositories/entities/repositories.entity';
import { AccountCompanyEntity } from '../../account/entities/account-company.entity';

@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  companyName: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'bigint', nullable: false, unique: true })
  vcsId: number;

  @Column({ type: 'int', nullable: false })
  vcsServiceId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  logoUrl: string;

  @OneToMany(() => AvailableDependenciesEntity, data => data.company)
  availableDependency: AvailableDependenciesEntity[];

  @OneToMany(() => BranchesEntity, data => data.company)
  branches: BranchesEntity[];

  @OneToOne(() => AccessTokensEntity, data => data.company)
  accessToken: AccessTokensEntity;

  @ManyToOne(() => VcsServicesEntity, data => data.company)
  @JoinColumn()
  vcsService: VcsServicesEntity;

  @OneToMany(() => RepositoriesEntity, data => data.company)
  repository: RepositoriesEntity[];

  @OneToMany(() => AccountCompanyEntity, data => data.company)
  accountCompany: AccountCompanyEntity[];
}