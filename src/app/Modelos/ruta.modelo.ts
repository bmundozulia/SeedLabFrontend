export class Ruta {
    nombre: string | null;
    fecha_creacion: Date | null;
    estado: string;

    constructor(nombre: string, fecha_creacion: Date, estado: string) {
        this.nombre = nombre;
        this.fecha_creacion = fecha_creacion;
        this.estado = estado;
    }
}
