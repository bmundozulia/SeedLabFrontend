
export interface Preguntas {
    id: number;
    nombre: string;
    puntaje: number;
    id_seccion: number;
    subPreguntas?: SubPreguntas[]; // Opcionalmente, puedes añadir subPreguntas aquí
}

export interface SubPreguntas {
    id: number;
    texto: string;
    puntaje: number;
    id_pregunta: number;
}
