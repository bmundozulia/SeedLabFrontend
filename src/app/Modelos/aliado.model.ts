import { User } from "./user.model";

export class Aliado {
    id?: number;
    nombre: string | null;
    descripcion: string | null;
    logo: string | null;
    ruta_multi: string | null;
    id_autenticacion: number | null;
    id_tipo_dato: number | null;
    user?: User;

    constructor(id: number, nombre: string, descripcion: string, logo: string, ruta_multi: string, id_autenticacion: number, id_tipo_dato: number, user: User) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.logo = logo;
        this.ruta_multi = ruta_multi;
        this.id_autenticacion = id_autenticacion;
        this.id_tipo_dato = id_tipo_dato;
        this.user = user;
    }
}
