import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {PanoramaComponent} from './pages/advertisement/panorama.component';
import {PanoramaCardComponent} from './components/advertisement-card/panorama-card.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {AdditemComponent} from './pages/additem/additem.component';
import {ImageUploadComponent} from './components/image-upload/image-upload.component';
import {RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import {CloudinaryModule} from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import {NgxMaskModule} from 'ngx-mask';
import {MatTreeModule} from '@angular/material/tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AutosizeModule} from 'ngx-autosize';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxDadataModule} from '@kolkov/ngx-dadata';
import {ErrorComponent} from './components/error/error.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {AdvertisementLongCardComponent} from './components/advertisement-long-card/advertisement-long-card.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {HowtoComponent} from './pages/howto/howto.component';
import {AboutComponent} from './pages/about/about.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {AfterSignUpComponent} from './pages/after-sign-up/after-sign-up.component';
import {ConfirmComponent} from './pages/confirm/confirm.component';
import {RestoreComponent} from './pages/restore/restore.component';
import {AfterRestoreComponent} from './pages/after-restore/after-restore.component';
import {GetrestoreComponent} from './pages/getrestore/getrestore.component';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login-vk';
import {environment} from '../environments/environment';
import {VKLoginProvider} from 'angularx-social-login-vk';
import {SocialcallbackComponent} from './components/socialcallback/socialcallback.component';
import {TypeChooserComponent} from './components/type-chooser/type-chooser.component';

const socialAuthConfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(`${environment.googleClientId}`)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(`${environment.facebookClientId}`)
  },
  {
    id: VKLoginProvider.PROVIDER_ID,
    provider: new VKLoginProvider(`${environment.vkClientId}`),
  }
]);

export function provideConfig() {
  return socialAuthConfig;
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    PanoramaComponent,
    PanoramaCardComponent,
    FooterComponent,
    HeaderComponent,
    ProfileComponent,
    AdditemComponent,
    ImageUploadComponent,
    ErrorComponent,
    AdvertisementLongCardComponent,
    HowtoComponent,
    AboutComponent,
    EditUserComponent,
    AfterSignUpComponent,
    ConfirmComponent,
    RestoreComponent,
    AfterRestoreComponent,
    GetrestoreComponent,
    SocialcallbackComponent,
    TypeChooserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    CloudinaryModule.forRoot(Cloudinary, {cloud_name: 'dennztta6', upload_preset: 'ml_default'}),
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    AutosizeModule,
    FileUploadModule,
    NgxDadataModule,
    NgbCarouselModule,
    InfiniteScrollModule,
    SocialLoginModule
  ],
  providers: [
    {provide: AuthServiceConfig, useFactory: provideConfig},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule {
}
