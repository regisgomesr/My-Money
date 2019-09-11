import React from 'react'
import useGet from './useGet'
import usePost from './usePost'
import useDelete from './useDelete'


const url = 'https://mymoney-regis.firebaseio.com/movimentacoes/2019-08.json'

function App() {
  const data = useGet(url)
  const [postData, post] = usePost(url)
  const [deleteData, remove] = useDelete()

  

  const saveNew = () => {
    post({ valor: 4, descricao: 'banana' })
  }

  const doRemove = () => {
    remove('https://mymoney-regis.firebaseio.com/movimentacoes/2019-08/-LoVyibtQgMAkqAMoo3R.json')
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
