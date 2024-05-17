import { Rol } from "./rol.model";
export class User {
    id?:number;
    email:string|null;
    password:string|null;
    estado:boolean |null;
    id_rol:Rol;

    constructor(id:number, email:string, password:string, estado:boolean, id_rol:Rol){
        this.id = id;
        this.email = email;
        this.password =  password;
        this.estado = estado;
        this.id_rol = id_rol;
    }
}
