import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmprendedorService {

  url = 'http://127.0.0.1:8000/emprendedor/'

  constructor(private http: HttpClient) { }

    getEmpresas(documento: string): Observable<any>{
      return this.http.get(this.url+documento);
    }
}
