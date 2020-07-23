import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service';
import {first} from 'rxjs/operators';
import {UserService} from '../../services/user-service';
import {ImageModel} from '../../models/image/image.model';
import {UserModel} from '../../models/user/user.model';
import {ImageUploadComponent} from '../image-upload/image-upload.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: UserModel;
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  image: ImageModel;
  userA: UserModel;
  @ViewChild('imageUploadComponent', {static: true}) imageUploadComponent: ImageUploadComponent;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.image = {imageUrl: null};

  }

  get f() {
    return this.signupForm.controls;
  }

  ngOnInit() {
    this.userA = this.authenticationService.currentUserValue;
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: [''],
    });

    this.userService.getUser(this.authenticationService.currentUserValue.id).subscribe(resp => {
      this.user = resp;
      this.f.name.setValue(this.user.name);
      this.imageUploadComponent.initImages();
      this.image = this.user.avatar;
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.editUser(this.f.name.value, this.f.surname.value, this.image, this.f.phone.value)
      .pipe(first())
      .subscribe(
        data => {
          this.authenticationService.refresh();
          this.router.navigate(['/profile']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
