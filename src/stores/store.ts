import { ref, type Ref, watch, watchEffect, nextTick } from 'vue';
import { defineStore } from 'pinia'
import type { Categoria } from '../models/ResponseCategoria';
import type { Producto } from '../models/ResponseProductos';
import { useTheme } from 'vuetify';

// const IN_BROWSER = typeof window !== 'undefined'

export const myStore = defineStore('mystore', () => {
  const drawer: Ref<boolean> = ref(true)
  //Solo lo use para login normal
  //Para que el appbar  y el drawer compartieran las categorias
  const categorias: Ref<Categoria[]> = ref<Categoria[]>([])
  const productos: Ref<Producto[]> = ref<Producto[]>([])
  const menssage: Ref<String> = ref('')
  const loading: Ref<boolean> = ref(false)
  const openDialog: Ref<boolean> = ref(false)
  const darkMode: Ref<string> = ref('light')
  const theme = useTheme();

  const toggleTheme = (first?: boolean) => {
    // systemTheme.value = media!.matches ? 'dark' : 'light'
    if (first === true) {
      darkMode.value = localStorage.getItem('darkMode') || 'light'
    } else {
      darkMode.value = darkMode.value === 'dark' ? 'light' : 'dark'
      localStorage.setItem('darkMode', darkMode.value);
    }

    watchEffect(() => {
      theme.global.name.value = darkMode.value
    })

     watch(theme.global.name, themeTransition)
  }


  return { drawer, categorias, productos, menssage, loading, openDialog, darkMode, toggleTheme }
})


function themeTransition() {
  console.log('themeTransition  ');
}


// TODO: Dark Mode -- add localStorage 🤡
// TODO: Keyup meta para busqueda