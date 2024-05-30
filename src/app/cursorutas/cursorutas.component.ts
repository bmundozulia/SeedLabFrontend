import { Component } from '@angular/core';

@Component({
  selector: 'app-cursorutas',
  templateUrl: './cursorutas.component.html',
  styleUrl: './cursorutas.component.css'
})
export class CursorutasComponent {
  items = [
    {
      title: 'Nivel 1',
      subItems: ['Lección 1.1', 'Lección 1.2'],
      expanded: false
    },
    {
      title: 'Nivel 2',
      subItems: ['Lección 2.1', 'Lección 2.2'],
      expanded: false
    },
    // Añadir más items según sea necesario
  ];

  videos = [];

   // Estructura de datos para diferentes tipos de contenido
   contentData = {
    'Lección 1.1': [
      { type: 'video', url: 'video1_1.mp4', progress: 0 },
      { type: 'image', url: 'image1_1.png' },
      { type: 'text', content: 'Este es un texto de ejemplo para la lección 1.1' },
      { type: 'pdf', url: 'document1_1.pdf' }
    ],
    'Lección 1.2': [
      { type: 'video', url: 'video2_1.mp4', progress: 25 },
      { type: 'form', fields: [{ label: 'Nombre', type: 'text' }, { label: 'Edad', type: 'number' }] }
    ],
    'Lección 2.1': [
      { type: 'text', content: 'Contenido de texto para la lección 2.1' },
      { type: 'pdf', url: 'document2_1.pdf' }
    ],
    'Lección 2.2': [
      { type: 'image', url: 'image2_1.png' },
      { type: 'video', url: 'video2_2.mp4', progress: 60 }
    ],
    // Añadir más datos de contenido según sea necesario
  };

  selectedContent = [];

  toggleItem(index: number) {
    this.items[index].expanded = !this.items[index].expanded;
  }

  selectSubItem(subItem: string) {
    this.selectedContent = this.contentData[subItem] || [];
  }
}