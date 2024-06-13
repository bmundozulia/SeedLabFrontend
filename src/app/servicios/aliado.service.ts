import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environment/env'

import { Asesor } from '../Modelos/asesor.model';

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

  //Listar asesores por aliados
  getinfoAsesor(access_token: any, id: number, estado: boolean): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token),
    params: new HttpParams().set('estado', estado) };
    return this.http.get<any>(`${this.url}/mostrarAsesorAliado/${id}`, options);
  }

  crearAliado(aliado: any, access_token: string): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.post(`${this.url}/create_aliado`, aliado, options);
  }

  mostrarAliado(access_token: any) {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.get(`${environment.apiUrl}orientador/listaAliado`,options);
  }

  getAsesorAliado(access_token: any, asesorId: number): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    const url = `${environment.apiUrl}asesor/userProfileAsesor/${asesorId}`;
    console.log(url);
    return this.http.get(url, options);
  }

  updateAsesorAliado(access_token: any, asesorId: number, asesor: Asesor): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    const url = `${environment.apiUrl}aliado/editarAsesorAliado/${asesorId}`;
    console.log(url);
    return this.http.put(url, asesor, options);
  }

  getaliados(): Observable<any>{
    return this.http.get(this.url+"/"+1);
  }

}