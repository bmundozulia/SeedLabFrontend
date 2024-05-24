import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environment/env';
import { Municipio } from '../Modelos/municipio.modelo';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  url = environment.apiUrl + 'mun/';

  constructor(private http: HttpClient) { }

    getMunicipios(nombreDepartamento: string): Observable<any>{
      const url = nombreDepartamento ? `${this.url}?dep_name=${nombreDepartamento}` : this.url;
    return this.http.get(url);
    }

  
}
