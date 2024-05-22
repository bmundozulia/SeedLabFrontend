import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {

  private apiUrl = `${environment.apiUrl}mis_asesorias`;

  constructor(private http: HttpClient) { }

  getMisAsesorias(body: { documento: string, asignacion: boolean }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer tu-token-aqui'  // Asegúrate de reemplazar esto con tu token real
    });
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
