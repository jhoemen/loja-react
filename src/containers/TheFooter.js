import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CFooter } from '@coreui/react'

const TheFooter = (props) => {
  const history = useHistory();
  const location = useLocation();

  const {cobrancaSelecionada, totalCobranca, adicionarNotificacao} = props;

  var today = new Date();
  var year = today.getFullYear();

  const handlerLogout = () => {
    history.push('/logout');
  }

  function goBack(){
    history.goBack();
  }

  function handlerPagamento(){
    if (cobrancaSelecionada.length == 0) {
      adicionarNotificacao('Nenhuma cobrança selecionada.', 'erro')
      return
    }

    history.push('/pagamento');
  }

  return (
    <CFooter position="fixed">
      <div className="width-100 content">
        <div className="bg-white text-azul-claro text-center fs-1 p-3 mb-2 rounded-2 fw-bolder">
                    VALOR TOTAL: {totalCobranca}
        </div>
                <div className="d-flex mb-3">
                    <div>
                        <div className="botao icone rounded-2 fw-bolder" onClick={handlerLogout}>
                            <svg viewBox="0 0 20 20" className="nav-icon svg-icon text-azul-claro" height="100" width="100">
                                <path fill="#004C99" d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
                            </svg>
                        </div>
                    </div>

                    {
                      (location.pathname == '/pagamento') &&
                      <>
                        <div><div className="bg-info text-white botao rounded-2 fw-bolder fs-1 ms-2"  onClick={goBack}>Voltar</div></div>
                      </>
                    }
                    
                    {
                      (location.pathname != '/pagamento') && cobrancaSelecionada.length > 0 &&
                      <>
                        <div className="ms-auto"><div className="botao rounded-2 fw-bolder fs-1 bg-success text-white" onClick={handlerPagamento}>Finalizar</div></div>
                      </>
                    }
                    
                </div>
                
            </div>
      <div className='width-100 text-center'>
        <span>Copyright &copy; {year} - SESC/MT</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
