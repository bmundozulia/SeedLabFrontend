export class Personalizaciones {

    id_superadmin: string | null;
    imagen_logo: string | null;
    nombre_sistema: string | null;
    color_principal: string | null;
    color_secundario: string | null;

    constructor(id_superadmin: string, imagen_logo: string, nombre_sistema: string, color_principal: string, color_secundario: string, ) {
        this.id_superadmin = id_superadmin;
        this.imagen_logo = imagen_logo;
        this.nombre_sistema = nombre_sistema;
        this.color_principal = color_principal;
        this.color_secundario = color_secundario;
        
    }
}


