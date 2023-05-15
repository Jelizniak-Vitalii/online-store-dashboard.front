import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthApiService } from '../../../../shared/services/api';
import { AppRoutes } from '../../../../shared/constants';
import { TokenService } from '../../../../shared/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  authForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  get email() {
    return this.authForm.get('email') as FormControl;
  }

  get password() {
    return this.authForm.get('password') as FormControl;
  }

  constructor(
    private router: Router,
    private authApiService: AuthApiService,
    private tokenService: TokenService
  ) {}

  private login() {
    this.authApiService.login(this.authForm.getRawValue())
      .subscribe(response => {
        this.tokenService.setJwtToken(response.data.token);
      });
  }

  onClickRegistration() {
    this.router.navigate([AppRoutes.REGISTER]);
  }

  onClickLogin() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    } else {
      this.login();
    }
  }
}
