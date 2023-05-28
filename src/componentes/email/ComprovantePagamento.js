import React from 'react'
import { formatarModeaReal } from '../../util/util';

const ComprovantePagamento = (props) => {
    const { pagamento } = props
    return (
        <>
            <body>
                <table width="600" border="0" align="center">
                    <tbody>
                        <tr>
                            <td bgcolor="#ebebeb">
                                <table width="100%" border="0">
                                    <tbody>
                                        <tr>
                                            <td width="89%"><h1>Comprovante de Pagamento</h1>
                                            </td>
                                            <td width="11%">
                                                <table width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td><a href="https://www.facebook.com/sescmt" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" title="Curta nossa fã page!" data-linkindex="0"><img data-imagetype="External" src="http://www.sescmatogrosso.com.br/portal/images/newsletter/social/icon-fb.png" data-imageproxyendpoint="/actions/ei" width="26" height="26" alt="Facebook"></img></a>
                                                            </td>
                                                            <td><a href="https://twitter.com/sescmt" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" title="Siga-nos no Twitter!" data-linkindex="1"><img data-imagetype="External" src="http://www.sescmatogrosso.com.br/portal/images/newsletter/social/icon-tw.png" data-imageproxyendpoint="/actions/ei" width="26" height="26" alt="Twitter"></img></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><a href="https://plus.google.com/+SESCMTMT" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" title="Siga-nos no Google Plus" data-linkindex="2"><img data-imagetype="External" src="http://www.sescmatogrosso.com.br/portal/images/newsletter/social/icon-gplus.png" data-imageproxyendpoint="/actions/ei" width="26" height="26" alt="Google +"></img></a>
                                                            </td>
                                                            <td><a href="http://instagram.com/sescmt/" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" title="Siga-nos no Instagram" data-linkindex="3"><img data-imagetype="External" src="http://www.sescmatogrosso.com.br/portal/images/newsletter/social/icon-in.png" data-imageproxyendpoint="/actions/ei" width="26" height="26" alt="Instagram"></img></a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                    </tbody>
                                </table>
                                <table width="100%" border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p>
                                                    Olá <strong>{pagamento?.nome}</strong>!<br /><br />Recebemos seu pagamento, dados do pagamento:<br />
                                                </p>

                                                <span>
                                                    <>
                                                    {
                                                        (pagamento.tipo_pagamento == 'PIX') &&
                                                        <>
                                                            Chave PIX: {pagamento?.txid} <br />
                                                            Valor: {formatarModeaReal(pagamento?.valor)} <br />
                                                        </>
                                                        ||
                                                        <>
                                                            Bandeira: {pagamento?.bandeira_cartao} <br />
                                                            Código de autorização: {pagamento?.codigo_autorizacao_transacao} <br />
                                                            NSU: {pagamento?.nsu} <br />
                                                            Valor: {pagamento?.valor} <br />
                                                        </>
                                                    }
                                                    </>
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><p>Caso não tenha efetuado o pagamento, por favor, entrar em contato com o SESC-MT.</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </>
    )
}

export default ComprovantePagamento