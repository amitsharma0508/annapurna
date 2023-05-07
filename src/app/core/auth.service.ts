import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { DataService } from './data.service';
// import { HTTP } from '@ionic-native/http/ngx';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';
export const IS_AUTHENTICATED = 'isAuthenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Accept: 'application/json',
      // Authorization: `Bearer ` + this.token.jwt
    })
  }

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) { }

  validateLogin(userid: any, password: any) {
    return this.http
      .get(`${API_URL}/validatePassword?cidNo=${userid}&password=${password}`, this.httpOptions);
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  isUserLoggedIn() {
    if (this.getAuthenticatedUser()) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
  }

  getItem(key: string): any {
    return JSON.parse(JSON.stringify(sessionStorage.getItem(key)));
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
