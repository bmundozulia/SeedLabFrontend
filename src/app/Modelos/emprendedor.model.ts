
export class Emprendedor {

    documento?: string | null;
    nombre: string | null;
    apellido: string | null;
    celular: string | null;
    genero: string | null;
    fecha_nac: Date | null;
    direccion: string | null;
    id_autentication: number;
    id_tipo_documento: number;
    id_municipio: number;

    constructor(documento:string, nombre:string, apellido:string, celular:string, genero:string, fecha_nac:Date, id_autentication:number, id_tipo_documento:number, id_municipio:number){
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.celular = celular;
        this.genero = genero;
        this.fecha_nac = fecha_nac;
        this.id_autentication = id_autentication;
        this.id_tipo_documento = id_tipo_documento;
        this.id_municipio = id_municipio;
    }
}
