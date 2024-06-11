import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {
  
  url = environment.apiUrl + 'respuestas';
  constructor(private http: HttpClient) { }

  saveAnswers(access_token: any, respuestas: any[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    return this.http.post(this.url+'/guardar-respuestas', respuestas, { headers });
  }

}
