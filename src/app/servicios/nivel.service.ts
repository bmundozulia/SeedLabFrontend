import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  constructor(private http: HttpClient) { }

  private CreacionHeaders(access_token: any): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
  }

  url = environment.apiUrl + 'nivel'

  updateNivel(access_token: any,id:number,nivel:any):Observable<any>{
    const options = { headers: this.CreacionHeaders(access_token)};
    return this.http.put(this.url+'/editar_nivel/'+id,nivel,options)
  }
}
