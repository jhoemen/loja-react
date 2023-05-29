import React from 'react'

const Produto = React.lazy(() => import('./views/produto/listaProduto'))
// const Pagamento = React.lazy(() => import('./views/Pagamento'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/produto', name: 'Produto', component: Produto },
    // { path: '/pagamento', name: 'Pagamento', component: Pagamento }
]

export default routes
