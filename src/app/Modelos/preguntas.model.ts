
export interface OpcionesRespuesta {
    option: string;
    isText: boolean;
}

export interface SubPreguntas {
    id: number;
    texto: string;
    puntaje: number;
    id_pregunta: number;
    respuesta?: OpcionesRespuesta[]
}
export interface Preguntas {
    id: number;
    nombre: string;
    puntaje: number;
    id_seccion: number;
    isAffirmativeQuestion: boolean;
    isText: boolean;
    respuesta: OpcionesRespuesta[];
    subPreguntas: SubPreguntas[]; // Opcionalmente, puedes añadir subPreguntas aquí
}


