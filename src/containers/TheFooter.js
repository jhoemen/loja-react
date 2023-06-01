import React from 'react'
import { CFooter, CLink } from '@coreui/react'

const TheFooter = (props) => {
    const { totalCarrinho } = props

    var today = new Date()
    var year = today.getFullYear()

    return (
        <CFooter className="bg-white text-dark">
            <div>
                <CLink className="text-decoration-none text-dark" href="https://coreui.io">
                    Loja Online
                </CLink>
                <span>
                    <b> - &copy; 2023</b>
                </span>
            </div>
            <div>
                <span>Desenvolvido por </span>
                <CLink className="text-decoration-none text-dark" href="https://github.com/jhoemen">
                    <b>Jonathan da Silva Pereira</b>
                </CLink>
            </div>
        </CFooter>
    )
}

export default React.memo(TheFooter)
