import { CFormLabel, CFormInput, CFormText, CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CCardSubtitle, CPlaceholder, CSpinner, CRow, CCol, CBadge, CButtonGroup } from '@coreui/react'

export default function ProdutoCheckout(props) {
    const { item: produto = [], adicionarProdutoCarrinho, removerProdutoCarrinho } = props

    return (
        <>
            <CCard className="mb-3">
                <CRow className="g-0">
                    <CCol md={4} style={{ maxWidth: '200px' }}>
                        <CCardImage src={produto.imagem} />
                    </CCol>
                    <CCol md={8}>
                        <CCardBody>
                            <CCardTitle>{produto.nome}</CCardTitle>
                            <CCardText>{produto.descricao}</CCardText>
                            <CCardText>
                                <CBadge color="dark" className="p-2">
                                    Preço: {produto.preco}
                                </CBadge>
                            </CCardText>
                            <CButtonGroup role="group" size="lg">
                                <CButton
                                    color="danger"
                                    onClick={(e) => {
                                        removerProdutoCarrinho(produto.id)
                                    }}>
                                    Remover
                                </CButton>
                                <CButton disabled={true} color="warning">
                                    Quantidade:{produto.quantidade}
                                </CButton>
                                <CButton
                                    color="success"
                                    onClick={(e) => {
                                        adicionarProdutoCarrinho({ ...produto, quantidade: 1 })
                                    }}>
                                    Adicionar
                                </CButton>
                            </CButtonGroup>
                        </CCardBody>
                    </CCol>
                </CRow>
            </CCard>
        </>
    )
}
