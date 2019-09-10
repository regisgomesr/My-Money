import React from 'react'
import useGet from './useGet'


const url = 'https://mymoney-regis.firebaseio.com/movimentacoes/2019-08.json'

function App() {
  const data = useGet(url)
  const data2 = useGet('http://httpbin.org/ip')

  return (
    <div>
      <h1>My Money</h1>
      { JSON.stringify(data) }
      { data.loading && <p>Loading...</p> }
      <pre>{ JSON.stringify(data2) }</pre>
    </div>
  )
}

export default App
