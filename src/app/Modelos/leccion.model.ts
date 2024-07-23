export class Leccion {
    id?: number;
    nombre: string | null;;
    id_nivel?: number;

    constructor(id: number, nombre: string, id_nivel: number){
        this.id = id;
        this.nombre = nombre;
        this.id_nivel = id_nivel;
    }
}