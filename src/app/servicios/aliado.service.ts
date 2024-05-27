import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class AliadoService {

  constructor(private http: HttpClient) { }

  private CreacionHeaders(access_token: any): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
  }

  url = environment.apiUrl + 'aliado'


  getinfoAliado(access_token: any, estado: number): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    const url = `${environment.apiUrl}aliado/${estado}`;
    return this.http.get(url, options);
  }

  crearAliado(aliado: any, access_token: string): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.post(`${this.url}/create_aliado`, aliado, options);
  }

  mostrarAliado() {
    return this.http.get(`${environment.apiUrl}orientador/listaAliado`);
  }

}