import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url = 'http://127.0.0.1:8000/api/empresa/'

  constructor(private http: HttpClient) { }

  getEmpresas(documento: string): Observable<any>{
    const options= {};
    return this.http.get(this.url+"/"+documento, options);
  }
}
