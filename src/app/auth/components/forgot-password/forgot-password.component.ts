import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppError } from 'shared/errors/app-error';
import { WrongCredentialError } from 'shared/errors/wrong-crendential-error';
import { AuthService } from 'shared/services/auth.service';
import { forbiddenNameValidator } from '../../services/customValidator.directive';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  message: string;

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, , forbiddenNameValidator()]]
  });

  constructor(    
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.forgotPasswordForm.valid && this.forgotPasswordForm.touched) {
      const email = this.forgotPasswordForm.get('email').value.trim();
      this.authService.forgotPassword( email )
        .subscribe(resp => {
            console.log(resp);
            this.message = resp.message;
            this.forgotPasswordForm.reset();
        },
        (error: AppError) => {
          if (error instanceof WrongCredentialError) {
            this.forgotPasswordForm.setErrors({ userPass: true });
          } else { throw error; }
        });
    }
  }
}
