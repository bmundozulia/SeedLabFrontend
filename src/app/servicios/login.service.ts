import { Injectable } from '@angular/core';
import { User } from '../Modelos/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //user::User|null = null;

  url='http://10.90.51.73:8000/api/auth/';

  constructor(private http: HttpClient) { }

  login(email: any, password: any) {
    return this.http.post(this.url+"login", {email:email, password:password});
  }
}
