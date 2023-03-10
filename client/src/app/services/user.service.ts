import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:8080/api/';
const BASE_URL = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(BASE_URL);
  }

  get(id: any): Observable<User> {
    return this.http.get(`${BASE_URL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(BASE_URL, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${BASE_URL}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(BASE_URL);
  }
}
