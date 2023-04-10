import { type Ref, ref } from 'vue'
import type { ResponseCategoria } from '../models/ResponseCategoria'

class CategoriaServices {
    private _categorias: Ref<ResponseCategoria>
    constructor() {
        this._categorias = ref<ResponseCategoria>({})
    }

    getCategorias(): ResponseCategoria {
        return this._categorias.value
    }

    async initCategorias(token: string) {
        const url = 'http://localhost:3000/api/categorias'
        const response = await fetch(url, {
            method: "GET",
            headers: { "x-token": token },
        })
        const json = await response.json()
        this._categorias.value = await json
    }
}

export default CategoriaServices 