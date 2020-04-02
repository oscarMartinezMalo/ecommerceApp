import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signinForm.get('password').markAsTouched();

    if (this.signinForm.valid && this.signinForm.touched) {
      const email = this.signinForm.get('email').value.trim();
      const password = this.signinForm.get('password').value;
      console.log(email, password);
      // await this.authService.logIn({ email, password });
    }
  }

}
