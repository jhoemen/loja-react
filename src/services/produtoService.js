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

    adicionarProduto: async (payload) => {
        try {
            const produto = [
                {
                    ...payload,
                },
            ]

            const response = await api.post('/adicionarProdutoCarrinho', JSON.stringify({ produto }))
            return response.data
        } catch (error) {
            return error.response.data
        }
    },

    removerProduto: async (produtoId) => {
        try {
            const response = await api.post('/removerProdutoCarrinho', JSON.stringify({ produtoId }))
            return response.data
        } catch (error) {
            return error.response.data
        }
    },

    listarProdutoCarrinho: async () => {
        try {
            const response = await api.get('/listarProdutoCarrinho')
            return response.data
        } catch (error) {
            return error.response.data
        }
    },
})
