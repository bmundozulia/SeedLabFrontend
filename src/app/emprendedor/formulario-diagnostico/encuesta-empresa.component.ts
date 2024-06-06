import { Component, HostListener, ElementRef, Renderer2, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { fa1 } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PREGUNTAS } from './preguntas.component';

import { RespuestasService } from '../../servicios/respuestas.service';

import { User } from '../../Modelos/user.model';
import { Respuesta } from '../../Modelos/respuesta.model';
import { Preguntas } from '../../Modelos/preguntas.model';

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
  user: User;
  token = '';
  documento: string;
  currentRolId: string | null = null;
  currentIndex = 0;
  respuestasForm1: FormGroup;
  id_pregunta: number;
  id_subpregunta: number | null = null;
  private originalAttributes: Map<Element, { colspan: string | null, rowspan: string | null }> = new Map();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private respuestasService: RespuestasService,
  ) {  //Formulario seccion 1
    this.respuestasForm1 = this.fb.group({
      respuesta1: [new Respuesta({}), Validators.required],
      respuesta2: [new Respuesta({}), Validators.required],
      respuesta3: [new Respuesta({}), Validators.required],
      respuesta4: [new Respuesta({}), Validators.required],
      respuesta5: [new Respuesta({}), Validators.required],
      respuesta6: [new Respuesta({}), Validators.required],
      respuesta7: [new Respuesta({}), Validators.required],
      respuesta8: [new Respuesta({}), Validators.required],
      respuesta9: [new Respuesta({}), Validators.required],
      respuesta10: [new Respuesta({}), Validators.required],
      respuesta11: [new Respuesta({}), Validators.required],
      respuesta12: [new Respuesta({}), Validators.required],
      respuesta13: [new Respuesta({}), Validators.required],
      respuesta14: [new Respuesta({}), Validators.required],
      respuesta15: [new Respuesta({}), Validators.required],
      respuesta16: [new Respuesta({}), Validators.required],
      respuesta17: [new Respuesta({}), Validators.required],
      respuesta18: [new Respuesta({}), Validators.required],
      respuesta19: [new Respuesta({}), Validators.required],
      respuesta20: [new Respuesta({}), Validators.required],
      respuesta21: [new Respuesta({}), Validators.required],
      respuesta22: [new Respuesta({}), Validators.required],
      respuesta23: [new Respuesta({}), Validators.required],

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


  obtenerIds(): any[] {
    return PREGUNTAS.slice(0, 15).map(pregunta => {
      console.log(pregunta.id); // Verificar los IDs en la consola
      return pregunta.id;
    });
  }


  onSubmitSeccion1() {
    let firstForm: any[] = [];
    const id_empresa = 1;
    const ids_preguntas = this.obtenerIds();
    let answerCounter = 0;

    for (let i = 0; i < ids_preguntas.length; i++) {
      const currentPregunta = PREGUNTAS[i];
      if (currentPregunta.isAffirmativeResponse) {
        for (let j = 0; j < currentPregunta.subPreguntas.length; j++) {

          const currentResponse: Respuesta = this.respuestasForm1.get(`respuesta${j + answerCounter}`)?.value;
          if (currentResponse.texto_res) {
            firstForm.push(new Respuesta(
              {
                id_pregunta: currentPregunta.id,
                id_empresa: id_empresa,
                texto_res: currentResponse.texto_res,
                id_subpregunta: currentPregunta.subPreguntas[j].id,
              }
            ));
          } else {
            firstForm.push(new Respuesta(
              {
                id_pregunta: currentPregunta.id,
                id_empresa: id_empresa,
                opcion: currentResponse.opcion,
                id_subpregunta: currentPregunta.subPreguntas[j].id,
              }
            ));
          }
        }
        answerCounter += currentPregunta.subPreguntas.length+1;
        continue;
      }

      console.log(this.id_pregunta);
      const currentResponse: Respuesta = this.respuestasForm1.get(`respuesta${i + 1}`)?.value;

      if (currentResponse.texto_res) {
        firstForm.push(new Respuesta(
          {
            id_pregunta: currentPregunta.id,
            id_empresa: id_empresa,
            texto_res: currentResponse.texto_res,
          }
        ));
      } else {
        firstForm.push(new Respuesta(
          {
            id_pregunta: currentPregunta.id,
            id_empresa: id_empresa,
            opcion: currentResponse.opcion,
          }
        ));
      }
      answerCounter++;
      /*console.log(firstForm);
      this.respuestasService.saveAnswers(this.token, firstForm).subscribe(
        (data: any) => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );*/
    }
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
