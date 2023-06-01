import React from 'react'

const ListaProduto = React.lazy(() => import('./views/produto/listaProduto'))
const Checkout = React.lazy(() => import('./views/checkout/checkout'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/produto', name: 'lista Produto', component: ListaProduto },
    { path: '/checkout', name: 'Checkout', component: Checkout },
]

export default routes
