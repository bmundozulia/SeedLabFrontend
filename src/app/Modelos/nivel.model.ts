export class Nivel {
    id?: number;
    nombre: string | null;
    descripcion: string | null;
    id_actividad?: number

    constructor(id:number, nombre:string, descripcion:string, id_actividad:number){
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.id_actividad=id_actividad;
    }
}