import api from './api'

export const produtoService = () => ({
    listarProduto: async () => {
        try {
            const response = await api.get('/produto')
            return response.data
        } catch (error) {
            return error.response.data
        }
    },
})
