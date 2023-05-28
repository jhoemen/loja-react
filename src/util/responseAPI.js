export const responseAPI = {
    usuarioNaoEncontrado: {
        codigo: 24,
        descricao: "Usuário não Encontrado"
    },
    realizadaComSucesso: {
        codigo: 1,
        descricao: "Operação realizada com sucesso"
    },
    SalvoComSucesso: {
        codigo: 2,
        descricao: "Registro salvo com sucesso"
    },
    ServicoIndisponivel: {
        codigo: 99,
        descricao: "Serviço indisponivel no momento"
    },
    SessaoExpirada: {
        codigo: 100,
        descricao: "Sua sessão expirou!"
    },
    UsuarioCadastrado: {
        codigo: 101,
        descricao: "Usuário já cadastrado!"
    },
    RegistroNaoEncontrado: {
        codigo: 8,
        descricao: "Registro não encontrado!"
    },
    ClienteJaExisteNaBaseDeDadosSCA: {
        codigo: 49,
        descricao: "O cliente já existe na base dados(SCA)."
    },
    ClienteJaExisteNaBaseDeDados: {
        codigo: 48,
        descricao: "O cliente já existe na base dados."
    }, 
    ClienteNaoTemLoginPortalDoCliente: {
        codigo: 50,
        descricao: "O Cliente não possui login no portal do cliente."
    }
}