import { CFormLabel, CFormInput, CFormText, CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CCardSubtitle, CPlaceholder, CRow, CCol } from '@coreui/react'

export default function ProdutoBox(props) {
    const { item: produto = [], removerProdutoCarrinho } = props

    return (
        <>
            <CCard className="m-3" style={{ maxWidth: '500px' }}>
                <CRow className="g-0">
                    <CCol md={4}>
                        <CCardImage src={produto.imagem} />
                    </CCol>
                    <CCol md={8}>
                        <CCardBody className="text-break">
                            <CCardTitle>{produto.nome}</CCardTitle>
                            <CCardSubtitle className="mb-2 text-medium-emphasis">Preço: {produto.preco}</CCardSubtitle>
                            <CCardSubtitle className="mb-2 text-medium-emphasis">Quantidade: {produto.quantidade}</CCardSubtitle>
                            <CButton
                                className="btn-danger"
                                onClick={(e) => {
                                    removerProdutoCarrinho(produto.id)
                                }}>
                                Remover do Carrinho
                            </CButton>
                        </CCardBody>
                    </CCol>
                </CRow>
            </CCard>
        </>
    )
}
