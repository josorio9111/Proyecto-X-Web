import { ref, type Ref, watch, watchEffect, nextTick } from 'vue';
import { defineStore } from 'pinia'
import type { Categoria, ResponseCategoria } from '../models/ResponseCategoria';
import type { Producto, ResponseProductos } from '../models/ResponseProductos';
import { useTheme } from 'vuetify';

// const IN_BROWSER = typeof window !== 'undefined'

export const myStore = defineStore('mystore', () => {
  const drawer: Ref<boolean> = ref(true)
  const categorias: Ref<Categoria[]> = ref<Categoria[]>([])
  const productos: Ref<Producto[]> = ref<Producto[]>([])
  const menssage: Ref<String> = ref('')
  const loading: Ref<boolean> = ref(false)
  const openDialog: Ref<boolean> = ref(false)
  const darkMode: Ref<string> = ref('light')
  const theme = useTheme();
  const step = ref(1)

  const toggleTheme = (first?: boolean) => {
    if (first === true) {
      darkMode.value = localStorage.getItem('darkMode') || 'light'
    } else {
      darkMode.value = darkMode.value === 'dark' ? 'light' : 'dark'
      localStorage.setItem('darkMode', darkMode.value);
    }
    theme.global.name.value = darkMode.value
  }
  
  const initProductos = async (token: string) => {
    const url = 'http://localhost:3000/api/productos'
    const response = await fetch(url, {
      method: "GET",
      headers: { "x-token": token },
    })
    const json: ResponseProductos = await response.json()
    // console.log(json);
    if (json.message) {
      menssage.value = json.message
    } else {
      productos.value = json.productos!
    }
  }

  const initCategorias = async (token: string) => {
    const url = 'http://localhost:3000/api/categorias'
    const response = await fetch(url, {
      method: "GET",
      headers: { "x-token": token },
    })
    const json: ResponseCategoria = await response.json()
    if (json.message) {
      menssage.value = json.message
    } else {
      categorias.value = json.categorias!
    }
  }
  return { drawer, categorias, productos, menssage, loading, openDialog, darkMode, toggleTheme, step, initProductos, initCategorias }
})



// TODO: Dark Mode -- add localStorage 🤡
// TODO: Keyup meta para busqueda