import { Departamento } from "./departamento.modelo";

export class Municipio {
    nombre:string | null;
    id_departamento: Departamento

    constructor(nombre:string, id_departamento: Departamento){
        this.nombre = nombre;
        this.id_departamento = id_departamento;
    }
}
