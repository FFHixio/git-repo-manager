import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { DependencyForMainPage, RepositoriesForMainPage } from '../../../core/models';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';

@Component({
  selector: 'branches',
  templateUrl: './branches-row.component.html',
  styleUrls: ['./branches-row.component.scss']
})
export class BranchesRowComponent implements OnChanges {
  branches: string;
  vcsService: string;
  dynamicClassName: string;

  @Input() baseBranchData: RepositoriesForMainPage[];
  @Input() compareBranchData: RepositoriesForMainPage[];

  constructor(private readonly lsService: LocalStorageService) {
    try {
      this.vcsService = this.lsService.getItem('vcs_service');
    } catch (e) {
      this.vcsService = '';
    }
  }

  ngOnChanges() {
    if (!this.baseBranchData.length) {
      const compareBranch: DependencyForMainPage = Object.assign({}, ...this.compareBranchData);
      this.dynamicClassName = `label-danger label-danger-${this.vcsService}`;
      this.branches = `<span class="${this.dynamicClassName}">${compareBranch.branchName}</span>`;

      return;
    }

    if (!this.compareBranchData.length) {
      const baseBranch: DependencyForMainPage = Object.assign({}, ...this.baseBranchData);
      this.dynamicClassName = `label-danger label-danger-${this.vcsService}`;
      this.branches = `<span class="${this.dynamicClassName}">${baseBranch.branchName}</span>`;

      return;
    }

    const baseBranch: DependencyForMainPage = Object.assign({}, ...this.baseBranchData);
    const compareBranch: DependencyForMainPage = Object.assign({}, ...this.compareBranchData);

    this.branches = `<span>${baseBranch.branchName} &#8594; ${compareBranch.branchName}</span>`;
    return;
  }
}
