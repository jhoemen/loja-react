import { CToast, CToastBody, CToastClose } from "@coreui/react"

export const Toasters = (mensagem, typeMessage) => {
    let color = '';
    let colorName = '';

    switch (typeMessage.toLowerCase()) {
        case 'erro':
                color = "#C22620";
                colorName = "danger";
            break;

            case 'sucesso':
                color = "#14D514";
                colorName = "success";
            break;

            case 'aviso':
                color = "#FF8040";
                colorName = "warning";
            break;
    
        default:
            color = "#007aff";
            colorName = "primary";
            break;
    }

    return (
        <CToast className="text-white align-items-center" color={colorName} delay={10000}>
            <div className="d-flex p-2">
                <CToastBody className="h5">{mensagem}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
            </div>
        </CToast>
    )
}

