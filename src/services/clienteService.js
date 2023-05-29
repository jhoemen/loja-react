import { campoVazio, criptografar, descriptografar } from '../util/util'
import api from './api'

const getDecriptedToken = () => {
    let tokenEncripted = localStorage.getItem('token')
    console.log('tokenEncripted------', tokenEncripted)
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
            let token = response.data.data
            let tokenEncripted = await criptografar(JSON.stringify(token))
            localStorage.setItem('token', tokenEncripted)

            return response.data
        } catch (error) {
            console.log('error------', error)
            return error.response.data
        }
    },

    getToken: () => {
        console.log('getToken')
        return getDecriptedToken()
    },

    logout: async () => {
        localStorage.removeItem('token')
    },
})
