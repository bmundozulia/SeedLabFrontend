import { Component, HostListener, ElementRef, Renderer2, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { fa1 } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Respuesta } from '../../Modelos/respuesta.model';
import { Preguntas } from '../../Modelos/preguntas.model';
import { PREGUNTAS } from './preguntas.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpcionesRespuesta } from '../../Modelos/opciones-respuesta.model';
import { RespuestasService } from '../../servicios/respuestas.service';
import { User } from '../../Modelos/user.model';

@Component({
  selector: 'app-encuesta-empresa',
  templateUrl: './encuesta-empresa.component.html',
  styleUrls: ['./encuesta-empresa.component.css'],
  providers: [RespuestasService]
})
export class EncuestaEmpresaComponent implements AfterViewInit {
  fa1 = fa1;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  selectedOption1: string = '';
  selectedOption2: string = '';
  selectedOption3: string = '';
  selectedOption4: string = '';
  selectedOption5: string = '';
  respuestas: Respuesta[] = [];
  preguntas: Preguntas[] = PREGUNTAS;
  section: number = 1;
  user:User;
  token = '';
  documento: string;
  currentRolId: string | null = null;
  currentIndex = 0;
  respuestasForm1:FormGroup;
  private originalAttributes: Map<Element, { colspan: string | null, rowspan: string | null }> = new Map();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private respuestasService: RespuestasService,
  ) {  //Formulario seccion 1
    this.respuestasForm1 = this.fb.group({
      opcion: [''],
      texto_res: [''],
      valor: [''],
      verform_pr: true,
      verform_se: false,
      fecha_reg: [new Date()],
      id_pregunta: [null],
      id_empresa: [null],
      id_subpregunta: [null],
    });
  }

 
  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        this.documento = this.user.emprendedor.documento;
        this.currentRolId = this.user.id_rol?.toString();
      }
    }
  }

  getIdPregunta(index: number): number | null {
    let preguntaCounter = 0;
    let subPreguntaCounter = 0;

    for (const pregunta of this.preguntas) {
      if (preguntaCounter === index) {
        return pregunta.id;
      }
      preguntaCounter++;

      if (pregunta.subPreguntas) {
        for (const subPregunta of pregunta.subPreguntas) {
          if (subPreguntaCounter === index) {
            return subPregunta.id;
          }
          subPreguntaCounter++;
        }
      }
    }
    return null;
  }

  tieneSubPregunta(id_pregunta: number): boolean {
    const pregunta = this.preguntas.find(p => p.id === id_pregunta);
    return pregunta && pregunta.subPreguntas && pregunta.subPreguntas.length > 0;
  }

  onSubmitSeccion1() {
    let firstForm = <any>[];
    const id_empresa = 1;

    for (let i = 0; i < 15; i++) {
      opcion: this.respuestasForm1.get('opcion${i}')?.value;
      text_res: this.respuestasForm1.get('text_res${i}')?.value;
      
      let id_pregunta = this.getIdPregunta(i);
      const tieneSubPregunta = this.tieneSubPregunta(id_pregunta);


      if (tieneSubPregunta) {
        firstForm.push(new Respuesta(
          id_pregunta,
          id_empresa,
          null,
          
        ));      
      } else {
        firstForm.push(new Respuesta(
          id_pregunta,
          id_empresa,
          null,
          
        ));
      }
    }
    this.respuestasService.saveAnswers(this.token,firstForm).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    ); 
  }







  loadNextSection(): void {
    this.section++;
  }

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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.debouncedProcessAttributes();
  }

  ngOnInit() {
    this.processAttributesBasedOnScreenSize();
  }

  ngAfterViewInit() {
    this.processAttributesBasedOnScreenSize();
  }

  processAttributesBasedOnScreenSize() {
    const isMobile = window.innerWidth < 768; // Ancho considerado como pantalla móvil

    // Seleccionar todas las etiquetas <td> con los atributos colspan o rowspan
    const tdElements = this.elementRef.nativeElement.querySelectorAll('td');
    tdElements.forEach(tdElement => {
      const colspan = tdElement.getAttribute('colspan');
      const rowspan = tdElement.getAttribute('rowspan');
      if (!this.originalAttributes.has(tdElement)) {
        // Guardar los valores originales
        this.originalAttributes.set(tdElement, {
          colspan: colspan,
          rowspan: rowspan
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
    requestAnimationFrame(() => {
      this.processAttributesBasedOnScreenSize();
    });
  }

  private debouncedProcessAttributes() {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => this.updateAttributes(), 200);
  }

  private debounceTimeout: any;
}
