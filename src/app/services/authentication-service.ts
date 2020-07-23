import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/user/user.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Role} from '../models/role/role';
import {PanoramaModel} from '../models/panorama/panorama-model';
import {UserService} from './user-service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: Observable<UserModel>;
  private readonly tokenName = '  login_session';
  private currentUserSubject: BehaviorSubject<UserModel>;
  private renderer: Renderer2;

  constructor(private http: HttpClient, private userService: UserService,
              private rendererFactory: RendererFactory2, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  private get currentUserRole(): Role {
    return this.currentUserValue.roles[0];
  }

  getSession(): string {
    return sessionStorage.getItem(this.tokenName);
  }

  canDelete(advertisement: PanoramaModel) {
    return this.isLogged() && (this.isAdmin() ||
      this.currentUserValue.id === advertisement.user.id);
  }

  canEdit(advertisement: PanoramaModel) {
    return this.isLogged() && this.currentUserValue.id === advertisement.user.id;
  }

  login(login: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/User/login`, {login, password})
      .pipe(map(signInUser => {
        let user;
        if (signInUser && signInUser.token) {
          user = {id: signInUser.user.id, firstName: signInUser.user.firstName,
            avatar: signInUser.user.avatar, token: signInUser.token, roles: signInUser.roles};
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  confirm(userId: string, confirmCode: string) {
    confirmCode = encodeURIComponent(confirmCode);
    return this.http.get(`${environment.apiUrl}/User/confirm/userId=${userId}/confirmCode=${confirmCode}`);
  }

  signup(email: string, firstName: string, lastName: string, phoneNumber: string,
         password: string, confirmPassword: string, token: string) {
    const returnUrl = `${environment.url}/confirm/`;
    return this.http.put<any>(`${environment.apiUrl}/User/signup`,
      {email, firstName, lastName, phoneNumber, password, confirmPassword, token, returnUrl});
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    location.reload(true);
  }

  isLogged(): boolean {
    return !(this.currentUserValue == null);
  }

  isAdmin(): boolean {
    return this.currentUserRole === 'RoleAdmin';
  }

  refresh() {
    this.userService.getUser(this.currentUserValue.id).subscribe(resp => {
      const userRef = resp as UserModel;
      this.currentUserSubject.value.name = userRef.name;
      this.currentUserSubject.value.avatar = userRef.avatar;
    });
  }

  reset(id: string, resetCode: string, password: string, confirmPassword: string) {
    return this.http.put<any>(`${environment.apiUrl}/User/reset`, {id, password, confirmPassword, resetCode});
  }

  sendRestore(email: string) {
    const returnUrl = `${environment.url}/reset/`;
    return this.http.get(`${environment.apiUrl}/User/sendRestore/email=${email}/returnUrl=${encodeURIComponent(returnUrl)}`);
  }

  loginVk() {
    this.openPopUp(200, `https://oauth.vk.com/authorize?client_id=${environment.vkClientId}&display=page&redirect_uri=${environment.url}/oauthcallback/vk&response_type=code&v=5.103`);
  }

  loginGoogle() {
    this.openPopUp(500, `https://accounts.google.com/o/oauth2/v2/auth?client_id=${environment.googleClientId}&redirect_uri=${environment.url}/oauthcallback/g&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`);
  }

  loginFacebook() {
    this.openPopUp(500, `https://www.facebook.com/v6.0/dialog/oauth?client_id=${environment.facebookClientId}&redirect_uri=${environment.url}/oauthcallback/fb&state=sellnet`);
  }

  socialSignInToApi(code: string, provider: string) {
    this.http.post<any>(`${environment.apiUrl}/User/sociallogin`,
      {redirectURI: `${environment.url}/oauthcallback/${provider}`, provider, code})
      .subscribe(signInUser => {
        let user;
        if (signInUser && signInUser.token) {
          user = {id: signInUser.user.id, firstName: signInUser.user.firstName,
            avatar: signInUser.user.avatar, token: signInUser.token, roles: signInUser.roles};
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        window.close();
        opener.location.reload();
      });
  }

  private openPopUp(height: number, url: string) {
    const width = 640;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    const windowOptions = `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`;
    const type = 'auth';

    window.open(url, type, windowOptions);
  }
}
