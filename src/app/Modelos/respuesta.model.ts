export class Respuesta {
  id?:number;
  opcion?: string;
  texto_res?: string;
  valor?: number;
  verform_pr: boolean;
  verform_se: boolean;
  fecha_reg: Date;
  id_pregunta?: number;
  id_empresa?: number;
  id_subpregunta?: number;

  constructor(id: number, opcion: string, texto_res: string, valor: number, verform_pr: boolean, verform_se: boolean, fecha_reg: Date, id_pregunta: number, id_empresa: number, id_subpregunta: number) {
    this.id = id;
    this.opcion = opcion;
    this.texto_res = texto_res;
    this.valor = valor;
    this.verform_pr = verform_pr;
    this.verform_se = verform_se;
    this.fecha_reg = fecha_reg;
    this.id_pregunta = id_pregunta;
    this.id_empresa = id_empresa;
    this.id_subpregunta = id_subpregunta;
  }
}
