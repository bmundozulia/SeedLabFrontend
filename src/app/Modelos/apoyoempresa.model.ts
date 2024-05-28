export class ApoyoEmpresa {
    documento: string;
    nombre: string;
    apellido: string;
    cargo: string;
    telefono: string | null;
    celular: string;
    email: string;
    id_tipo_documento: string;
  
    constructor(
      documento: string,
      nombre: string,
      apellido: string,
      cargo: string,
      telefono: string | null,
      celular: string,
      email: string,
      id_tipo_documento: string
    ) {
      this.documento = documento;
      this.nombre = nombre;
      this.apellido = apellido;
      this.cargo = cargo;
      this.telefono = telefono;
      this.celular = celular;
      this.email = email;
      this.id_tipo_documento = id_tipo_documento;
    }
  }
  