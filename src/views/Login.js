import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CAlert, CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useApi from '../services/api'

const Login = () => {
    const api = useApi()
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [msgAlert, setMsg] = useState(localStorage.getItem('loginError') ? localStorage.getItem('loginError') : '')
    const [loading, setLoading] = useState(false)

    localStorage.removeItem('loginError')

    const handleLoginButton = async () => {
        setLoading(true)
        if (!(email && password)) {
            exibirMsg('Informe email e senha para prosseguir!')
            return
        }

        const result = await api.login(email, password)
        localStorage.setItem('AcceesToken', result.access_token)
        if (result?.access_token) {
            history.push('/')
        }

        exibirMsg(result?.mensagem?.descricao ?? 'Sistema indiponível no momento! Tente mais tarde.')
    }

    const handleCadastroButton = () => {
        console.log('novo cliente')
        history.push('/novo-cliente')
    }

    const exibirMsg = (msg) => {
        setMsg(msg)
        setTimeout(() => {
            setMsg('')
        }, 5000)
        setLoading(false)
    }

    return (
        <>
            <div className="min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md="8">
                            <CCard className="p-2">
                                <CCardBody>
                                    <CForm>
                                        <h2>Já tenho cadastro</h2>
                                        <h4 className="text-muted mb-3 mt-1">Informe seus dados de acesso</h4>

                                        {msgAlert !== '' && (
                                            <CAlert color={'danger'} fade="true" className="text-center mb-3">
                                                {' '}
                                                {msgAlert}
                                            </CAlert>
                                        )}

                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon="cil-user" />
                                            </CInputGroupText>
                                            <CFormInput className={`form-control form-control-lg`} placeholder="E-mail" id="nf-email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} size="lg" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon="cil-lock-locked" />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Senha"
                                                className={`form-control form-control-lg`}
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                }}
                                                disabled={loading}
                                                size="lg"
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton color="primary" className="px-6" onClick={handleLoginButton} disabled={loading}>
                                                    <>
                                                        {loading && <CSpinner component="span" size="sm" aria-hidden="true" />}
                                                        {loading ? ' Carregando...' : 'Acessar'}
                                                    </>
                                                </CButton>
                                            </CCol>
                                            <CCol xs="6" className="text-end">
                                                <CButton color="light" className="px-6" onClick={handleCadastroButton} disabled={loading}>
                                                    Novo Cadastro!
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    )
}

export default Login
