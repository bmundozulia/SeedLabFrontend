


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environment/env';

import { Superadmin } from '../Modelos/superadmin.model';
import { Personalizaciones } from '../Modelos/personalizaciones.model';

@Injectable({
  providedIn: 'root'
})
export class SuperadminService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl + 'superadmin/'


  private CreacionHeaders(access_token: any): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
  }

  createSuperadmin(access_token: any, superadmin: Superadmin,): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.post(this.url + "crearSuperAdmin", superadmin, options);
  }

  updateAdmin(admin: Superadmin, access_token: any, id: number): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.put(this.url + "editarAdmin/" + id, admin, options);
  }

  getInfoAdmin(access_token: any, id: number): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.get<any>(this.url + "perfilAdmin/" + id, options);
  }

  getAdmins(access_token: any, estado: boolean): Observable<any> {
    const options = {headers: this.CreacionHeaders(access_token),
    params: new HttpParams().set('estado', estado)
    };
    return this.http.get<any>(this.url + "mostrarSuperAdmins/", options);
  }

  getInfoAdminxlista(access_token: any, adminId: number): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.get<any>(this.url + "perfilAdmin/" + adminId, options);
  }

  asesorConAliado(access_token:any):Observable<any>{
    const options = {headers: this.CreacionHeaders(access_token)};
    return this.http.get(this.url+"asesor-aliado",options)
  }

  listarAliado(access_token:any):Observable<any>{
    const options = {headers: this.CreacionHeaders(access_token)};
    return this.http.get(this.url+"listAliado",options)
  }

  crearActividadSuperAdmin(access_token: any,id: number):Observable<any>{
    const options = {headers: this.CreacionHeaders(access_token)};
    return this.http.post(this.url+"actividad/actividad/"+id,options)
  }

  createPersonalizacion(access_token: any, personalizaciones: any, id): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.put(this.url + "personalizacion/"+ id, personalizaciones, options);
  }

  getPersonalizacion(): Observable<any> {
    return this.http.get(environment.apiUrl + "traerPersonalizacion");
  }

  restorePersonalization(access_token: any, id):Observable<any>{
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.post(this.url + "restaurarPersonalizacion/"+ id,{}, options);
  }

  dashboardAdmin(access_token:string):Observable<any>{
    const options = { headers: this.CreacionHeaders(access_token)};
    return this.http.get(this.url+"contar-usuarios",options)
  }
}
