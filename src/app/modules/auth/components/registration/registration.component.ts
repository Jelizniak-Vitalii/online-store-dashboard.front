import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { AppRoutes } from '../../../../shared/constants';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../../shared/services/api';
import { TokenService } from '../../../../shared/services/token.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  authForm = new UntypedFormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    first_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    last_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    phone: new FormControl(''),
    age: new FormControl('')
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

  private registration() {
    this.authApiService.register(this.authForm.getRawValue())
      .subscribe(response => {
        this.tokenService.setJwtToken(response.data.token);
      });
  }

  onClickRegistration() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    } else {
      this.registration();
    }
  }

  onClickLogin() {
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
