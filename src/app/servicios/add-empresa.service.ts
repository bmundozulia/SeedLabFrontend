import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../Modelos/empresa.model';
import { ApoyoEmpresa } from '../Modelos/apoyo-empresa.modelo';


@Injectable({
  providedIn: 'root'
})
export class AddEmpresaService {

  url = environment.apiUrl + 'empresa';

  constructor(private http: HttpClient) { }

  /*addEmpresa(access_token: any, empresa: Empresa, apoyos: ApoyoEmpresa | null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
  
    let body:  { empresa, apoyos };
  
   
  
    return this.http.post(this.url, body, { headers });
  }*/

  addEmpresa(access_token: any, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    return this.http.post(this.url, payload, { headers });
  }

  addApoyoEmpresa(access_token: any, apoyos:ApoyoEmpresa):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ access_token
    });
    return this.http.post(this.url, apoyos, { headers });
  }
  
}
