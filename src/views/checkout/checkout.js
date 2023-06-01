import React, { useState, useEffect } from 'react'
import { formatarModeaReal } from '../../util/util'
import { useLocation } from 'react-router-dom'
import { produtoService as useProdutoService } from 'src/services/produtoService'
import { ProdutoCheckout } from '../../componentes'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardTitle, CCol, CContainer, CRow } from '@coreui/react'

const Checkout = (props) => {
    const { adicionarProdutoCarrinho, removerProdutoCarrinho, carrinho, totalCarrinho, quantidadeProdutoCarrinho, finalizarPedido, limparCarrinho } = props

    useEffect(() => {
        console.log('carrinho', carrinho)
    }, [])

    return (
        <>
            <CContainer>
                <CCard>
                    <CCardHeader className="fs-1">Carrinho de Compras</CCardHeader>
                    <CCardBody>
                        <CRow className="d-flex justify-content-center mb-5">
                            {carrinho?.map((item, idx) => {
                                return (
                                    <CCol sm={12} className="mb-1" key={idx}>
                                        <ProdutoCheckout item={item} adicionarProdutoCarrinho={adicionarProdutoCarrinho} removerProdutoCarrinho={removerProdutoCarrinho} />
                                    </CCol>
                                )
                            })}
                        </CRow>
                    </CCardBody>
                    <CCardFooter className="text-medium-emphasis">
                        <CRow className="text-center">
                            <div className="fs-2">VALOR TOTAL: {totalCarrinho}</div>
                            <div className="fs-4">Quantidade Produto: {carrinho.length}</div>
                            <div className="fs-4">Quantidade Item: {quantidadeProdutoCarrinho}</div>
                        </CRow>
                        <CRow>
                            <CCol className="text-center">
                                <CButton onClick={finalizarPedido} className="m-4" color="success" shape="rounded" size="lg">
                                    Finalizar Pedido
                                </CButton>
                                <CButton onClick={limparCarrinho} className="m-4" color="danger" shape="rounded" size="lg">
                                    Limpar Carrinho
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>
            </CContainer>
        </>
    )
}

export default Checkout
