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
  user: User;
  token = '';
  documento: string;
  currentRolId: string | null = null;
  currentIndex = 0;
  respuestasForm1: FormGroup;
  id_pregunta: number[];
  id_subpregunta: number[][] | null = null;
  private originalAttributes: Map<Element, { colspan: string | null, rowspan: string | null }> = new Map();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private respuestasService: RespuestasService,
  ) {  //Formulario seccion 1
    this.respuestasForm1 = this.fb.group({
     respuesta1:[''],
     respuesta2: [''],
     respuesta3: [''],
     respuesta4: [''],
     respuesta5: [''],
     respuesta6: [''],
     respuesta7: [''],
     respuesta8: [''],
     respuesta9: [''],
     respuesta10: [''],
     respuesta11: [''],
     respuesta12: [''],
     respuesta13: [''],
     respuesta14: [''],
     respuesta15: [''],
     respuesta16: [''],
     respuesta17: [''],
     respuesta18: [''],
     respuesta19: [''],
     respuesta20: [''],
     respuesta21: [''],
     respuesta22: [''],
     respuesta23: [''],

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

  /*obtenerIds(index: number):any{
    PREGUNTAS.map(pregunta=>{
      console.log(pregunta.id);
      if(pregunta.subPreguntas.length > 0){
        pregunta.subPreguntas.map(subPregunta=>{
          this.id_subpregunta = subPregunta.id;
          console.log(subPregunta.id);
          return subPregunta.id;
        })
      }
      return pregunta.id;
    });
  }*/

  tieneSubPregunta(id_preguntas: number): boolean {
    const pregunta = this.preguntas.find(p => p.id === id_preguntas);
    return pregunta && pregunta.subPreguntas && pregunta.subPreguntas.length > 0;
  }

  onSubmitSeccion1() {
    let firstForm: any[] = [];
    const id_empresa = 1;
    this.id_pregunta = PREGUNTAS.map(pregunta=>{
      return pregunta.id;
    });

    this.id_subpregunta = PREGUNTAS.map(pregunta=>{
      return pregunta.subPreguntas.map(subPregunta=>{
        return subPregunta.id;
      })
    })

    for (let i = 0; i < 23; i++) {
      let id_preguntas = this.getIdPregunta(i);
      const tieneSubPregunta = this.tieneSubPregunta(id_preguntas);
      if(tieneSubPregunta) {
        firstForm.push(new Respuesta(
          this.id_pregunta[i],
          id_empresa,
          this.respuestasForm1.get(`respuesta${i}`)?.value,
          this.respuestasForm1.get(`respuesta${i}`)?.value,
          this.id_subpregunta [i][i]
        ));
      }else{
        firstForm.push(new Respuesta(
          this.id_pregunta[i],
          id_empresa,
          this.respuestasForm1.get(`respuesta${i}`)?.value,
          this.respuestasForm1.get(`respuesta${i}`)?.value 
        ));
      }
      
      }
      console.log(firstForm); 
      this.respuestasService.saveAnswers(this.token, firstForm).subscribe(
      (data:any) => {
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
