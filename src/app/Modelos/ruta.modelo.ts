export class Ruta {
    id?:number;
    nombre: string | null;
    fecha_creacion: Date | null;
    estado: boolean;
    imagen_ruta: string | null;

    constructor(id:number,nombre: string, fecha_creacion: Date, estado: boolean, imagen_ruta: string ) {
        this.id = id;
        this.nombre = nombre;
        this.fecha_creacion = fecha_creacion;
        this.estado = estado;
        this.imagen_ruta = imagen_ruta;
    }
}
