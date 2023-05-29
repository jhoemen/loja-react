import CryptoJS from 'crypto-js'
import consts from '../services/consts'
import moment from 'moment'

export const somenteNumeros = (string) => {
    return string.replace(/[^0-9]/g, '')
}

export const toHash = (value) => {
    if (campoVazio(value)) return

    return CryptoJS.SHA1(value).toString(CryptoJS.enc.Hex)
}

export const campoVazio = (input) => {
    if (input != undefined || input != null) {
        return input.length <= 0 || input.trim() == ''
    }

    return input == undefined || input == null
}

export const criptografar = async (value) => {
    if (campoVazio(value)) return

    return CryptoJS.AES.encrypt(value, consts.SECRET_KEY_ENCRIPTY).toString()
}

export const descriptografar = (value) => {
    if (campoVazio(value)) return
    var bytes = CryptoJS.AES.decrypt(value, consts.SECRET_KEY_ENCRIPTY)
    return bytes.toString(CryptoJS.enc.Utf8)
}

export const validarDigitoVerificadorCpf = (numCpf) => {
    let strCPF = numCpf.replace(/[^\d]+/g, '')
    if (strCPF == '') return false

    let Soma
    let Resto
    Soma = 0

    if (strCPF == '00000000000') return false

    for (let i = 1; i <= 9; i++) {
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
    }
    Resto = (Soma * 10) % 11

    if (Resto == 10 || Resto == 11) Resto = 0

    if (Resto != parseInt(strCPF.substring(9, 10))) return false

    Soma = 0
    for (let i = 1; i <= 10; i++) {
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
    }
    Resto = (Soma * 10) % 11

    if (Resto == 10 || Resto == 11) Resto = 0

    if (Resto != parseInt(strCPF.substring(10, 11))) return false

    return true
}

export const validarFormatoEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

export const pathUrl = () => {
    return window.location.protocol + '//' + window.location.host
}

export const validarData = (data) => {
    return moment(data).isValid()
}

export const formatarData = (data) => {
    if (!validarData(data)) return data

    return moment(data).format('DD/MM/YYYY')
}

export const formatarModeaReal = (data) => {
    data = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(data)

    return data
}

export const formatarCpf = (cpf) => {
    cpf = cpf.replace(/\D/g, '')

    if (cpf.length <= 11) {
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    } else {
        cpf = cpf.replace(/^(\d{2})(\d)/, '$1.$2')
        cpf = cpf.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        cpf = cpf.replace(/\.(\d{3})(\d)/, '.$1/$2')
        cpf = cpf.replace(/(\d{4})(\d)/, '$1-$2')
    }

    return cpf
}
