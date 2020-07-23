import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ImageModel} from '../models/image/image.model';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/User/${id}`);
  }

  editUser(firstName: string, lastName: string, avatar: ImageModel, phoneNumber: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/User/edit`, {firstName, lastName, avatar, phoneNumber});
  }
}

