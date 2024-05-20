import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.component.html',
  styleUrls: ['./asesorias.component.css']
})
export class AsesoriasComponent implements OnInit {
  barritaColor: string;

  ngOnInit() {
    this.initDatos();
  }

  initDatos() {
    const datosJSON = [
      {
        "titulo": "Asesoria#1",
        "fecha": "2024-05-10",
        "descripcion": "Juan valdez",
        "responsable": "Juan Pérez",
        "telefono": "+1234567890",
        "correo": "juan.perez@example.com",
        "Estado": "Finalizada",
      },
      {
        "titulo": "Asesoria#1",
        "fecha": "2024-05-10",
        "descripcion": "Juan valdez",
        "responsable": "Juan Pérez",
        "telefono": "+1234567890",
        "correo": "juan.perez@example.com",
        "Estado": "Pendiente",
      },
      // Otros datos...
    ];

    const contenedor = document.getElementById('contenedorp');

    datosJSON.forEach((item) => {
      const nuevaTarjeta = document.createElement('div');
      nuevaTarjeta.classList.add('relative', 'bg-white', 'rounded-lg', 'shadow-md',
        'overflow-hidden', 'w-80', 'm-4');

      this.barritaColor = item.Estado === 'Finalizada' ? 'bg-[#C5F9AD]' : 'bg-[#FFB7B7]';

      nuevaTarjeta.innerHTML = `
        <div class="absolute h-full w-2 ${this.barritaColor}"></div>
        <div class="p-4 border border-gray-200">
          <h2 class="text-xl font-bold mb-2">${item.titulo}</h2>
          <p class="text-gray-700 mb-4">${item.fecha}</p>
          <h2 class="text-l font-semibold">${item.descripcion}</h2>
          <p class="text-gray-700">${item.responsable}</p>
          <p class="text-gray-700">${item.telefono}</p>
          <p class="text-gray-700">${item.correo}</p>
          <p class="text-gray-700">${item.Estado}</p>
        </div>
      `;

      contenedor.appendChild(nuevaTarjeta);
    });
  }

  changeColor(button) {
    const buttons = document.querySelectorAll('.btn-color');
    buttons.forEach(btn => {
      btn.classList.remove('bg-gray-200');
    });
    button.classList.add('bg-gray-200');
  }
}
