import { Departamento } from "./departamento.modelo";

export class Municipio {
    id?:string | null;
    nombre:string | null;
    id_departamento: Departamento

    constructor(id:string, nombre:string, id_departamento: Departamento){
        this.id = id;
        this.nombre = nombre;
        this.id_departamento = id_departamento;
    }
}
