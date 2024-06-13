import { Component, HostListener, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { fa1 } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { PREGUNTAS } from './preguntas.component';

import { AlertService } from '../../servicios/alert.service';
import { RespuestasService } from '../../servicios/respuestas.service';

import { Preguntas } from '../../Modelos/preguntas.model';
import { Respuesta } from '../../Modelos/respuesta.model';
import { User } from '../../Modelos/user.model';


@Component({
  selector: 'app-encuesta-empresa',
  templateUrl: './encuesta-empresa.component.html',
  styleUrls: ['./encuesta-empresa.component.css'],
  providers: [RespuestasService]
})
export class EncuestaEmpresaComponent {
  fa1 = fa1;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  preguntas: Preguntas[] = PREGUNTAS;
  firstForm: Object = {};
  section: number = 1;
  user: User;
  token = '';
  documento: string;
  currentRolId: string | null = null;
  currentIndex = 0;
  id_pregunta: number;
  id_subpregunta: number | null = null;
  private originalAttributes: Map<Element, { colspan: string | null, rowspan: string | null }> = new Map();

  respuesta1: Respuesta = new Respuesta({});
  respuesta2: Respuesta = new Respuesta({});
  respuesta3: Respuesta = new Respuesta({});
  respuesta4: Respuesta = new Respuesta({});
  respuesta5: Respuesta = new Respuesta({});
  respuesta6: Respuesta = new Respuesta({});
  respuesta7: Respuesta = new Respuesta({});
  respuesta8: Respuesta = new Respuesta({});
  respuesta9: Respuesta = new Respuesta({});
  respuesta10: Respuesta = new Respuesta({});
  respuesta11: Respuesta = new Respuesta({});
  respuesta12: Respuesta = new Respuesta({});
  respuesta13: Respuesta = new Respuesta({});
  respuesta14: Respuesta = new Respuesta({});
  respuesta15: Respuesta = new Respuesta({});
  respuesta16: Respuesta = new Respuesta({});
  respuesta17: Respuesta = new Respuesta({});
  respuesta18: Respuesta = new Respuesta({});
  respuesta19: Respuesta = new Respuesta({});
  respuesta20: Respuesta = new Respuesta({});
  respuesta21: Respuesta = new Respuesta({});
  respuesta22: Respuesta = new Respuesta({});
  respuesta23: Respuesta = new Respuesta({});




  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private respuestasService: RespuestasService,
    private alertService: AlertService,
  ) { }



  ngOnInit() {
    this.processAttributesBasedOnScreenSize();
    this.validateToken();
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
      //console.log(pregunta.id); // Verificar los IDs en la consola
      return pregunta.id;
    });
  }


  onSubmitSeccion1() {
    //console.log(this.respuesta1);
    let id_empresa = 1;

    const listaRespuestas: Respuesta[] = [];

    listaRespuestas.push(this.respuesta1);
    //pregunta 2
    listaRespuestas.push(this.respuesta2);
    listaRespuestas.push(this.respuesta3);
    listaRespuestas.push(this.respuesta4);
    listaRespuestas.push(this.respuesta5);
    listaRespuestas.push(this.respuesta6);
    //fin pregunta 2
    listaRespuestas.push(this.respuesta7);
    listaRespuestas.push(this.respuesta8);
    listaRespuestas.push(this.respuesta9);
    listaRespuestas.push(this.respuesta10);
    listaRespuestas.push(this.respuesta11);
    listaRespuestas.push(this.respuesta12);
    listaRespuestas.push(this.respuesta13);
    if (this.respuesta13.opcion === 'Si') {
      listaRespuestas.push(this.respuesta14);
      listaRespuestas.push(this.respuesta15);
    }
    listaRespuestas.push(this.respuesta16);
    if (this.respuesta16.opcion === 'Si') {
      listaRespuestas.push(this.respuesta17);
      listaRespuestas.push(this.respuesta18);
      listaRespuestas.push(this.respuesta19);
      listaRespuestas.push(this.respuesta20);
    }
    listaRespuestas.push(this.respuesta21);
    listaRespuestas.push(this.respuesta22);
    listaRespuestas.push(this.respuesta23);
    let isValidForm = true;
    const payload = { respuestas: listaRespuestas };
    let respCounter = 0;

    for (let i = 0; i < 15; i++) {
      const currentPregunta = PREGUNTAS[i];
      listaRespuestas[respCounter].id_pregunta = i + 1;
      listaRespuestas[respCounter].id_empresa = id_empresa;
      listaRespuestas[respCounter].id_subpregunta = null;

      if (currentPregunta.id === 2) {
        for (let j = 0; j < currentPregunta.subPreguntas.length - 1; j++) {
          //debugger;
          if (listaRespuestas[respCounter + j].opcion !== 'Si') {
            listaRespuestas[respCounter + j].texto_res = '0';
          }
          listaRespuestas[respCounter + j].id_pregunta = i+1;
          listaRespuestas[respCounter + j].id_subpregunta = j + 1;
          listaRespuestas[respCounter + j].id_empresa = id_empresa;

        }
        respCounter += currentPregunta.subPreguntas.length - 1;

      } else if (currentPregunta.id === 12) {
        //debugger
        if (listaRespuestas[respCounter].opcion === 'Si') {
          for (let k = 0; k < currentPregunta.subPreguntas.length; k++) {
            listaRespuestas[respCounter + 1 + k].id_pregunta = i;
            listaRespuestas[respCounter + 1 + k].id_subpregunta = k + 1;
            listaRespuestas[respCounter + 1 + k].id_empresa = id_empresa;

          }
          respCounter += currentPregunta.subPreguntas.length;
        }
        respCounter++;
      } else {
        if (currentPregunta.isText) {
          if (!listaRespuestas[respCounter].texto_res || listaRespuestas[respCounter].texto_res === '') {
            this.alertService.errorAlert('Error', 'Deben llenar los campos');
            isValidForm = false;
            return;
          }
        } else {
          if (!listaRespuestas[respCounter].opcion || listaRespuestas[respCounter].opcion === '') {
            this.alertService.errorAlert('Error', 'Deben llenar los campos');
            isValidForm = false;
            return;
          }
        }
        if (currentPregunta.isAffirmativeQuestion) {
          if (listaRespuestas[respCounter].opcion === 'No') {
            i += currentPregunta.subPreguntas.length;
            respCounter += currentPregunta.subPreguntas.length;
            continue;
          }
        }
        respCounter++;
      }
      /*if(!isValidForm){
        return
      }*/
      //listaRespuestas[i].valor = 3;
      console.log(i);
      //console.log('fuera del ciclo', listaRespuestas);
    }
    if (!isValidForm) {
      return
    } this.respuestasService.saveAnswers(this.token, payload).subscribe(
      (data: any) => {
        console.log(data);
      },
      error => {
        console.log(error);
      });


  }


  /**
   * onSubmitSeccion1() {
     //console.log(this.respuesta1);
     let id_empresa = 1;
 
     const listaRespuestas: Respuesta[] = [];
     listaRespuestas.push(this.respuesta1);
     listaRespuestas.push(this.respuesta3);
     listaRespuestas.push(this.respuesta4);
     listaRespuestas.push(this.respuesta5);
     listaRespuestas.push(this.respuesta6);
     listaRespuestas.push(this.respuesta7);
     listaRespuestas.push(this.respuesta8);
     listaRespuestas.push(this.respuesta9);
     listaRespuestas.push(this.respuesta10);
     listaRespuestas.push(this.respuesta11);
     listaRespuestas.push(this.respuesta12);
     listaRespuestas.push(this.respuesta13);
     if (this.respuesta13.opcion === 'Si') {
       listaRespuestas.push(this.respuesta14);
       listaRespuestas.push(this.respuesta15);
     }
     listaRespuestas.push(this.respuesta16);
     if (this.respuesta16.opcion === 'Si') {
       listaRespuestas.push(this.respuesta17);
       listaRespuestas.push(this.respuesta18);
       listaRespuestas.push(this.respuesta19);
       listaRespuestas.push(this.respuesta20);
     }
     listaRespuestas.push(this.respuesta21);
     listaRespuestas.push(this.respuesta22);
     let isValidForm = true;
 
     for (let i = 0; i < listaRespuestas.length; i++) {
       listaRespuestas[i].id_pregunta = i + 1;
       listaRespuestas[i].id_empresa = id_empresa;
       const currentPregunta = PREGUNTAS[i];
       if (currentPregunta.isText) {
         if (!listaRespuestas[i].texto_res || listaRespuestas[i].texto_res === '') {
           this.alertService.errorAlert('Error', 'Deben llenar los campos');
           isValidForm = false;
           return;
         }
       } else {
         if (!listaRespuestas[i].opcion || listaRespuestas[i].opcion === '') {
           this.alertService.errorAlert('Error', 'Deben llenar los campos');
           isValidForm = false;
           return;
         }
       }
       if (currentPregunta.isAffirmativeQuestion) {
         if (listaRespuestas[i].opcion === 'No') {
           i += currentPregunta.subPreguntas.length;
           continue;
         }
       }
       /*if(!isValidForm){
         return
       }
       //listaRespuestas[i].valor = 3;
       console.log(i);
       console.log('fuera del ciclo', listaRespuestas);
     }
     if (!isValidForm) {
       return
     } this.respuestasService.saveAnswers(this.token, listaRespuestas).subscribe(
       (data: any) => {
         console.log(data);
       },
       error => {
         console.log(error);
       });
 
 
   }  */




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
