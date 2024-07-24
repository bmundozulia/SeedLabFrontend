export class Contenido_Leccion {
    id?: number;
    titulo: string | null;
    descripcion: string | null;
    fuente: string | null;
    id_tipo_dato?: number;
    id_leccion?: number;
    
    constructor (id: number, titulo: string, descripcion: string, fuente: string, id_tipo_dato: number, id_leccion: number){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fuente = fuente;
        this.id_tipo_dato = id_tipo_dato;
        this.id_leccion = id_leccion;
    }
}