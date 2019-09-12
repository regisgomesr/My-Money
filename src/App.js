import React from 'react'
import Header from './elements/Header'
import Meses from './Meses'
import AdicionarMes from './AdicionarMes'


function App() {
  //const data = useGet('movimentacoes/2019-08')
  //const [postData, post] = usePost('movimentacoes/2019-08')
  //const [deleteData, remove] = useDelete()

  const saveNew = () => {
    //post({ valor: 5, descricao: 'acerola' })
  }

  const doRemove = () => {
    //remove('movimentacoes/2019-08/1')
  }

  return (
    <div>

      <Header/>
      <div className='container'>
        <AdicionarMes />
        <Meses/>
      </div>

    </div>
  )
}
export default App
