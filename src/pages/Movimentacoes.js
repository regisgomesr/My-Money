import React from 'react'

import Rest from '../utils/rest'

const baseURL = 'https://mymoney-regis.firebaseio.com/'
const { useGet } = Rest(baseURL)

const Movimentacoes = ({ match }) => {

    const data = useGet(`movimentacoes/${match.params.data}`)
   return (
      <div className='container'>
        <h1>Movimentações</h1>
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                { data.data &&
                    Object
                    .keys(data.data)
                    .map(movimentacao => {
                        return (
                            <tr>
                                <td>{data.data[movimentacao].descricao}</td>
                                <td>{data.data[movimentacao].valor}</td>
                            </tr>
                        )
                    })
                }
            </tbody>

        
        </table>
        <pre>{JSON.stringify(data)}</pre>
      </div>
   )
  }

  export default Movimentacoes