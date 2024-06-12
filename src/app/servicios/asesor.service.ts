import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environment/env';

import { Asesor } from '../Modelos/asesor.model';

@Injectable({
  providedIn: 'root'
})
export class AsesorService {

  constructor(private http: HttpClient) { }

  private CreacionHeaders(access_token: any): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });

  }

  url = environment.apiUrl + 'asesor/'


  createAsesor(access_token: any, asesor: Asesor,): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.post(`${this.url}asesor`, asesor, options);
  }

  getAsesorID(access_token: any, id: number): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.get(`${this.url}userProfileAsesor/${id}`, options);
  }

  updateAsesor(access_token: any, id: number, asesor: Asesor): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.put(`${this.url}asesor/${id}`, asesor, options);
  }

  mostrarAsesoriasAsesor(access_token: any, idAsesor: number, conHorario: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + access_token,
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${this.url}mostrarAsesoriasAsesor/${idAsesor}/${conHorario}`, { headers });
  }
}

