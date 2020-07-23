import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-getrestore',
  templateUrl: './getrestore.component.html',
  styleUrls: ['./getrestore.component.scss']
})
export class GetrestoreComponent implements OnInit {

  restoreForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  get f() {
    return this.restoreForm.controls;
  }

  ngOnInit() {
    this.restoreForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.restoreForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.sendRestore(this.f.email.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/afterrestore']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
