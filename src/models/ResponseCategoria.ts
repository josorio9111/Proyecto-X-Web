export interface ResponseCategoria {
    total?: number,
    categorias?: Array<Categoria>
    message?: string
}

export interface Categoria {
    nombre: string,
    usuario: UsuarioCategoria,
    createdAt: string,
    updatedAt: string,
    id: string
}

export interface UsuarioCategoria {
    _id: string,
    nombre: string
}

