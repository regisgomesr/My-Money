import React, { useState } from 'react'

import Rest from '../utils/rest'

const baseURL = 'https://mymoney-regis.firebaseio.com/'
const { useGet, usePost } = Rest(baseURL)

const Movimentacoes = ({ match }) => {

    const data = useGet(`movimentacoes/${match.params.data}`)
    const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)

    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState(0.0)

    const onChangeDescricao = evt => {
        setDescricao(evt.target.value)
    }

    const onChangeValor = evt => {
        setValor(parseFloat(evt.target.value))
    }

    const salvarMovimentacao = async() => {
        await salvar({
            descricao,
            valor
        })
        setDescricao('')
        setValor(0)
        data.refetch()
    }

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

                <tr>
                    <td><input type='text' value={descricao} onChange={onChangeDescricao} /></td>
                    <td>
                        <input type='text' value={valor} onChange={onChangeValor} />
                        <button onClick={salvarMovimentacao}>+</button>
                    </td> 
                </tr>

            </tbody>

        
        </table>
      </div>
   )
  }

  export default Movimentacoes