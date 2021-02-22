import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'shared/components/modal/modal.component';
import { AppError } from 'shared/errors/app-error';
import { WrongCredentialError } from 'shared/errors/wrong-crendential-error';
import { AuthService } from 'shared/services/auth.service';
import { ConfirmValidatorDirective } from '../confirm-validator.directive';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm;
  errorMessage='';

  constructor(    
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) { 

    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required,  Validators.minLength(6)]],
      passwordGroup : this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        retypePassword: ['', [Validators.required, Validators.minLength(6)]],
       })
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

      this.authService.resetPassword( {currentPassword, newPassword} )
        .subscribe(async resp => {
          this.authService.logOut();
          await this.openPopUp();
          this.router.navigate(['/products']);
        },
        (error: AppError) => {
          if (error instanceof WrongCredentialError) {
            this.resetPasswordForm.setErrors({ userPass: true });
          } else { 
            this.errorMessage =  error.getErrorMessage();
           }
        });
    }
  }

  async openPopUp() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Password successfully changed';
    modalRef.componentInstance.message = 'Please Login with your new password.';
  }
  
}
