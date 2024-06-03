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

  url = environment.apiUrl + 'aliado/'
  url2 = environment.apiUrl + 'asesor/'

  
  getinfoAsesor(access_token: any, id: number): Observable<any> {
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.get<any>(`${this.url}mostrarAsesorAliado/${id}`, options);
  }
 

  createAsesor(access_token: any, asesor:Asesor,):Observable<any>{
    const options = { headers: this.CreacionHeaders(access_token) };
    return this.http.put(this.url2 + "/" + asesor, options);
  }
}
