import { Emprendedor } from "./emprendedor.model";

export class Empresa {

    documento?: number;
    nombre?: string | null | undefined;
    cargo: string | null | undefined;
    razonSocial: string | null | undefined;
    url_pagina: string | null | undefined
    telefono: number;
    celular: number;
    direccion: string | null | undefined;
    profesion: string | null | undefined;
    correo: string | null | undefined;
    experiencia: string | null | undefined;
    funciones: string | null | undefined;
    id_tipo_documento?:number;
    id_municipio?:number;
    id_emprendedor?: number;

    constructor(
        documento?: number,
        nombre?: string | null | undefined,
        cargo?: string | null | undefined,
        razonSocial?: string | null | undefined,
        url_pagina?: string | null | undefined,
        telefono?: number,
        celular?: number,
        direccion?: string | null | undefined,
        profesion?: string | null | undefined,
        correo?: string | null | undefined,
        experiencia?: string | null | undefined,
        funciones?: string | null | undefined,
        id_tipo_documento?:number,
        id_municipio?:number,
        id_emprendedor?: number){
            this.documento = documento;
            this.nombre = nombre;
            this.cargo = cargo;
            this.razonSocial = razonSocial;
            this.url_pagina = url_pagina;
            this.telefono = telefono;
            this.celular = celular;
            this.direccion = direccion;
            this.profesion = profesion;
            this.correo = correo;
            this.experiencia =experiencia;
            this.funciones = funciones;
            this.id_tipo_documento = id_tipo_documento;
            this.id_municipio = id_municipio;
            this.id_emprendedor = id_emprendedor;
        }

}
