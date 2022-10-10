import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserPhotos(): Observable<any> {
    return this.http.get(API_URL + 'list-user-file-names', {responseType: 'text'});
  }

  uploadPhoto(file): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('myImage', file);
    return this.http.post(API_URL + 'uploadPhoto', formData);
  }

  removeFile(id: any): Observable<any> {
    return this.http.get(API_URL + `remove/${id}`, {responseType: 'text'});
  }

  getAllPhotos(): Observable<any> {
    return this.http.get(API_URL + 'list-public-file-names', {responseType: 'text'});
  }

}
