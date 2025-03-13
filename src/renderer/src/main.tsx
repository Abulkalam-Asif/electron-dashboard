import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ApolloProvider } from '@apollo/client'
import client from './apolloClient'
import { HashRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
