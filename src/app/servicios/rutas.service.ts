import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ruta } from '../Modelos/ruta.modelo';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  url = environment.apiUrl + 'ruta';

  constructor(private http:HttpClient) { }

  private CreacionHeaders(access_token: any): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
  }

  getAllRutas(access_token:any){
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.get(this.url, options);
  }

  createRutas(access_token:any, ruta:Ruta){
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.post(this.url, ruta,options);
  }

}
