import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { TheContent, TheFooter, TheHeader } from './index'
import { responseAPI } from '../util/responseAPI'
import { formatarModeaReal } from '../util/util'

import { Toasters } from '../componentes/index'
import { clienteService as useClienteService } from '../services/clienteService'
import { CToaster } from '@coreui/react'

const TheLayout = () => {
    console.log('TheLayout')
    const clienteService = useClienteService()
    const history = useHistory()
    const toaster = useRef()

    const [loading, setLoading] = useState(false)
    const [cobranca, setCobranca] = useState(null)
    const [cobrancaSelecionada, setCobrancaSelecionada] = useState([])
    const [totalCobranca, setTotalCobranca] = useState(0)
    const [cliente, setCliente] = useState(null)
    const [toast, addToast] = useState(0)

    const adicionarNotificacao = (mensagem, tipo) => {
        addToast(Toasters(mensagem, tipo))
    }

    const adicionarCobrancaCarrinho = (titulo, elemento) => {
        const isSelecionado = cobrancaSelecionada.filter((item) => {
            return item.chave == titulo.chave ? true : false
        })

        if (isSelecionado.length == 0) {
            setCobrancaSelecionada((arrayCobrancas) => [...arrayCobrancas, titulo])
        }
    }

    const removerCobrancaCarrinho = (titulo, elemento) => {
        const isSelecionado = cobrancaSelecionada.filter((item) => {
            return item.chave != titulo.chave ? true : false
        })

        setCobrancaSelecionada(isSelecionado)
    }

    const listarCobrancaCarrinho = () => {
        return cobrancaSelecionada
    }

    const atualizarCss = () => {
        const cardSelecionados = document.getElementsByClassName('selecionado')

        const elementsCardSelecionados = Array.from(cardSelecionados)

        elementsCardSelecionados.forEach((element) => {
            element.classList.remove('selecionado')
        })

        cobrancaSelecionada.forEach((element) => {
            var cardSelecionado = document.getElementById(element.chave)
            cardSelecionado = cardSelecionado.closest('.card')
            cardSelecionado.classList.add('selecionado')
        })
    }

    const limparCobrancaCarrinho = () => {
        setCobrancaSelecionada([])
    }

    const atualizarTotalCobranca = () => {
        let total = 0
        cobrancaSelecionada?.map((item, idx) => {
            total += parseFloat(item.vl_recebido)
        })

        total = formatarModeaReal(total)

        setTotalCobranca(total)
    }

    const consultarCobrancaPendente = async () => {
        // if (cliente == null) {
        //     return
        // }
        // let ListaCobrancasPendente = await api2.consultarCobrancaPendente(cliente.cpf)
        // // LISTA DAS SITUAÇÕES DA COBRANÇA
        // // situacao = 0 - Aberta
        // // situacao = 1 - Paga
        // // situacao = 2 - Cancelada
        // // situacao = 3 - Futura
        // ListaCobrancasPendente = await ListaCobrancasPendente.data.filter((item) => {
        //     return item.situacao == 0 ? true : false
        // })
        // setCobranca(ListaCobrancasPendente)
        // setLoading(false)
    }

    const checkLogin = async () => {
        const token = clienteService.getToken()
        console.log('token', token)
        // if (!token) {
        //     history.push('/login')
        //     return
        // }

        // if (!token?.cliente) {
        //     localStorage.setItem('loginError', responseAPI.usuarioNaoEncontrado.descricao)
        //     history.push('/logout')
        //     return
        // }

        // if (!token?.cliente?.temLoginPortalDoCliente) {
        //     let novoCliente = await api2.cadastrarClienteUsuarioPortalDoCliente(token?.cliente?.cpf)

        //     if (novoCliente?.success == false) {
        //         localStorage.setItem('loginError', responseAPI.ClienteNaoTemLoginPortalDoCliente.descricao)
        //         history.push('/logout')
        //         return
        //     }
        // }

        // const result = api.validateToken()
        // if (!result) {
        //     localStorage.setItem('loginError', responseAPI.SessaoExpirada.descricao)
        //     history.push('/logout')
        //     return
        // }

        setLoading(false)

        // let dadosCliente = token.cliente
        // dadosCliente.cpf = token.cpf
        // setCliente(dadosCliente)
    }

    useEffect(() => {
        console.log('checkLogin')
        checkLogin()
    }, [])

    useEffect(() => {
        atualizarCss()
        atualizarTotalCobranca()
    }, [cobrancaSelecionada])

    return (
        <div>
            <header>
                <TheHeader />
            </header>
            <CToaster ref={toaster} push={toast} placement="top-end" />

            <div className="mb-auto width-100 content p-5">
                <div className="container">
                    {!loading && (
                        <>
                            <TheContent cliente={cliente} />
                        </>
                    )}
                </div>
            </div>

            <footer>
                <TheFooter cobrancaSelecionada={cobrancaSelecionada} totalCobranca={totalCobranca} adicionarNotificacao={adicionarNotificacao} />
            </footer>
        </div>
    )
}

export default TheLayout
