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
        setCarrinho(listaProdutoCarrinho.data.produto ?? [])
    }

    const adicionarProdutoCarrinho = async (produto) => {
        const result = await produtoService.adicionarProduto(produto)

        if (result.success) {
            listarProdutoCarrinho()
        }
    }

    const removerProdutoCarrinho = async (produtoId) => {
        const result = await produtoService.removerProduto(produtoId)

        if (result.success) {
            listarProdutoCarrinho()
        }
    }

    const limparCobrancaCarrinho = () => {
        setCarrinho([])
    }

    const atualizartotalCarrinho = () => {
        let total = 0
        carrinho?.map((item, idx) => {
            total += parseFloat(item.preco)
        })

        total = formatarModeaReal(total)

        setTotalCarrinho(total)
    }

    const atualizarQuantidadeProdutoCarrinho = () => {
        var total = carrinho.reduce(function (total) {
            return total + 1
        }, 0)

        setquantidadeProdutoCarrinho(total)
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
                <TheHeader cliente={cliente} isLogged={isLogged} carrinho={carrinho} removerProdutoCarrinho={removerProdutoCarrinho} quantidadeProdutoCarrinho={quantidadeProdutoCarrinho} />
            </header>
            <CToaster ref={toaster} push={toast} placement="top-end" />

            <div className="mb-auto width-100 content p-5">
                <div className="container">
                    {!loading && (
                        <>
                            <TheContent cliente={cliente} adicionarProdutoCarrinho={adicionarProdutoCarrinho} removerProdutoCarrinho={removerProdutoCarrinho} />
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
