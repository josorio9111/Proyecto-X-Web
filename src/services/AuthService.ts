import { ref, type Ref } from 'vue';
import type { ResponsePost } from '../models/ResponsePost'

class ServiceAuth {
    private _login: Ref<ResponsePost>
    private _valid: Ref<ResponsePost>
    private _isLoggIn: Ref<boolean>

    constructor() {
        this._login = ref<ResponsePost>({})
        this._valid = ref<ResponsePost>({})
        this._isLoggIn = ref<boolean>(false)
    }

    getData(): ResponsePost {
        return this._login.value
    }
    getValid(): ResponsePost {
        return this._valid.value
    }
    getLogggIn(): boolean {
        return this._isLoggIn.value
    }

    async login(email: string, passw: string) {
        try {
            const url = 'http://localhost:3000/api/auth/login'
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email, password: passw
                }),
            })
            const json = await response.json()
            this._login.value = await json
            if (json.usuario && json.token) {
                this._isLoggIn.value = true
            }
        } catch (error) {
            console.log(error)
        }
    }
    async validarJWT(token: string) {
        try {
            const url = 'http://localhost:3000/api/auth/'
            const response = await fetch(url, {
                method: "GET",
                headers: { "x-token": token },
            })
            const json = await response.json()
            this._valid.value = json
            if (json.usuario && json.token) {
                this._isLoggIn.value = true
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export default ServiceAuth 