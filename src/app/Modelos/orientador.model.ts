export class Orientador {
    id?: number;
    nombre: string | null;
    apellido: string | null;
    celular: string | null;
    email: string | null;
    password?: string | null; // Asegúrate de que 'password' sea opcional si no siempre estará presente.
    estado: boolean | null;

    constructor(id: number, nombre: string, apellido: string, celular: string, id_auth: number, email: string, estado: boolean, password?: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.celular = celular;
        this.email = email;
        this.password = password || null;
        this.estado = estado;
    }
}
