import { validarDigitoVerificadorCpf, somenteNumeros, validarFormatoEmail, validarData } from './util'
import moment from 'moment'

export const validarCampoObrigatorio = (strInput, nameInput = '') => {
    let input = strInput?.toString().trim()
    if (input?.length <= 0 || input === '' || input === undefined || input === null) return `${nameInput == '' ? 'Campo' : nameInput} precisa ser informado`

    return ''
}

export const validarCPF = (value) => {
    let strCpf = somenteNumeros(value)

    let msg = validarCampoObrigatorio(strCpf, 'CPF')
    if (msg !== '') return `${msg}!`

    if (!validarDigitoVerificadorCpf(strCpf)) return 'O CPF é inválido!'

    return ''
}

export const validarCNPJ = (value) => {
    let strCpf = somenteNumeros(value)

    let msg = validarCampoObrigatorio(strCpf, 'CNPJ')
    if (msg !== '') return `${msg}!`

    if (strCpf.length !== 14) return 'O CNPJ é inválido!'

    return ''
}

export const validarEmail = (email) => {
    let msg = validarCampoObrigatorio(email, 'Email')
    if (msg !== '') return `${msg}!`

    if (!validarFormatoEmail(email)) return 'E-mail inválido!'

    return ''
}

export const validarPassword = (pass) => {
    let msg = validarCampoObrigatorio(pass, 'Senha')
    if (msg !== '') return `${msg}!`

    if (pass.length < 6) return 'A senha precisa ter no mínimo 6 digitos'

    return ''
}

export const validarPasswordConfirm = (passConfirm, pass) => {
    let msg = validarCampoObrigatorio(passConfirm, 'Confirmação de Senha')
    if (msg !== '') return `${msg}!`

    if (passConfirm !== pass) return 'A confirmação da senha digitida não confere com a senha informada!'

    return ''
}

export const isTokenValido = (dataToken) => {
    let agora = Math.floor(Date.now() / 1000)
    return dataToken > agora
}

export const validarCampoTipoData = (data, nomeInput = '') => {
    let msg = validarCampoObrigatorio(data, nomeInput)
    if (msg !== '') return `${msg}`

    if (!validarData(data)) {
        return 'A data informada é invalida!'
    }

    return ''
}
