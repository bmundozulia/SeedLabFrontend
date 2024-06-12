import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emprendedor } from '../Modelos/emprendedor.model'; 
import { environment } from '../../environment/env';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  url = environment.apiUrl+'auth/';

  constructor(private http: HttpClient) { }

  registrar(emprendedor: Emprendedor): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.url+"register_em", emprendedor,{ headers });
  }
}
