import { User } from "./user.model";

export class Aliado {
    id?: number;
    nombre: string | null;
    descripcion: string | null;
    logo: string | null;
    banner: string | null;
    ruta_multi: string | null;
    id_autenticacion: number | null;
    id_tipo_dato: number | null;
    email: string | null;
    estado_usuario: string | null;

    constructor(id: number, nombre: string, descripcion: string, logo: string, banner:string, ruta_multi: string, id_autenticacion: number, id_tipo_dato: number, email: string, estado_usuario: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.logo = logo;
        this.banner = banner;
        this.ruta_multi = ruta_multi;
    }
}