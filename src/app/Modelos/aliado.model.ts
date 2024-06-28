import { User } from "./user.model";

export class Aliado {
    id?: number;
    nombre: string | null;
    descripcion: string | null;
    logo: string | null;
    ruta: string | null;
    id_autenticacion: number | null;
    tipodato: number | null;
    email: string | null;
    estado: string | null;

    constructor(id: number, nombre: string, descripcion: string, logo: string, ruta: string, id_autenticacion: number, tipodato: number, email: string, estado: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.logo = logo;
        this.ruta = ruta;
        this.id_autenticacion = id_autenticacion;
        this.tipodato = tipodato;
        this.email = email;
        this.estado = estado;
    }
}
