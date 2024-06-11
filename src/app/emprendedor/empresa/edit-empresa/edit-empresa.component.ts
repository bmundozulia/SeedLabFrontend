import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faLandmarkFlag } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faMountainCity } from '@fortawesome/free-solid-svg-icons';

import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrl: './edit-empresa.component.css',
  providers:[HeaderComponent]
})
export class EditEmpresaComponent implements OnInit {
  empresaForm: FormGroup;
  faIdCard = faIdCard;
  faMountainCity = faMountainCity;
  faLandmarkFlag = faLandmarkFlag;
  faLocationDot=faLocationDot;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Inicializar el formulario reactivo
    this.empresaForm = this.fb.group({
      nombre: ['', Validators.required],
      documento: ['', Validators.required],
      nombretipodoc: ['', Validators.required],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      cargo: ['', Validators.required],
      razonSocial: [''],
      url_pagina: [''],
      telefono: [''],
      celular: [''],
      direccion: [''],
      profesion: [''],
      experiencia: [''],
      funciones: [''],
      apoyo: [false]
    });

    // Simular la carga de datos de la empresa a editar
    this.cargarDatosEmpresa();
  }

  cargarDatosEmpresa(): void {
    // Aquí cargarías los datos de la empresa a editar, por ejemplo, desde una API
    // Supongamos que los datos se cargan en un objeto llamado 'empresa'
    const empresa = {
      nombre: 'Nombre de la empresa',
      documento: '123456789',
      nombretipodoc: 'Cédula ciudadanía',
      departamento: 'Departamento',
      municipio: 'Municipio',
      correo: 'empresa@example.com',
      cargo: 'Gerente',
      // Resto de los datos de la empresa...
    };

    // Asignar los datos de la empresa al formulario
    this.empresaForm.patchValue(empresa);
  }
  mostrarOcultarContenido() {
    const checkbox = document.getElementById("mostrarContenido") as HTMLInputElement;
    const contenidoDiv = document.getElementById("contenido");
    const guardar = document.getElementById("guardar");
    if (contenidoDiv && guardar) {
      contenidoDiv.style.display = checkbox.checked ? "block" : "none";
      guardar.style.display = checkbox.checked ? "none" : "block";
    }
  }

  onSubmit(): void {
    // Aquí implementarías la lógica para enviar los datos editados al servidor
    // Por ejemplo, podrías llamar a un servicio que actualice los datos de la empresa en la base de datos
    console.log(this.empresaForm.value);
  }

 
  onDepartamentoSeleccionado(departamento: string): void {
    // Lógica para cargar los municipios correspondientes al departamento seleccionado
  }
}
