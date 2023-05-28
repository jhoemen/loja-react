import { useApi } from './useApi'

const api = useApi()

export const clienteService = () => ({
    cadastrarCliente: async (payload) => {
        const response = await api.post('/cliente', JSON.stringify(payload))
        return response.data
    },
})
