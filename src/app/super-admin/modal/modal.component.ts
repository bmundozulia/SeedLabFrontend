import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RutaService } from '../../servicios/rutas.service';
import { SwitchService } from '../../servicios/switch.service'
import { Ruta } from '../../Modelos/ruta.modelo';
import { User } from '../../Modelos/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [RutaService, DatePipe]

})
export class ModalComponent implements OnInit {

  createRutaForm: FormGroup;
  token = '';
  user: User | null = null;
  currentRolId: string | null = null;
  now = new Date();
  formattedDate: string = '';
  submitted: boolean = false;
  private modalSubscription: Subscription;
  isVisible = true;


  constructor(
    private modalSS: SwitchService,
    private rutaService: RutaService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
  ) {
    this.createRutaForm = this.fb.group({
      nombre: [''],
      fecha_creacion: [this.formattedDate],
      estado: ['1']
    });
  }

  /* Inicializa con esas funciones al cargar la pagina */
  ngOnInit(): void {
    this.validateToken();
  }
  
  /* Valida el token del login */
  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }

  createRuta() {
    this.modalSS.$modal.emit(false);
    const ruta = new Ruta(
      this.createRutaForm.get('nombre')?.value,
      this.createRutaForm.get('fecha_creacion')?.value,
      this.createRutaForm.get('estado')?.value
    );
    this.rutaService.createRutas(this.token, ruta).subscribe(
      (response: any) => {
        console.log(response);

      },
      (error) => {
        console.error(error);
      }
    )
  };

  closeModal() {
    this.modalSS.$modal.emit(false);
  }




  // isFormValid() {
  //   return this.persona.nombre.trim() !== '';
  // }
}