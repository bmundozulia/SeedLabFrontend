export class Superadmin {
    id?: number;
    nombre: string | null;
    apellido: string | null;
    email: string | null;
    password: string | null;
    estado: string | null;

    constructor(id: number, nombre: string, apellido: string, email: string, password: string, estado: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.estado = estado;
    }
}
