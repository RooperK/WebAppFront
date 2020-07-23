import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-socialcallback',
  templateUrl: './socialcallback.component.html',
  styleUrls: ['./socialcallback.component.scss']
})
export class SocialcallbackComponent implements OnInit {

  constructor(private authService: AuthenticationService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams.code && this.activatedRoute.snapshot.params.provider) {
      this.authService.socialSignInToApi(this.activatedRoute.snapshot.queryParams.code, this.activatedRoute.snapshot.params.provider);
    } else {

    }
  }
}
