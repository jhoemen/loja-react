import { CFormLabel, CFormInput, CFormText, CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CCardSubtitle, CPlaceholder } from '@coreui/react'

export default function Produto(props) {
    const { item: produto = [], adicionarProdutoCarrinho, removerProdutoCarrinho } = props

    return (
        <>
            <CCard className="mb-4">
                <CCardImage orientation="top" src={produto.imagem} />
                <CCardBody>
                    <CCardTitle>{produto.nome}</CCardTitle>
                    <CCardSubtitle className="mb-2 text-medium-emphasis">{produto.preco}</CCardSubtitle>
                    <CCardText>{produto.descricao}</CCardText>
                    <CButton
                        onClick={(e) => {
                            adicionarProdutoCarrinho({ ...produto, quantidade: 1 })
                        }}>
                        Adicionar ao Carrinho
                    </CButton>
                </CCardBody>
            </CCard>
            <CCard>
                <CCardImage component="svg" orientation="top" width="100%" height="162" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <title>{produto.nome}</title>
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                </CCardImage>
                <CCardBody>
                    <CPlaceholder component={CCardTitle} animation="glow" xs={7}>
                        <CPlaceholder xs={6} />
                    </CPlaceholder>
                    <CPlaceholder component={CCardText} animation="glow">
                        <CPlaceholder xs={7} />
                        <CPlaceholder xs={4} />
                        <CPlaceholder xs={4} />
                        <CPlaceholder xs={6} />
                    </CPlaceholder>
                    <CPlaceholder component={CButton} disabled href="#" tabIndex={-1} xs={6}></CPlaceholder>
                </CCardBody>
            </CCard>
        </>
    )
}
