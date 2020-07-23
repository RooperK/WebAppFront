import {Component} from '@angular/core';
import {UserModel} from './models/user/user.model';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication-service';
import {Role} from './models/role/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WabPan';
  currentUser: UserModel;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
}
