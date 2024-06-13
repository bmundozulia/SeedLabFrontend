export class Asesor {
    id?: number;
    nombre: string;
    apellido: string;
    celular: string;
    aliado: string;
    email:string;
    password:string;
    estado:boolean;

    constructor(id: number, nombre: string,apellido: string, celular: string,  aliado: string, email: string, password: string, estado: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.celular = celular;
        this. aliado =  aliado;
        this.email = email;
        this.password =  password;
        this.estado = estado;
    }
}
