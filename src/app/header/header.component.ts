import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('headerTitle') headerTitle!: ElementRef;
  @Input() subtitle: string = 'SDSDDS';
  title: string = ''; // Sin valor predeterminado

  constructor() {}

  ngAfterViewInit() {
    // Obtener el texto del h1 y establecerlo como título
    if (this.headerTitle) {
      this.title = this.headerTitle.nativeElement.innerText;
    }
  }
}
