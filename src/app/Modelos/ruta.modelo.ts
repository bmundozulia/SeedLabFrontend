export class Ruta {
    nombre: string | null;
    fecha_creacion: Date | null;
    estado: boolean;

    constructor(nombre: string, fecha_creacion: Date, estado: boolean) {
        this.nombre = nombre;
        this.fecha_creacion = fecha_creacion;
        this.estado = estado;
    }
}
