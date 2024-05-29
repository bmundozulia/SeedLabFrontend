import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrl: './edit-empresa.component.css'
})
export class EditEmpresaComponent implements OnInit {
  empresaForm: FormGroup;

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

  onSubmit(): void {
    // Aquí implementarías la lógica para enviar los datos editados al servidor
    // Por ejemplo, podrías llamar a un servicio que actualice los datos de la empresa en la base de datos
    console.log(this.empresaForm.value);
  }

  mostrarOcultarContenido(): void {
    // Lógica para mostrar u ocultar el contenido según el estado del checkbox
  }

  onDepartamentoSeleccionado(departamento: string): void {
    // Lógica para cargar los municipios correspondientes al departamento seleccionado
  }
}
