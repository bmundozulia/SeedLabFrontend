// enlace.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnlaceService {
  private enlaces: {titulo: string, url: string}[] = [];

  constructor() { }

  addEnlace(enlace: {titulo: string, url: string}) {
    this.enlaces.push(enlace);
  }

  getEnlaces() {
    return this.enlaces;
  }
}
