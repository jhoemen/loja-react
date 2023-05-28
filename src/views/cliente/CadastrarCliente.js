import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CAlert, CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CRow, CSpinner } from '@coreui/react'
import useApi from '../../services/api'
import InputMask from 'react-input-mask'
import PrimaryInputMask from 'src/componentes/input/PrimaryInputMask'
import { validarCPF, validarCampoObrigatorio, validarEmail, validarPassword, validarPasswordConfirm } from '../../util/validate'
import PrimaryInput from 'src/componentes/input/PrimaryInput'

const Login = () => {
    const api = useApi()
    const history = useHistory()

    const [nome, setNome] = useState('')
    const [nomeValid, setNomeValid] = useState('')
    const [nomeValidMsg, setNomeValidMsg] = useState('')

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState('')
    const [emailValidMsg, setEmailValidMsg] = useState('')

    const [cpf, setCpf] = useState('')
    const [cpfValid, setCpfValid] = useState('')
    const [cpfValidMsg, setCpfValidMsg] = useState('')

    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState('')
    const [passwordValidMsg, setPasswordValidMsg] = useState('')

    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [passwordConfirmationValid, setPasswordConfirmationValid] = useState('')
    const [passwordConfirmationValidMsg, setPasswordConfirmationValidMsg] = useState('')

    const [msgAlert, setMsg] = useState(localStorage.getItem('loginError') ? localStorage.getItem('loginError') : '')
    const [loading, setLoading] = useState(false)

    localStorage.removeItem('loginError')

    const validarFormulario = () => {
        let formErros = []

        let msg = validarCPF(cpf)
        setCpfValid(msg === '' ? 'is-valid' : 'is-invalid')
        setCpfValidMsg(msg)
        formErros.push(msg === '')

        msg = validarCampoObrigatorio(nome, 'Nome')
        setNomeValid(msg === '' ? 'is-valid' : 'is-invalid')
        setNomeValidMsg(msg)
        formErros.push(msg === '')

        msg = validarEmail(email)
        setEmailValid(msg === '' ? 'is-valid' : 'is-invalid')
        setEmailValidMsg(msg)
        formErros.push(msg === '')

        msg = validarPassword(password)
        setPasswordValid(msg === '' ? 'is-valid' : 'is-invalid')
        setPasswordValidMsg(msg)
        formErros.push(msg === '')

        msg = validarPasswordConfirm(passwordConfirmation, password)
        setPasswordConfirmationValid(msg === '' ? 'is-valid' : 'is-invalid')
        setPasswordConfirmationValidMsg(msg)
        formErros.push(msg === '')

        let isValidForm = formErros.every((value) => value === true)

        return isValidForm
    }

    const handleSalvarCliente = async () => {
        setLoading(true)

        if (validarFormulario() === false) {
            setLoading(false)
            return
        }

        const novoCliente = {
            nome: nome,
            email: email,
            cpf: cpf,
            password: password,
            password_confirmation: passwordConfirmation,
        }

        const result = await api.cadastrarCliente(novoCliente)

        if (result?.access_token) {
            history.goBack()
        }

        exibirMsg(result?.mensagem?.descricao ?? 'Sistema indiponível no momento! Tente mais tarde.')
    }

    const handleVoltar = () => {
        history.push('/login')
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
                                        <h2>Cadastro de Cliente</h2>
                                        <h4 className="text-muted mb-3 mt-1">Informe seus dados para cadastro</h4>

                                        {msgAlert !== '' && (
                                            <CAlert color={'danger'} fade="true" className="text-center mb-3">
                                                {' '}
                                                {msgAlert}
                                            </CAlert>
                                        )}
                                        <CRow>
                                            <CCol xs="12">
                                                <PrimaryInput name="nome" label="Nome completo" value={nome} setStat={setNome} valid={nomeValid} validMensagem={nomeValidMsg} loading={loading} />
                                                <PrimaryInput name="email" label="E-mail" value={email} setStat={setEmail} valid={emailValid} validMensagem={emailValidMsg} loading={loading} />
                                                <PrimaryInputMask name="cpf" label="CPF" mask="999.999.999-99" value={cpf} setStat={setCpf} valid={cpfValid} validMensagem={cpfValidMsg} loading={loading} />
                                                <PrimaryInput name="senha" label="Senha" type="password" value={password} setStat={setPassword} valid={passwordValid} validMensagem={passwordValidMsg} loading={loading} />
                                                <PrimaryInput name="senhaConfirmacao" label="Confirmar senha" type="password" value={passwordConfirmation} setStat={setPasswordConfirmation} valid={passwordConfirmationValid} validMensagem={passwordConfirmationValidMsg} loading={loading} />
                                            </CCol>
                                        </CRow>
                                        <CRow className="mt-4">
                                            <CCol className="text-end">
                                                <CButton color="light" className="px-6 m-2 mt-0 mb-0" onClick={handleVoltar} disabled={loading}>
                                                    Voltar
                                                </CButton>
                                                <CButton color="success" className="px-6" onClick={handleSalvarCliente} disabled={loading}>
                                                    <>
                                                        {loading && <CSpinner component="span" size="sm" aria-hidden="true" />}
                                                        {loading ? ' Carregando...' : 'Salvar'}
                                                    </>
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
