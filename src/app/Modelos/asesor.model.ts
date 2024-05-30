export class Asesor {
    id?: number;
    nombre: string | null;
    apellido: string | null;
    celular: number | null;
    id_autentication: number;
    id_aliado: number;

    constructor(id:number, nombre:string, apellido:string, celular:number, id_autentication:number, id_aliado:number){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.celular = celular;
        this.id_autentication = id_autentication;
        this.id_aliado = id_aliado;
    }
}
