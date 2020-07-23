import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError, TimeoutError} from 'rxjs';
import {catchError, timeout} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication-service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(timeout(10000), catchError(err => {
      let error = '';

      if (environment.interceptTimeoutErr && err instanceof TimeoutError) {
        this.router.navigate(['/error', 'tech']);
      } else {
        if ([401, 403].indexOf(err.status) !== -1) {
          this.authenticationService.logout();
          location.reload(true);
        }
        error = err.error.message || err.statusText;

        if ([400].indexOf(err.status) !== -1) {
          error = err.error.errorMessage;
        }
        console.log(err);
        if (err.status === 500) {
          error = err.error;
        }

        if (err.status === 404) {
          this.router.navigate(['/error', '404']);
        }
      }

      return throwError(error);
    }));
  }
}
