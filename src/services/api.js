import axios from 'axios'
import { descriptografar } from 'src/util/util'
import consts from './consts'

const baseUrl = consts.BASE_URL
const tokenEncripted = localStorage.getItem('token')
var token = JSON.parse(descriptografar(tokenEncripted)).token

const api = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(async (request) => {
    // salvar log

    return request
})

api.interceptors.response.use(async (response) => {
    // salvar log

    return response
})

export default api
