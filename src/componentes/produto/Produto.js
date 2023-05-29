import { CFormLabel, CFormInput, CFormText, CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CCardSubtitle } from '@coreui/react'

export default function ProdutoComponente(props) {
    const { item: produto = [] } = props

    return (
        <>
            <CCard>
                <CCardImage orientation="top" src={produto.imagem} />
                <CCardBody>
                    <CCardTitle>{produto.nome}</CCardTitle>
                    <CCardSubtitle className="mb-2 text-medium-emphasis">{produto.preco}</CCardSubtitle>
                    <CCardText>{produto.descricao}</CCardText>
                    <CButton href="#">Adicionar ao Carrinho</CButton>
                </CCardBody>
            </CCard>
        </>
    )
}
