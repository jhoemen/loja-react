import React, { useEffect, useState } from 'react'

import { CHeader, CRow, CContainer, CCol, CButton, CImage, CPopover, CListGroup, CListGroupItem, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { cilCart } from '@coreui/icons'
import { ProdutoBox } from 'src/componentes'

const TheHeader = (props) => {
    const { cliente, isLogged, carrinho, removerProdutoCarrinho } = props

    return (
        <div className="header d-flex flex-column flex-md-row align-items-center">
            {(isLogged && (
                <>
                    <CImage src="../sesc-logo.png" />
                </>
            )) || (
                <>
                    <CImage src="../sesc-logo-vertical.png" />
                </>
            )}

            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                {isLogged && (
                    <>
                        <CDropdown alignment={{ lg: 'end' }}>
                            <CDropdownToggle>
                                <CIcon icon={cilCart} size="xl" />
                                <span class="badge bg-info ms-2">42</span>
                            </CDropdownToggle>
                            <CDropdownMenu style={{ width: 'max-content' }}>
                                <CDropdownItem disabled>{cliente?.nome}</CDropdownItem>
                                <CDropdownDivider />

                                {carrinho?.map((item, idx) => {
                                    return <ProdutoBox item={item} key={idx} removerProdutoCarrinho={removerProdutoCarrinho} />
                                })}

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
