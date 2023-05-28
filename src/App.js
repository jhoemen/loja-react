import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'

import { CSpinner } from '@coreui/react'

const loading = <CSpinner color="light" />

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'))

// Pages
const Login = React.lazy(() => import('./views/Login'))
const Logout = React.lazy(() => import('./views/Logout'))
const NovoCliente = React.lazy(() => import('./views/cliente/CadastrarCliente'))

const App = () => {
    return (
        <BrowserRouter>
            <React.Suspense fallback={loading}>
                <Switch>
                    <Route exact path="/login" name="Login" render={(props) => <Login {...props} />} />
                    <Route exact path="/logout" name="Logout" render={(props) => <Logout {...props} />} />
                    <Route exact path="/novo-cliente" name="Login" render={(props) => <NovoCliente {...props} />} />
                    <Route path="/" name="Home" render={(props) => <TheLayout {...props} />} />
                </Switch>
            </React.Suspense>
        </BrowserRouter>
    )
}

export default App
