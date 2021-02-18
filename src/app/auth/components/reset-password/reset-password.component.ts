import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppError } from 'shared/errors/app-error';
import { WrongCredentialError } from 'shared/errors/wrong-crendential-error';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm;

  constructor(    
    private fb: FormBuilder,
    private authService: AuthService
  ) { 

    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required,  Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      retypePassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.resetPasswordForm.get('currentPassword').markAsTouched();
    this.resetPasswordForm.get('newPassword').markAsTouched();
    this.resetPasswordForm.get('retypePassword').markAsTouched();

    if (this.resetPasswordForm.valid && this.resetPasswordForm.touched) {
      const currentPassword = this.resetPasswordForm.get('currentPassword').value.trim();
      const newPassword = this.resetPasswordForm.get('newPassword').value.trim();
      console.log(newPassword);
      this.authService.resetPassword( {currentPassword, newPassword} )
        .subscribe(resp => {
        },
        (error: AppError) => {
          if (error instanceof WrongCredentialError) {
            this.resetPasswordForm.setErrors({ userPass: true });
          } else { 
            this.resetPasswordForm.setErrors({ userPass: true });
           }
        });
    }
  }
  
}
