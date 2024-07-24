export class Banner {
    id?: number;
    urlImagen:File;
    descripcion: string | null;
    estadobanner: string | null;
    color: string | null;
    id_aliado: number;

    constructor(id: number, urlImagen:File, descripcion: string, estadobanner:string, color: string, id_aliado: number){
        this.id = id;
        this.urlImagen = urlImagen;
        this.descripcion = descripcion;
        this.estadobanner = estadobanner;
        this.color = color;
        this.id_aliado = id_aliado;
    }
}
