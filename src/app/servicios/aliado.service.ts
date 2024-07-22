import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environment/env'

import { Asesor } from '../Modelos/asesor.model';
import { Aliado } from '../Modelos/aliado.model';
import { AnyTxtRecord } from 'dns';

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

  private CreacionHeaderss(access_token: any): HttpHeaders {
    return new HttpHeaders({
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
    const options = {
      headers: this.CreacionHeaders(access_token),
      params: new HttpParams().set('estado', estado)
    };
    return this.http.get<any>(`${this.url}/mostrarAsesorAliado/${id}`, options);
  }

  // crearAliado(access_token: any, formData: FormData): Observable<any> {
  //   const options = { headers: this.CreacionHeaderss(access_token) };
  //   return this.http.post(`${this.url}/create_aliado`, formData, options);
  // }
  
  crearAliado(access_token: string, aliado: Aliado): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', aliado.nombre || '');
    formData.append('descripcion', aliado.descripcion || '');
    formData.append('logo', aliado.logo || '');
    formData.append('ruta', aliado.ruta || '');
    formData.append('tipodato', aliado.tipodato || '');
    formData.append('email', aliado.email || '');
    formData.append('password', aliado.password || '');
    formData.append('estado', aliado.estado.toString()); // Convertir boolean a string

    if (aliado.banner) {
        formData.append('banner', aliado.banner, aliado.banner.name); // Asegúrate de pasar el nombre del archivo como tercer parámetro
    }

    const options = { headers: this.CreacionHeaderss(access_token) };

    return this.http.post(`${this.url}/create_aliado`, formData, options);
}

  mostrarAliado(access_token: any) {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.get(`${environment.apiUrl}orientador/listaAliado`, options);
  }

  getAsesorAliado(access_token: any, asesorId: number): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    const url = `${environment.apiUrl}asesor/userProfileAsesor/${asesorId}`;
    return this.http.get(url, options);
  }

  updateAsesorAliado(access_token: any, asesorId: number, asesor: Asesor): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    const url = `${environment.apiUrl}aliado/editarAsesorAliado/${asesorId}`;
    return this.http.put(url, asesor, options);
  }

  getaliados(): Observable<any> {
    return this.http.get(this.url + "/" + 1);
  }

  getDashboard(access_token: any, idAsesor: number): Observable<any>{
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.get<any>(`${this.url}/dashboardAliado/${idAsesor}`, options);
  }
/////////////////////////////////////////////////////////////

  crearActividad(access_token:any, aliado: any): Observable<any>{
    const options = { headers: this.CreacionHeaders(access_token)};
    return this.http.post(environment.apiUrl+"actividad/actividad",aliado,options)
  }

  crearNivel(access_token:any,aliado:any):Observable<any>{
    const options = { headers: this.CreacionHeaders(access_token)};
    return this.http.post(this.url+"nivel",aliado,options) 
  }

  crearLeccion(access_token:any,aliado:any):Observable<any>{
    const options = { headers: this.CreacionHeaders(access_token)};
    return this.http.post(this.url+"leccion",aliado,options)
  }

  crearContenicoLeccion(access_token:string, aliado:any):Observable<any>{
    const options = { headers: this.CreacionHeaders(access_token)};
    return this.http.post(this.url+"contenido_por_leccion",aliado,options)
  }


  

  // mostrarRutas(access_token: any, id: number): Observable<any> {
  //   const options = { headers: this.CreacionHeaders(access_token)};
  //   return this.http.get<any>(this.url+"ruta"+id, options)
  // }

}