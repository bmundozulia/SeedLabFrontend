import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {

  private CreacionHeaders(access_token: any): HttpHeaders { //para la creacion de los header y que sea autortizado
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    })
  }

  url = environment.apiUrl + 'mis_asesorias/'

  constructor(private http: HttpClient) { }

  getAsesorias(access_token:any, doc_emprendedor: string): Observable<any>{
    const options= { headers: this.CreacionHeaders(access_token) };
    return this.http.get(this.url+"/"+doc_emprendedor, options);
  }
}
