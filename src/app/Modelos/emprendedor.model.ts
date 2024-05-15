export class Emprendedor {

    documento?: number;
    nombre: string | null | undefined;
    apellido: string | null | undefined;
    celular: number;
    genero: string | null | undefined;
    fecha_nac: Date;
    direccion: string | null | undefined;
    id_autentication: number;
    id_tipo_documento: number;
    id_municipio: number;

    constructor(documento:number, nombre:string, apellido:string, celular:number, genero:string, fecha_nac:Date, id_autentication:number, id_tipo_documento:number, id_municipio:number){
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
