import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {

  url = environment.apiUrl + 'auth';

  constructor(private http:HttpClient) { }

  verificarEmail(email: string, codigo: string): Observable<any> {
    const body = { email, codigo };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.url}/validate_email_em`, body, { headers });
  }
}
