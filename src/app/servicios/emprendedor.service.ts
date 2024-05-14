import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmprendedorService {

  url = 'http://10.90.51.73:8000/api/emprendedor/'

  constructor(private http: HttpClient) { }

    getEmpresas(documento: string): Observable<any>{
      return this.http.get(this.url+documento);
    }
}
