import { isTokenValido } from 'src/util/validate'
import { campoVazio, criptografar, descriptografar } from '../util/util'
import api from './api'

const getDecriptedToken = () => {
    let tokenEncripted = localStorage.getItem('token')
    if (campoVazio(tokenEncripted)) {
        return
    }

    return JSON.parse(descriptografar(tokenEncripted))
}

export const clienteService = () => ({
    cadastrarCliente: async (payload) => {
        try {
            const response = await api.post('/cliente', JSON.stringify(payload))
            return response.data
        } catch (error) {
            return error.response.data
        }
    },

    login: async (payload) => {
        try {
            const response = await api.post('/login', JSON.stringify(payload))

            let tokenEncripted = await criptografar(JSON.stringify(response.data.data))
            localStorage.setItem('token', tokenEncripted)

            return response.data
        } catch (error) {
            return error.response.data
        }
    },

    getToken: () => {
        return getDecriptedToken()
    },

    logout: async () => {
        localStorage.removeItem('token')
    },

    validateToken: () => {
        let tokenEncripted = localStorage.getItem('token')
        if (campoVazio(tokenEncripted)) {
            return
        }

        let token = JSON.parse(descriptografar(tokenEncripted))
        return isTokenValido(token.expires_in)
    },
})
