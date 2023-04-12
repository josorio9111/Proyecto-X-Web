import type { UsuarioCategoria } from './ResponseCategoria';

export interface ResponseProductos {
    total?: number,
    productos?: Array<Producto>
    message?: string
}

export interface Producto {
    nombre: string,
    precio?: number,
    usuario: UsuarioCategoria
    categoria: UsuarioCategoria
    descripcion?: string,
    disponible: boolean,
    img?: string
    createdAt: string
    updatedAt: string
    id: string
}
