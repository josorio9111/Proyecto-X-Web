export interface ResponseCategoria {
    total?: number,
    categorias?: Array<Categoria>
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

