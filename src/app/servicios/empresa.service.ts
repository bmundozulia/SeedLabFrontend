import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environment/env';
import { ApoyoEmpresa } from '../Modelos/apoyo-empresa.modelo';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private CreacionHeaders(access_token: any): HttpHeaders { //para la creacion de los header y que sea autortizado
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    })
  }

  url = environment.apiUrl + 'empresa/'

  constructor(private http: HttpClient) { }

  getEmpresas(access_token:any, documento: string): Observable<any>{
    const options= { headers: this.CreacionHeaders(access_token) };
    return this.http.get(this.url+"/"+documento, options);
  }

  
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
