import { isTokenValido } from "src/util/validate";
import { somenteNumeros, criptografar, descriptografar, campoVazio } from "../util/util";
import consts from "./consts";
import { responseAPI } from 'src/util/responseAPI';

/**
 * hook de serviços
 */

const baseUrlCredenciamento = consts.BASE_URL_CREDENCIAMENTO
const apiKeyCredenciamento = consts.API_KEY_CREDENCIAMENTO
/**
 * Request Generico
 */
const request = async (method, endpoint, params, token = null) => {
    method = method.toLowerCase();
    let fullUrl = `${baseUrlCredenciamento}${endpoint}`;
    let body = null;

    switch (method) {
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
            break;
    
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);       
            break;
        default:
    }

    let headers = {'Content-Type': 'application/json'};
    if(token){
        headers.Authorization = `Bearer ${token}`;
    }
    
    let json;
    let req;
    try {
        req = await fetch(fullUrl, {method, headers, body}); 
        
        switch (req.status) {
            case 200:
                json = await req.json();
                break;
            case 201:
                json = await req.json();
                break;
        
            default:
                json = await req.json();
                break;
        }
    } catch (error) {
        json = {mensagem: responseAPI.ServicoIndisponivel };
    }
    
    return json;
}

export default () => {
    
    const getDecriptedToken = () => {
        let tokenEncripted = localStorage.getItem('token');
        if(campoVazio(tokenEncripted)){
            return;
            
        }
    
        return JSON.parse(descriptografar(tokenEncripted));
    }

    return {
        getToken: ()=>{
            return getDecriptedToken();
        },
        validateToken: ()=>{
            let tokenEncripted = localStorage.getItem('token');
            if(campoVazio(tokenEncripted)){
                return;
            }

            let token = JSON.parse(descriptografar(tokenEncripted));
            return isTokenValido(token.expires_in);
        },
        login: async (cpf) => {
            cpf = somenteNumeros(cpf);
            let appKey = apiKeyCredenciamento;
            let json = await request("post", "/loginAplicacao", {appKey});
            
            if(json.sucesso === false){
                return json;
            }
            json.cpf = cpf;

            let client = await request("GET", "/Clientes/ObterPorCpf", {clienteCpf: cpf}, json.access_token);
            if(client?.dados){
                json.cliente = client.dados;
            }

            let tokenEncripted = criptografar(JSON.stringify(json));
            localStorage.setItem('token', tokenEncripted);

            return json;
        },
        logout: async () => {
            localStorage.removeItem('token');
        },
        loginAplicacao: async () => {
            let appKey = apiKeyCredenciamento;
            let json = await request("post", "/loginAplicacao", {appKey});
            return json;
        },
        getTypeDoc: async () => {
            let token = getDecriptedToken();
            let json = await request('GET', "/TipoDeArquivos", "", token.access_token);
            return json;
        },
        getDocs: async () => { },
        updateDocs: async (id, data) => { },
        addDocs: async (formData) => {
            let token = getDecriptedToken();

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token.access_token}`);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formData,
                redirect: 'follow'
            };
            
            const req =  await fetch(`${baseUrlCredenciamento}/Arquivo/InserirArquivosDoCadastro`, requestOptions);
            const json = await req.json();

            return json;
        },
        removeDocs: async (id) => { },
        getUsers: async () => { },
        getUser: async (cpf, token) => {
            let json = await request('GET', '/Usuario/BuscaPorCpf', {cpf}, token);
            return json;
        },
        addUser: async (usuario, token) => {
            let json = await request('POST', '/Usuario/CriarUsuario', usuario, token);
            return json;
        },
        activeUser: async (usuarioGuid) => {
            let json = await request('POST', `/Usuario/AtivarUsuario/${usuarioGuid}`, {usuarioGuid});            
            return json;
        },
        addClient: async (cliente) => {
            let token = getDecriptedToken();
            let url = cliente.isDependente ? "/Cadastro/CadastrarDependente" : "/Cadastro";
            let json = await request("POST", url, cliente, token.access_token);
            
            return json;
        },
        saveNewClient: (cadastro) => {
            //cadastro = criptografar(JSON.stringify(cadastro));
            cadastro = JSON.stringify(cadastro);
            try {
                localStorage.setItem('cadastro', cadastro);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        
        },
        recoveryNewClient: () => {           
            let useEncripted = localStorage.getItem('cadastro');
            if(useEncripted){
                //return JSON.parse(descriptografar(useEncripted));
                return JSON.parse(useEncripted);
            }

            return useEncripted;
        },
        getCredencial: async () => {
            let tokenEncripted = localStorage.getItem('token');
            let token = JSON.parse(descriptografar(tokenEncripted));
            let json = await request('GET', `/Credencial/ObterPorUuid`, {uuid: token.uuid}, token.access_token);
            return json;
        },
        getCredencials: async (filters) => {
            let token = getDecriptedToken();
            let json = await request('GET', '/Credencial/ListarCredenciais', filters, token.access_token);
            return json;
        },
        getCredencialsByCpf: async (cpf) => {
            let token = getDecriptedToken();
            let json = await request('GET', '/Credencial/ObterPorCpf', {cpf: cpf}, token.access_token);
            return json;
        },
        getTypeClientCategoryCombobox: async () => {
            let token = getDecriptedToken();
            let json = await request("GET", "/Categoria/BuscaCategoriaParaComboBox", '', token.access_token);
            return json;
        },
        getGenre: async() => {
            let token = getDecriptedToken();
            let json = await request('GET', '/Generos','',token.access_token);
            return json;
        },
        getEstates: async() => {
            let token = getDecriptedToken();
            let json = await request('GET', '/Estado/ObterParaDropDown','',token.access_token);
            console.log(json);
            return json;
        },
        getCities: async(uuidEstado) => {
            let token = getDecriptedToken();
            let json = await request("GET", "/Municipio/ObterPorEstadoParaDropDown", {uuidEstado}, token.access_token);
            console.log(json);
            return json;
        },
        getSchooling: async() => {
            let token = getDecriptedToken();
            let json = await request("GET", "/Escolaridades", '', token.access_token);
            return json;
        },
        getMaritalStatus: async() => {
            let token = getDecriptedToken();
            let json = await request("GET", "/EstadosCivis", '', token.access_token);
            return json;
        },
        getParentescos: async () => {
            let token = getDecriptedToken();
            let json = await request("GET", "/Parentescos", '', token.access_token);
            return json;
        },
        getPositions: async () => {
            let token = getDecriptedToken();
            let json = await request("GET", "/Cargos", '',token.access_token);
            return json;
        },
        getFaixaSalarial: async () => {
            let token = getDecriptedToken();
            let json = await request("GET", "/Salarios", '',token.access_token);
            return json;
        },
        getClient: async(cpf, tokenApp = null) => {
            let token = getDecriptedToken();
            let json = await request("GET", "/Clientes/ObterPorCpf", {clienteCpf: cpf}, tokenApp ? tokenApp : token.access_token);
            return json;
        },
        checkExistClientByCpf: async (cpf, token) => {
            let json = await request("GET", "/Clientes/VerificarSeClienteExistePorCPF",{clienteCpf: cpf}, token);
            return json;
        },
        getCompany: async (cnpj) => {
            let token = getDecriptedToken();
            let json = await request('GET', "/Empresa/BuscaEmpresasPorCnpjParaComboBox", {cnpjEmpresa: cnpj}, token.access_token);
            return json;
        },
        consultarCepExterno: async (cep) => {
            let token = getDecriptedToken();
            let json = await request("POST", `/buscaEnderecoPorCEP/${cep}`, "", token.access_token);
            return json
        }
    };
}