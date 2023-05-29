import React, { useState, useEffect } from 'react'
import { formatarModeaReal } from '../../util/util'
import { useLocation } from 'react-router-dom'

const Produto = (props) => {
    return (
        <>
            <div className="card bg-transparent text-white border-white text-center p-4 mb-4 fw-bolder fs-1">
                <div className="card-header border-0 bg-transparent">Selecione um produto</div>
            </div>
        </>
    )
}

export default Produto
