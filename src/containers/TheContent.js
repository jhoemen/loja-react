import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
  
const loading = (
  <CSpinner color="light"/>
)

const TheContent = (propsLayout) => {
  return (
    <main className="c-main width-100 m-0 p-0">
        <CContainer fluid>
            <Suspense fallback={loading}>
            <Switch>
                {routes.map((route, idx) => {
                    return ( 
                        route.component && (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => ( <route.component {...props} {...propsLayout} /> )} 
                            />
                        )
                    )
                })}
                <Redirect from="/" to="/cobranca" />
            </Switch>
            </Suspense>
        </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
