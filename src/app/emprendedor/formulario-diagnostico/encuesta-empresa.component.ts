import { Component, HostListener, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { fa1 } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-encuesta-empresa',
  templateUrl: './encuesta-empresa.component.html',
  styleUrls: ['./encuesta-empresa.component.css'],
})
export class EncuestaEmpresaComponent {
  fa1 = fa1;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  selectedOption1: string = '';
  selectedOption2: string = '';
  selectedOption3: string = '';
  selectedOption4: string = '';
  selectedOption5: string = '';

  currentIndex = 0;

  next() {
    if (this.currentIndex < 3) {
      this.currentIndex++;
      this.updateAttributes();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateAttributes();
    }
  }

  private originalAttributes: Map<Element, { colspan: string | null, rowspan: string | null }> = new Map();

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.debouncedProcessAttributes();
  }

  ngOnInit() {
    this.processAttributesBasedOnScreenSize();
  }

  processAttributesBasedOnScreenSize() {
    const isMobile = window.innerWidth < 768; // Ancho considerado como pantalla móvil

    // Seleccionar todas las etiquetas <td> con los atributos colspan o rowspan
    const tdElements = this.elementRef.nativeElement.querySelectorAll('td[colspan], td[rowspan]');
    tdElements.forEach(tdElement => {
      if (!this.originalAttributes.has(tdElement)) {
        // Guardar los valores originales
        this.originalAttributes.set(tdElement, {
          colspan: tdElement.getAttribute('colspan'),
          rowspan: tdElement.getAttribute('rowspan')
        });
      }

      if (isMobile) {
        // Eliminar los atributos en pantallas móviles
        this.renderer.removeAttribute(tdElement, 'colspan');
        this.renderer.removeAttribute(tdElement, 'rowspan');
      } else {
        // Restaurar los atributos en pantallas grandes
        const original = this.originalAttributes.get(tdElement);
        if (original) {
          if (original.colspan !== null) {
            this.renderer.setAttribute(tdElement, 'colspan', original.colspan);
          }
          if (original.rowspan !== null) {
            this.renderer.setAttribute(tdElement, 'rowspan', original.rowspan);
          }
        }
      }
    });

    // Seleccionar todas las etiquetas <td> con la clase "cell"
    const cellElements = this.elementRef.nativeElement.querySelectorAll('td.cell');
    cellElements.forEach(cellElement => {
      if (isMobile) {
        this.renderer.setAttribute(cellElement, 'colspan', '2');
      } else {
        this.renderer.removeAttribute(cellElement, 'colspan');
      }
    });

    // Forzar detección de cambios
    this.cdr.detectChanges();
  }

  updateAttributes() {
    requestAnimationFrame(() => this.processAttributesBasedOnScreenSize());
  }

  private debouncedProcessAttributes() {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => this.updateAttributes(), 200);
  }

  private debounceTimeout: any;
}
