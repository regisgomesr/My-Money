import React, { useState, useEffect, useReducer} from 'react'
import axios from 'axios'

/*axios
.get('https://mymoney-regis.firebaseio.com/name.json')
.then(res => {
  console.log(res)
})

axios
.post('https://mymoney-regis.firebaseio.com/name.json', {
  outro: 'Theo'
})
.then(res => {
  console.log(res)
})*/

const url = 'https://mymoney-regis.firebaseio.com/movimentacoes/2019-08.json'

// funcao pura = vantagem que é melhor para testar
const reducer = (state, action) => {
  console.log('state', state, 'action', action)
  if(action.type === 'REQUEST') {
    return {
      ...state,
      loading: true
    }
  }

  if(action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }

  return state
}

function App() {
  const [data, dispatch] = useReducer(reducer, {
    loading: true,
    data: {}
  })
  
  useEffect(() => {
    dispatch({ type: 'REQUEST' })
    axios
    .get(url)
    .then(res => {
     dispatch({ type: 'SUCCESS', data: res.data })
    })
  }, [])
  
  return (
    <div>
      <h1>My Money</h1>
      { JSON.stringify(data) }
      { data.loading && <p>Loading...</p> }
    </div>
  )
}

export default App
