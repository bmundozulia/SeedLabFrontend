
export interface Preguntas {
    id: number;
    nombre: string;
    puntaje: number;
    id_seccion: number;
    isAffirmativeResponse : boolean;
    subPreguntas: SubPreguntas[]; // Opcionalmente, puedes añadir subPreguntas aquí
}

export interface SubPreguntas {
    id: number;
    texto: string;
    puntaje: number;
    id_pregunta: number;
}
