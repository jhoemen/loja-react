import React, { useState, useEffect } from 'react'
import { formatarModeaReal } from '../../util/util'
import { useLocation } from 'react-router-dom'
import { produtoService as useProdutoService } from 'src/services/produtoService'
import { Produto } from '../../componentes'
import { CCol, CContainer, CRow } from '@coreui/react'

const ListaProduto = (props) => {
    const { adicionarProdutoCarrinho, removerProdutoCarrinho } = props

    const produtoService = useProdutoService()
    const [produto, setProduto] = useState([])

    const carregarProdutos = async () => {
        const result = await produtoService.listarProduto()
        setProduto(result.data)
    }

    useEffect(() => {
        carregarProdutos()
    }, [])

    return (
        <>
            <div className="card bg-transparent text-white border-white text-center p-4 mb-4 fw-bolder fs-1">
                <div className="card-header border-0 bg-transparent">Selecione um produto</div>
            </div>
            <CContainer>
                <CRow className="d-flex justify-content-center mb-5">
                    {produto?.map((item, idx) => {
                        return (
                            <CCol sm={4} className="mb-1" key={idx}>
                                <Produto item={item} adicionarProdutoCarrinho={adicionarProdutoCarrinho} removerProdutoCarrinho={removerProdutoCarrinho} />
                            </CCol>
                        )
                    })}
                </CRow>
            </CContainer>
        </>
    )
}

export default ListaProduto
