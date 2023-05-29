import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = (props) => {
    const { totalCobranca } = props

    var today = new Date()
    var year = today.getFullYear()

    return (
        <CFooter position="fixed">
            <div className="width-100 content">
                <div className="bg-white text-azul-claro text-center fs-1 p-3 mb-2 rounded-2 fw-bolder">VALOR TOTAL: {totalCobranca}</div>
            </div>
            <div className="width-100 text-center">
                <span>Copyright &copy; {year} - Loja Online</span>
            </div>
        </CFooter>
    )
}

export default React.memo(TheFooter)
