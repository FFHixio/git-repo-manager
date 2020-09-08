import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingSpinnerService } from '../../core/services/loading-spinner.service';

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.html',
  styleUrls: ['./user-authorization.scss']
})

export class UserAuthorizationComponent implements OnInit {
  public errText: string;
  public errCondition: boolean = false;
  public names = ['github', 'gitlab'];
  public loginForm: FormGroup;
  public dataSource: FormGroup;
  public loginText: string = 'Choose organization and VCS';

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly lsService: LocalStorageService,
    private readonly loading: LoadingSpinnerService
  ) {  }

  ngOnInit(): void {
    this.lsService.clear();
    this.loginForm = this.formBuilder.group({
      organization: ['', Validators.required],
      dataSource: ['', Validators.required]
    });
  }

  public setVCS() {
    let orgNameLength = this.loginForm.value.organization.length;

    switch (this.loginForm.value.dataSource) {
      case orgNameLength !== 0 && 'github':
        this.loginText = 'Log in via GitHub';
        break;

      default:
        this.loginText = 'Choose organization and VCS';
        break;
    }
  }
  public login(event: string) {
    this.loading.show();
    return this.auth.authenticateUser(event);
  }
}
