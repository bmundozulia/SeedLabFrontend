import { User } from "./user.model";

export class Aliado {
    id?: number;
    nombre: string | null;
    descripcion: string | null;
    logo: string | null;
    banner: string | null;
    ruta: string | null;
    tipodato: number;
    email: string | null;
    password: string | null;
    estado: boolean | null;

    constructor(id: number, nombre: string, descripcion: string, logo: string, banner: string, ruta: string, tipodato: number, email: string, password: string,  estado: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.logo = logo;
        this.banner = banner;
        this.ruta = ruta;
        this.tipodato = tipodato;
        this.email = email;
        this.password = password;
        this.estado = estado;
    }
}