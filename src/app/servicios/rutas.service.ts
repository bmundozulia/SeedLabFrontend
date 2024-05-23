import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  url = environment.apiUrl + 'ruta';

  constructor(private http:HttpClient) { }

  getAllRutas(access_token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ access_token
    });
    return this.http.get(this.url,{headers:headers});
  }
}
