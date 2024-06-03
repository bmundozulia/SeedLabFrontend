export class Respuesta {
  id?:number;
  opcion: string;
  texto_res?: string;
  valor: number;
  verform_pr: boolean;
  verform_se?: boolean;
  fecha_reg: Date;
  id_pregunta: number;
  id_empresa: number;
  id_subpregunta?: number;

  constructor(id_pregunta: number, id_empresa: number, id?: number, opcion?: string, texto_res?: string, valor?: number, verform_pr?: boolean, verform_se?: boolean, fecha_reg?: Date,  id_subpregunta?: number) {
    this.id = id;
    this.opcion = opcion ?? "";
    this.texto_res = texto_res;
    this.valor = valor ?? 0;
    this.verform_pr = verform_pr ?? false;
    this.verform_se = verform_se;
    this.fecha_reg = fecha_reg ?? new Date();
    this.id_pregunta = id_pregunta;
    this.id_empresa = id_empresa;
    this.id_subpregunta = id_subpregunta;
  }
}
