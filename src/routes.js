import React from 'react'

const ListaProduto = React.lazy(() => import('./views/produto/listaProduto'))
// const Pagamento = React.lazy(() => import('./views/Pagamento'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/produto', name: 'lista Produto', component: ListaProduto },
    // { path: '/pagamento', name: 'Pagamento', component: Pagamento }
]

export default routes
