import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'

import 'isomorphic-fetch'

import Home from './Pages/Home'
import Speakers from './Pages/Speakers'
import Speaker from './Pages/Speaker'
import Tags from './Pages/Tags'
import Tag from './Pages/Tag'
import Favorites from './Pages/Favorites'

import './Utils/global-styles'
import theme from './Utils/theme'
import client from './Utils/stateLink'

hydrate(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/favorites" component={Favorites} />
                    <Route path="/categories" component={Tags} />
                    <Route path="/category/:category" component={Tag} />
                    <Route path="/speakers" component={Speakers} />
                    <Route path="/speaker/:speaker" component={Speaker} />
                </div>
            </Router>
        </ThemeProvider>
    </ApolloProvider>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept()
}
