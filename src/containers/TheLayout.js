import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { TheContent, TheFooter, TheHeader } from './index'
import { responseAPI } from '../util/responseAPI'
import { formatarModeaReal } from '../util/util'

import { Toasters } from '../componentes/index'
import { clienteService as useClienteService } from '../services/clienteService'
import { produtoService as useProdutoService } from '../services/produtoService'
import { CToaster } from '@coreui/react'

const TheLayout = () => {
    const clienteService = useClienteService()
    const produtoService = useProdutoService()
    const history = useHistory()
    const toaster = useRef()

    const [loading, setLoading] = useState(false)
    const [isLogged, setLogged] = useState(false)

    const [carrinho, setCarrinho] = useState([])
    const [totalCarrinho, setTotalCarrinho] = useState(0)
    const [quantidadeProdutoCarrinho, setquantidadeProdutoCarrinho] = useState(0)
    const [cliente, setCliente] = useState(null)

    const [toast, addToast] = useState(0)

    const adicionarNotificacao = (mensagem, tipo) => {
        addToast(Toasters(mensagem, tipo))
    }

    const listarProdutoCarrinho = async () => {
        const listaProdutoCarrinho = await produtoService.listarProdutoCarrinho()
        var arrayProduto = []

        if (listaProdutoCarrinho?.data !== '') {
            const agruparProduto = listaProdutoCarrinho.data.produto.reduce((acumulador, item) => {
                if (!acumulador[item.id]) {
                    acumulador[item.id] = []
                    acumulador[item.id] = { ...item }
                } else {
                    ++acumulador[item.id].quantidade
                }

                return acumulador
            }, [])

            arrayProduto = Object.keys(agruparProduto).map(function (key) {
                return agruparProduto[key]
            })
        }

        setCarrinho(arrayProduto ?? [])
    }

    const adicionarProdutoCarrinho = async (produto) => {
        const result = await produtoService.adicionarProduto(produto)

        if (result.success) {
            listarProdutoCarrinho()
            adicionarNotificacao(result.message, 'sucesso')
        } else {
            adicionarNotificacao(result.message, 'erro')
        }
    }

    const removerProdutoCarrinho = async (produtoId) => {
        const result = await produtoService.removerProduto(produtoId)

        if (result.success) {
            listarProdutoCarrinho()
            adicionarNotificacao(result.message, 'sucesso')
        } else {
            adicionarNotificacao(result.message, 'erro')
        }
    }

    const atualizartotalCarrinho = () => {
        let total = 0

        total = carrinho.reduce((acc, item) => {
            return (acc += item.quantidade * item.preco)
        }, 0)

        total = formatarModeaReal(total)

        setTotalCarrinho(total)
    }

    const atualizarQuantidadeProdutoCarrinho = () => {
        var total = carrinho.reduce(function (acc, item) {
            return (acc += item.quantidade)
        }, 0)

        setquantidadeProdutoCarrinho(total)
    }

    const finalizarPedido = async () => {
        const result = await produtoService.finalizarPedido()

        if (result.success) {
            listarProdutoCarrinho()
            adicionarNotificacao(result.message, 'sucesso')
            history.push('/produto')
        } else {
            adicionarNotificacao(result.message, 'erro')
        }
    }

    const limparCarrinho = async () => {
        const result = await produtoService.limparCarrinho()

        if (result.success) {
            listarProdutoCarrinho()
            adicionarNotificacao(result.message, 'sucesso')
            history.push('/produto')
        } else {
            adicionarNotificacao(result.message, 'erro')
        }
    }

    const checkLogin = async () => {
        var token = clienteService.getToken()
        if (!token) {
            history.push('/login')
            return
        }

        if (!token?.cliente) {
            localStorage.setItem('loginError', responseAPI.usuarioNaoEncontrado.descricao)
            history.push('/logout')
            return
        }

        const result = clienteService.validateToken()
        if (!result) {
            localStorage.setItem('loginError', responseAPI.SessaoExpirada.descricao)
            history.push('/logout')
            return
        }

        setLogged(true)
        setLoading(false)
        setCliente(token.cliente)
        listarProdutoCarrinho()
    }

    useEffect(() => {
        checkLogin()
    }, [])

    useEffect(() => {
        atualizartotalCarrinho()
        atualizarQuantidadeProdutoCarrinho()
    }, [carrinho])

    return (
        <div>
            <header>
                <TheHeader cliente={cliente} isLogged={isLogged} carrinho={carrinho} removerProdutoCarrinho={removerProdutoCarrinho} quantidadeProdutoCarrinho={quantidadeProdutoCarrinho} totalCarrinho={totalCarrinho} finalizarPedido={finalizarPedido} limparCarrinho={limparCarrinho} />
            </header>
            <CToaster ref={toaster} push={toast} placement="top-end" />

            <div className="mb-auto width-100 content p-5">
                <div className="container">
                    {!loading && (
                        <>
                            <TheContent cliente={cliente} adicionarProdutoCarrinho={adicionarProdutoCarrinho} removerProdutoCarrinho={removerProdutoCarrinho} quantidadeProdutoCarrinho={quantidadeProdutoCarrinho} totalCarrinho={totalCarrinho} finalizarPedido={finalizarPedido} limparCarrinho={limparCarrinho} carrinho={carrinho} />
                        </>
                    )}
                </div>
            </div>

            <footer>
                <TheFooter carrinho={carrinho} totalCarrinho={totalCarrinho} adicionarNotificacao={adicionarNotificacao} />
            </footer>
        </div>
    )
}

export default TheLayout
