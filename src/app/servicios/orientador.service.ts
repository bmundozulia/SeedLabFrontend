import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { Orientador } from '../Modelos/orientador.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrientadorService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl + 'orientador/crearOrientador'
  url2 = environment.apiUrl + ''

  private CreacionHeaders(access_token: any): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
  }


  createOrientador(access_token: any, orientador: Orientador,): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.post(this.url, orientador, options);
  }

  mostrarOrientador(access_token: any, id: number): Observable<any> { 
    const options = { headers: this.CreacionHeaders(access_token) }; 
    return this.http.get(`${environment.apiUrl}orientador/listaOrientador`, options);
  }
}
