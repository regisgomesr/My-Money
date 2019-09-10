import { useEffect, useReducer} from 'react'
import axios from 'axios'


// funcao pura = vantagem que é melhor para testar
const reducer = (state, action) => {
    //console.log('state', state, 'action', action)
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
  
  const useGet = url => {
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
    }, [url])
    return data
  }

  export default useGet