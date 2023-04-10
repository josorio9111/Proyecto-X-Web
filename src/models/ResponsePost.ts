
export interface ResponsePost {
    message?: string
    token?: string;
    usuario?: Usuario;
}

export interface Usuario {
    id: string
    usuario: string
    createdAt: string
    email: string
    estado: boolean
    google: boolean
    img: string
    nombre: string
    role: string
    updatedAt: string
}
