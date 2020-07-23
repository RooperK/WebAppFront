import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  userId: string;
  resetCode: string;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              private router: Router, private authenticationService: AuthenticationService) {
  }

  get f() {
    return this.resetForm.controls;
  }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      confirmPassword: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.userId = this.activatedRoute.snapshot.params.userId;
    this.resetCode = this.activatedRoute.snapshot.params.resetCode;
  }

  onSubmit() {
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.reset(this.userId, this.resetCode, this.f.password.value, this.f.confirmPassword.value).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

}
