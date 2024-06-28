export class Actividad {
    id?: number;	
    nombre: string | null;	
    descripcion: string | null;
    ruta_multi: string | null;
    id_tipo_dato?: number;
    id_asesor?:	number;
    id_ruta?: number;

    constructor(id: number, nombre: string,descripcion: string,ruta_multi: string,id_tipo_dato?: number,id_asesor?:	number,id_ruta?: number){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ruta_multi = ruta_multi;
        this.id_tipo_dato = id_tipo_dato;
        this.id_asesor = id_asesor;
        this.id_ruta = id_ruta;
    }
}