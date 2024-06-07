import { Rol } from "./rol.model";
import { Emprendedor } from "./emprendedor.model";
import { Aliado } from "./aliado.model";
import { Superadmin } from "./superadmin.model";
import { Orientador } from "./orientador.model";

export class User {
    id?: number;
    email: string | null;
    password: string | null;
    estado: boolean | null;
    id_rol: number;
    emprendedor?: Emprendedor;
    aliado?:Aliado;
    nombre: string;
    superadmin?: Superadmin;
    orientador?: Orientador;
    

    constructor(id:number, email: string, password: string, estado: boolean, id_rol: number, emprendedor: Emprendedor, aliado: Aliado, nombre:string, superadmin:Superadmin,
    orientador: Orientador
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.estado = estado;
        this.id_rol = id_rol;
        this.emprendedor = emprendedor;
        this.aliado= aliado;
        this.nombre = nombre;
        this.superadmin = superadmin;
        this.orientador = orientador;
    }
}
