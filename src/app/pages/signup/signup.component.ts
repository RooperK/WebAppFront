import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service';
import {first} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  captcha: string;

  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  get f() {
    return this.signupForm.controls;
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      recaptchaReactive: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    if (!this.captcha) {
      this.error = 'Введите reCaptcha';
      return;
    }

    this.loading = true;
    this.authenticationService.signup(this.f.email.value, this.f.name.value, this.f.surname.value,
      this.f.phone.value, this.f.password.value, this.f.confirmPassword.value, this.captcha)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/aftersignup']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
    this.captcha = captchaResponse;
  }

  getSiteKey() {
    return environment.siteKey;
  }
}


