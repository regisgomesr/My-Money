import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './elements/Header'
import Home from './pages/Home/index'
import Movimentacoes from './pages/Movimentacoes'
import Login from './pages/Login'

function App() {

  return (

    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/movimentacoes/:data' exact component={Movimentacoes} />
      </div>
    </Router>
  )
}
export default App
