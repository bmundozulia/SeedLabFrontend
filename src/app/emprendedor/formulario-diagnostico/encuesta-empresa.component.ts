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
import { OpcionesRespuesta } from '../../Modelos/opciones-respuesta.model';
import { AlertService } from '../../servicios/alert.service';

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
  respuestasForm1: FormGroup;
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




  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private respuestasService: RespuestasService,
    private alertService: AlertService,
  ) {  //Formulario seccion 1
    /*this.respuestasForm1 = this.fb.group({
      respuesta1: [new Respuesta({}).opcion, Validators.required],
      respuesta2: [new Respuesta({}).opcion, Validators.required],
      respuesta3: [new Respuesta({}).opcion, Validators.required],
      respuesta4: [new Respuesta({}).opcion, Validators.required],
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

    });*/
    /*for(let i = 0; i < 15; i++){
      this.firstForm[`option${i}`]= new OpcionesRespuesta({}) ;
    }*/


  }



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
    listaRespuestas.push(this.respuesta3);
    listaRespuestas.push(this.respuesta4);
    listaRespuestas.push(this.respuesta5);
    listaRespuestas.push(this.respuesta6);
    listaRespuestas.push(this.respuesta7);
    listaRespuestas.push(this.respuesta8);
    listaRespuestas.push(this.respuesta9);
    if (this.respuesta9.opcion === 'Si') {
      listaRespuestas.push(this.respuesta10);
      listaRespuestas.push(this.respuesta11);
    }
    listaRespuestas.push(this.respuesta12);
    listaRespuestas.push(this.respuesta13);
    listaRespuestas.push(this.respuesta14);
    listaRespuestas.push(this.respuesta15);
    let isValidForm = true;

    for (let i = 0; i < listaRespuestas.length; i++) {
      listaRespuestas[i].id_pregunta = i + 1;
      listaRespuestas[i].id_empresa = id_empresa;
      const currentPregunta = PREGUNTAS[i];
      if(currentPregunta.isText){
        if(listaRespuestas[i].texto_res === undefined || listaRespuestas[i].texto_res === ''){
          this.alertService.errorAlert('Error','Deben llenar los campos');  
          isValidForm = false;
          return;
        }
      }else{
        if(listaRespuestas[i].opcion === undefined || listaRespuestas[i].opcion === ''){
          this.alertService.errorAlert('Error','Deben llenar los campos');  
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
      }*/
      //listaRespuestas[i].valor = 3;
      console.log(i);
    }
    if(!isValidForm){
      return
    }
    console.log('------------------------');
    console.log('fuera del ciclo',listaRespuestas);
    

    /*const id_empresa = 1;
    const ids_preguntas = this.obtenerIds();
    let answerCounter = 0;

    for (let i = 0; i < ids_preguntas.length; i++) {
      const currentPregunta = PREGUNTAS[i];
      if (currentPregunta.isAffirmativeResponse) {
        for (let j = 0; j < currentPregunta.subPreguntas.length; j++) {

          const currentResponse: Respuesta = this.respuestasForm1.get(`respuesta${j + answerCounter}`)?.value;
          console.log(currentResponse);
          if (currentResponse.texto_res) {
            this.firstForm.push(new Respuesta(
              {
                id_pregunta: currentPregunta.id,
                id_empresa: id_empresa,
                texto_res: currentResponse.texto_res,
                id_subpregunta: currentPregunta.subPreguntas[j].id,
              }
            ));
          } else {
            this.firstForm.push(new Respuesta(
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

      
      const currentResponse: Respuesta = this.respuestasForm1.get(`respuesta${i + 1}`)?.value;
      console.log('CuurrentResponsee',currentResponse);
      
      if (currentResponse.texto_res) {
        this.firstForm.push(new Respuesta(
          {
            id_pregunta: currentPregunta.id,
            id_empresa: id_empresa,
            texto_res: currentResponse.texto_res,
          }
        ));
      } else {
        this.firstForm.push(new Respuesta(
          {
            id_pregunta: currentPregunta.id,
            id_empresa: id_empresa,
            opcion: currentResponse.opcion,
          }
        ));
      }
      answerCounter++;
    }
    console.log(this.firstForm);
    console.log (this.respuestasForm1.value);
    this.respuestasService.saveAnswers(this.token, this.firstForm).subscribe(
      (data: any) => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );*/
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
