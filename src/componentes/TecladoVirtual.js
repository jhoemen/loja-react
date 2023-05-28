import React from 'react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons';

const TecladoVirtual = (props) => {
    const {data:preencherCampoComTecladoVirutal} = props

    return (
        <>
        <div className="teclado-virtual">
            <div className="col-4"><div className="numero left" id="7" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}>7</div></div>
            <div className="col-4"><div className="numero" id="8" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}>8</div></div>
            <div className="col-4"><div className="numero right" id="9" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}>9</div></div>
        
        
            <div className="col-4"><div className="numero left" id="4" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}>4</div></div>
            <div className="col-4"><div className="numero" id="5" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}>5</div></div>
            <div className="col-4"><div className="numero right" id="6" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}>6</div></div>
        
        
            <div className="col-4"><div className="numero left" id="1" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}>1</div></div>
            <div className="col-4"><div className="numero" id="2" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}>2</div></div>
            <div className="col-4"><div className="numero right" id="3" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}>3</div></div>

            <div className="col-8"><div className="numero left" id="0" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}>0</div></div>
            <div className="col-4">
                <div className="numero right bg-warning" id="x" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}>
                    <CIcon icon={icon.cilDelete} size="3xl" id="x" onClick={e => preencherCampoComTecladoVirutal(e.target.id)}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default TecladoVirtual