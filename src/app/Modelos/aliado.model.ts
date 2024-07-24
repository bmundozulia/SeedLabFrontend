import { User } from "./user.model";

export class Aliado {
    id?: number;
    nombre: string;
    descripcion: string;
    logo: string; // Asegúrate de que logo sea un campo necesario en tu caso
    //banner: File | null;
    ruta: string | null;
    tipodato: string | null;
    email: string;
    password: string;
    estado: boolean;

    constructor(id: number, nombre: string, descripcion: string, logo: string, banner: File | null, ruta: string | null, tipodato: string | null, email: string, password: string, estado: boolean) {
        this.id = id,
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.logo = logo;
       // this.banner = banner;
        this.ruta = ruta;
        this.tipodato = tipodato;
        this.email = email;
        this.password = password;
        this.estado = estado;
    }
}