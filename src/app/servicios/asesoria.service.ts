import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';
import { Asesoria } from '../Modelos/asesoria.model';
import { AsesorDisponible } from '../Modelos/AsesorDisponible.model';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {
  private apiUrl = `${environment.apiUrl}asesorias/`;

  constructor(private http: HttpClient) { }

  private CreacionHeaders(access_token: any): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    });
  }

  getMisAsesorias(body: { documento: string, asignacion: boolean }): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    if (!token) {
      console.error('Token no encontrado en el localStorage');
      return new Observable<any>();
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  
    });
    return this.http.post<any>(`${this.apiUrl}mis_asesorias`, body, { headers });
  }

  crearAsesoria(data: any): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    if (!token) {
      console.error('Token no encontrado en el localStorage');
      return new Observable<any>();
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Incluye el token en las cabeceras
    });
    return this.http.post<any>(`${this.apiUrl}solicitud_asesoria`, data, { headers });
  }

  postAsesoriasOrientador(pendiente: boolean): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      pendiente: pendiente
    };
    return this.http.post<any>(`${this.apiUrl}asesoriaOrientador`, body, { headers });
  }

  asignarAliado(id: number, nombreAliado: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { nombreAliado: nombreAliado };

    return this.http.post<any>(`${this.apiUrl}${id}/asignar-aliado`, body, { headers });
  }

  // Método para obtener asesorías por rol y estado
  getAsesoriasPorRolYEstado(rol: number, estado: number): Observable<Asesoria[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}mostrarAsesorias/${rol}/${estado}`;
    return this.http.get<Asesoria[]>(url, { headers });
  }

  listarAsesores(idaliado: number): Observable<AsesorDisponible[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}asesores_disponibles/${idaliado}`;
    return this.http.get<AsesorDisponible[]>(url, { headers });
  }

  asignarAsesoria(idAsesoria: number, idAsesor: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}asignar_asesoria`;
    const body = { id_asesoria: idAsesoria, id_asesor: idAsesor };
    return this.http.post(url, body, { headers });
  }

  rechazarAsesoria(id_asesoria: number, accion: string): Observable<any> {
    const url = `${this.apiUrl}gestionar`;
    const body = { id_asesoria, accion };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(url, body, { headers });
  }

  mostrarAsesoriasAsesor(idAsesor: number, horario: boolean): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    if (!token) {
      console.error('Token no encontrado en el localStorage');
      return new Observable<any>();
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${environment.apiUrl}mostrarAsesoriasAsesor/${idAsesor}/${horario}`;
    return this.http.get<any>(url, { headers });
  }
}
