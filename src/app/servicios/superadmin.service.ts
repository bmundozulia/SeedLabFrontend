import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { Observable } from 'rxjs';
import { Superadmin } from '../Modelos/superadmin.model';

@Injectable({
  providedIn: 'root'
})
export class SuperadminService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl + 'superadmin/crearSuperAdmin'
  private url2 = `${environment.apiUrl}userProfile/`

  private CreacionHeaders(access_token: any): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
  }

  createSuperadmin(access_token: any, superadmin: Superadmin,): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.post(this.url, superadmin, options);
  }

  updateAdmin(admin: Superadmin, access_token:any, id: number): Observable<any>{
    const options= { headers: this.CreacionHeaders(access_token) };
    return this.http.put(this.url + "/"+ id, admin, options); 
  }

  getInfoAdmin(access_token: any,id:number): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token)};
    return this.http.get<any>(`${this.url2}${id}`, options);
  }
}
