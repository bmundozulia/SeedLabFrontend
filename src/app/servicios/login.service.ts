import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  url= environment.apiUrl+'auth/';

  constructor(private http: HttpClient) { }

  login(email: any, password: any) {
    return this.http.post(this.url + "login", { email: email, password: password });
  }

  forgotPassword(email: any){
    return this.http.post(this.url + "send-reset-password", { email: email });
  }
}