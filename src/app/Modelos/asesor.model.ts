export class Asesor {
    id?: number;
    nombre: string;
    apellido: string;
    celular: string;
    id_aliado: string;
    email:string;
    password:string;
    estado:string;

    constructor(id: number, nombre: string,apellido: string, celular: string,  id_aliado: string, email: string, password: string, estado: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.celular = celular;
        this. id_aliado =  id_aliado;
        this.email = email;
        this.password =  password;
        this.estado = estado;
    }
}
