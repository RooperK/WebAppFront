import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  loading: boolean;
  confirmed: boolean;
  error: string;
  private userId: string;
  private confirmCode: string;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.confirmCode = this.activatedRoute.snapshot.params.confirmCode;

    this.authService.confirm(this.userId, this.confirmCode).subscribe(response => {
      this.confirmed = true;
      this.router.navigate(['/login']);
      this.loading = false;
    }, error => {
      this.loading = false;
      this.error = error;
    });
  }

}
