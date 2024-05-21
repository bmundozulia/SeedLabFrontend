import { Empresa } from "./empresa.model";

export class ApoyoEmpresa {

    documento? : number;
    nombre: string | null;
    apellido? : string | null;
    cargo : string | null;
    telefono? : number;
    celular? : number;
    email? : string | null;
    id_tipo_documento : number;
    id_empresa: Empresa;

    constructor(
        documento: number, 
        nombre: string, 
        apellido: string, 
        cargo: string, 
        telefono: number, 
        celular: number, 
        email: string, 
        id_tipo_documento: number, 
        id_empresa: Empresa) {
            this.documento = documento;
            this.nombre = nombre;
            this.apellido = apellido;
            this.cargo = cargo;
            this.telefono = telefono;
            this.celular = celular;
            this.email = email;
            this.id_tipo_documento = id_tipo_documento;
            this.id_empresa = id_empresa;
        }
}
