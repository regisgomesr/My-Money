import React from 'react'
import Rest from './rest'

const baseURL = 'https://mymoney-regis.firebaseio.com/'

const { useGet, usePost, useDelete } = Rest(baseURL)


function App() {
  const data = useGet('movimentacoes/2019-08')
  const [postData, post] = usePost('movimentacoes/2019-08')
  const [deleteData, remove] = useDelete()

  

  const saveNew = () => {
    post({ valor: 5, descricao: 'acerola' })
  }

  const doRemove = () => {
    remove('movimentacoes/2019-08/1')
  }

  return (
    <div>
      <h1>My Money</h1>
      { JSON.stringify(data) }
      { data.loading && <p>Loading...</p> }

      <button onClick={saveNew}>Salvar</button>

      <pre>{JSON.stringify(postData)}</pre>

      <button onClick={doRemove}>Deletar</button>
      <pre>{JSON.stringify(deleteData)}</pre>
    </div>
  )
}

export default App
