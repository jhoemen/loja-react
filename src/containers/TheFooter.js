import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = (props) => {
    const { totalCarrinho } = props

    var today = new Date()
    var year = today.getFullYear()

    return (
        <CFooter>
            <div className="width-100 text-center">
                <span>Copyright &copy; {year} - Loja Online</span>
            </div>
        </CFooter>
    )
}

export default React.memo(TheFooter)
