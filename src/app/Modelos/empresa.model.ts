import { Emprendedor } from "./emprendedor.model";

export class Empresa {

    documento?: number;
    nombre: string | null | undefined;
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
    id_tipo_documento:number;
    id_municipio:number;
    id_emprendedor: Emprendedor;

}
