import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../servicios/switch.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent implements OnInit {

  modalSwitch: boolean;

  constructor(private modalSS: SwitchService) { }

  ngOnInit() {
    this.modalSS.$modal.subscribe((valor) => { this.modalSwitch = valor });
  }

  openModal() {
    this.modalSwitch = true;
  }

  persona = {
    tipoDocumento: '',
    descripcion: '',
    titulo: '',
    cuerpo: '',
    links: ''
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (this.isFormValid()) {
      console.log('Form data:', this.persona);
      // Realizar acción de guardar
    }
  }

  isFormValid() {
    return this.persona.tipoDocumento && this.persona.descripcion && this.persona.titulo && this.persona.cuerpo && this.persona.links;
  }

  rutas: string[] = ['Ruta 1', 'Ruta 2'];
  selectedRuta: string | null = null;
  currentStep: number = 1;

  actividad = { nombre: '' };
  nivel = { nombre: '', descripcion: '' };
  lecciones: any[] = [{ nombre: '', archivo: null, url: '', descripcion: '' }];
  crearOtroNivel: boolean = false;
  otroNivel = { nombre: '', descripcion: '' };
  niveles: any[] = [];

  addingOtroNivel: boolean = false;
  otroNivelAgregado: boolean = false;
  otroNivelLecciones: any[] = [{ nombre: '', archivo: null, url: '', descripcion: '' }];

  selectRuta(ruta: string) {
    this.selectedRuta = ruta;
    this.currentStep = 1;
    this.actividad = { nombre: '' };
    this.nivel = { nombre: '', descripcion: '' };
    this.lecciones = [{ nombre: '', archivo: null, url: '', descripcion: '' }];
    this.crearOtroNivel = false;
    this.otroNivel = { nombre: '', descripcion: '' };
    this.niveles = [];
    this.addingOtroNivel = false;
    this.otroNivelAgregado = false;
    this.otroNivelLecciones = [{ nombre: '', archivo: null, url: '', descripcion: '' }];
  }

  nextStep() {
    if (this.validateCurrentStep()) {
      this.currentStep++;
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  validateCurrentStep() {
    switch (this.currentStep) {
      case 1:
        return this.actividad.nombre !== '';
      case 2:
        return this.nivel.nombre !== '' && this.nivel.descripcion !== '';
      case 3:
        return this.lecciones.every(leccion => leccion.nombre !== '' && leccion.archivo !== null && leccion.url !== '' && leccion.descripcion !== '');
      default:
        return false;
    }
  }

  onFileSelected(event: any, index: number) {
    this.lecciones[index].archivo = event.target.files[0];
  }

  addLeccion() {
    this.lecciones.push({ nombre: '', archivo: null, url: '', descripcion: '' });
  }

  finalizar() {
    alert('Formulario completado.');
    this.crearOtroNivel = true;
  }

  startAddingOtroNivel() {
    this.addingOtroNivel = true;
  }

  addOtroNivel() {
    if (this.otroNivel.nombre !== '' && this.otroNivel.descripcion !== '') {
      this.otroNivelAgregado = true;
    } else {
      alert('Por favor, complete todos los campos del nivel.');
    }
  }

  onOtroNivelFileSelected(event: any, index: number) {
    this.otroNivelLecciones[index].archivo = event.target.files[0];
  }

  addOtroNivelLeccion() {
    this.otroNivelLecciones.push({ nombre: '', archivo: null, url: '', descripcion: '' });
  }

  addOtroNivelToList() {
    if (this.otroNivelLecciones.every(leccion => leccion.nombre !== '' && leccion.archivo !== null && leccion.url !== '' && leccion.descripcion !== '')) {
      this.niveles.push({ ...this.otroNivel, lecciones: [...this.otroNivelLecciones] });
      this.otroNivel = { nombre: '', descripcion: '' };
      this.otroNivelLecciones = [{ nombre: '', archivo: null, url: '', descripcion: '' }];
      this.otroNivelAgregado = false;
      this.addingOtroNivel = false;
    } else {
      alert('Por favor, complete todos los campos de las lecciones.');
    }
  }

}
