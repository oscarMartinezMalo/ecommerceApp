import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmValidatorDirective } from './components/confirm-validator.directive';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from 'shared/services/auth-guard.service';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ConfirmValidatorDirective,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class AuthModule { }
