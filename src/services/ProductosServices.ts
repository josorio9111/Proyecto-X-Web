import { type Ref, ref } from 'vue'
import type { ResponseProductos } from '@/models/ResponseProductos';

class ProductosServices {
    private productos: Ref<ResponseProductos>;
    constructor() {
        this.productos = ref<ResponseProductos>({})
    }

    getProductos(): ResponseProductos {
        return this.productos.value
    }

    async initProductos(token: string) {
        const url = 'http://localhost:3000/api/productos'
        const response = await fetch(url, {
            method: "GET",
            headers: { "x-token": token },
        })
        const json = await response.json()
        this.productos.value = await json
    }
}
export default ProductosServices