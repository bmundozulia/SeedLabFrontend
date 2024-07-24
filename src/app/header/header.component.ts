import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('headerTitle') headerTitle!: ElementRef;
  @Input() title: string = 'Incubadora de Emprendimientos Tecnologicos';
  @Input() subtitle: string = '';

  constructor() {}

  ngAfterViewInit() {
    this.setHeaderText();
  }

  setHeaderText() {
    if (this.headerTitle) {
      // Reemplazar el texto para incluir un salto de línea
      const titleWithLineBreak = this.title.replace('Incubadora de', 'Incubadora de<br>');
      this.headerTitle.nativeElement.innerHTML = titleWithLineBreak;
    }
  }
}
