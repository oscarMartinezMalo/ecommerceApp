import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'shared/components/modal/modal.component';
import { AppError } from 'shared/errors/app-error';
import { WrongCredentialError } from 'shared/errors/wrong-crendential-error';
import { AuthService } from 'shared/services/auth.service';
import { forbiddenNameValidator } from '../../services/customValidator.directive';

@Component({
  selector: 'app-forgot-password-token',
  templateUrl: './forgot-password-token.component.html',
  styleUrls: ['./forgot-password-token.component.scss']
})
export class ForgotPasswordTokenComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {

    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, , forbiddenNameValidator()]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      retypePassword: ['', [Validators.required, Validators.minLength(6)]],
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {  
    this.resetPasswordForm.get('email').markAsTouched();
    this.resetPasswordForm.get('newPassword').markAsTouched();
    this.resetPasswordForm.get('retypePassword').markAsTouched();
    const forgotPasswordToken = this.route.snapshot.paramMap.get('token');

    if (this.resetPasswordForm.valid && this.resetPasswordForm.touched) {
      const email = this.resetPasswordForm.get('email').value.trim();
      const newPassword = this.resetPasswordForm.get('newPassword').value.trim();

      this.authService.forgotPasswordToken(email, newPassword, forgotPasswordToken)
      .subscribe(async resp => {        
        this.resetPasswordForm.get('newPassword').reset();
        this.resetPasswordForm.get('retypePassword').reset();
        this.message = resp.message;
      },
      (error: AppError) => {
        if (error instanceof WrongCredentialError) { 
          this.resetPasswordForm.get('newPassword').reset();
          this.resetPasswordForm.get('retypePassword').reset();
          this.resetPasswordForm.setErrors({ userPass: true });
         }else{
          this.resetPasswordForm.setErrors({ userPass: true });
         }
      });
    }
  }

}
