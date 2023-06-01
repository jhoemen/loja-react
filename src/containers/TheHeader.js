import React, { useEffect, useState } from 'react'

import { CHeader, CRow, CContainer, CCol, CButton, CImage, CPopover, CListGroup, CListGroupItem, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link, useHistory } from 'react-router-dom'
import { cilCart } from '@coreui/icons'
import { ProdutoBox } from 'src/componentes'

const TheHeader = (props) => {
    const history = useHistory()

    const { cliente, isLogged, carrinho, removerProdutoCarrinho, quantidadeProdutoCarrinho, totalCarrinho, finalizarPedido } = props

    const handleHome = () => {
        history.push('/produto')
    }

    return (
        <div className="header d-flex flex-column flex-md-row align-items-center">
            {(isLogged && (
                <>
                    <CImage onClick={handleHome} src="../sesc-logo.png" />
                </>
            )) || (
                <>
                    <CImage onClick={handleHome} src="../sesc-logo-vertical.png" />
                </>
            )}

            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                {isLogged && (
                    <>
                        <CDropdown autoClose="inside" alignment={{ lg: 'end' }}>
                            <CDropdownToggle>
                                <CIcon icon={cilCart} size="xl" />
                                <span className="badge bg-info ms-2">{quantidadeProdutoCarrinho}</span>
                            </CDropdownToggle>
                            <CDropdownMenu style={{ width: 'max-content' }}>
                                <CDropdownItem disabled>{cliente?.nome}</CDropdownItem>
                                <CDropdownDivider />
                                {carrinho?.map((item, idx) => {
                                    return <ProdutoBox item={item} key={idx} removerProdutoCarrinho={removerProdutoCarrinho} />
                                })}
                                <CDropdownDivider />
                                <CDropdownItem disabled>VALOR TOTAL: {totalCarrinho}</CDropdownItem>
                                <CDropdownDivider />
                                <CDropdownItem href="\checkout">Checkout</CDropdownItem>
                                <CDropdownDivider />
                                <CDropdownItem href="#" onClick={finalizarPedido}>
                                    Finalizar Pedido
                                </CDropdownItem>
                                <CDropdownDivider />
                                <CDropdownItem href="\logout">Sair da Conta</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </>
                )}
            </nav>
        </div>
    )
}

export default TheHeader
