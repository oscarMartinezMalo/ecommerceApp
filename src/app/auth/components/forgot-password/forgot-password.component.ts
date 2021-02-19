import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { forbiddenNameValidator } from '../../services/customValidator.directive';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

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
    //   this.authService.login({ email, password })
    //     .subscribe(resp => {
              this.forgotPasswordForm.reset();
    //     },
    //     (error: AppError) => {
    //       if (error instanceof WrongCredentialError) {
    //         this.signinForm.setErrors({ userPass: true });
    //       } else { throw error; }
    //     });
    }
  }
}
