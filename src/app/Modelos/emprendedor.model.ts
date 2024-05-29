export class Emprendedor {
    documento: string | null;
    nombre: string | null;
    apellido: string | null;
    celular: string | null;
    email: string | null;
    password: string | null;
    genero: string | null;
    fecha_nacimiento: Date | null;
    direccion: string | null;
    nombretipodoc: string | null;
    estado: string | null;
    municipio: string | null;

    constructor(
        documento: string | null,
        nombretipodoc: string | null,
        nombre: string | null,
        apellido: string | null,
        celular: string | null,
        email: string | null,
        password: string | null,
        genero: string | null,
        fecha_nacimiento: Date | null,
        direccion: string | null,
        estado: string | null,
        municipio: string | null
    ) {
        this.documento = documento;
        this.nombretipodoc = nombretipodoc;
        this.nombre = nombre;
        this.apellido = apellido;
        this.celular = celular;
        this.email = email;
        this.password = password;
        this.genero = genero;
        this.fecha_nacimiento = fecha_nacimiento;
        this.direccion = direccion;
        this.estado = estado;
        this.municipio = municipio;
    }
}