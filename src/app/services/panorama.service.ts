import {Injectable} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication-service';

@Injectable({
  providedIn: 'root'
})
export class PanoramaService {

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private authService: AuthenticationService) {
  }

  getPanoramaById(id: number) {
    return this.http.get(`${environment.apiUrl}/Panorama/getFull/id=${id}`);
  }

  getPanoramas(page: number) {
    return this.http.get(`${environment.apiUrl}/Panorama/get/page=${page}/size=${environment.pageSize}`);
  }

  deletePanorama(id: number) {
    if (this.authService.isAdmin()) {
      return this.http.delete(`${environment.apiUrl}/Admin/delete_panorama/${id}`);
    } else {
      return this.http.delete(`${environment.apiUrl}/Panorama/delete/${id}`);
    }
  }

  editPanorama(id: any, title: string, position: number[], imageForm: FormData) {
    const formData = this.formBuilder.group({
      panoramaData: JSON.stringify({id, title, position}),
      image: imageForm
    });
    return this.http.put(`${environment.apiUrl}/Panorama/edit`,
      formData);
  }

  postPanorama(title: string, position: number[], imageForm: FormData) {
    const formData = this.formBuilder.group({
      panoramaData: JSON.stringify({title, position}),
      image: imageForm
    });
    return this.http.post(`${environment.apiUrl}/Panorama/post`,
      formData);
  }

  getPanoramaByUser(page: number, user: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Panorama/get/page=${page}/size=${environment.pageSize}/user=${user}`);
  }
}
