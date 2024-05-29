import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class TraeraliadosfanpageService {

  url = environment.apiUrl + 'aliado/1';

  constructor(private http: HttpClient) { }

    getaliados(): Observable<any>{
      return this.http.get(this.url);
    }
}
