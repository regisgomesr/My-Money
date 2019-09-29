import React from 'react'
import { Redirect } from 'react-router-dom'
import { useMovimentacaoApi } from '../../api/index'
import InfoMes from './InfoMes'
import AdicionarMovimentacao from './AdicionarMovimentacao'


const Movimentacoes = ({ match }) => {

    const { movimentacoes, salvarNovaMovimentacao, removerMovimentacao } = useMovimentacaoApi(match.params.data)

    const sleep = time => new Promise(resolve => setTimeout(resolve, time))

     const salvarMovimentacao = async(dados) => {
        
            await salvarNovaMovimentacao(dados)
            movimentacoes.refetch()
            await sleep(5000)
            // infoMes.refetch()
    }
    
    const removerMovimentacaoClick = async(id) => {
        await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`)
        movimentacoes.refetch()
        await sleep(5000)
        // infoMes.refetch()
    }

    if(movimentacoes.error === 'Permission denied'){
        return <Redirect to='/login' />
    }

   return (
      <div className='container'>
        <h1>Movimentações</h1>
        <InfoMes data={match.params.data} />
        
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                { movimentacoes.data &&
                    Object
                    .keys(movimentacoes.data)
                    .map(movimentacao => {
                        return (
                            <tr key={movimentacao}>
                                <td>{movimentacoes.data[movimentacao].descricao}</td>
                                <td>{movimentacoes.data[movimentacao].valor}</td>
                                <td className='text-right'>
                                    <button onClick={() => removerMovimentacaoClick(movimentacao)} 
                                    className="btn btn-danger">Remover</button>
                                </td>
                            </tr>
                        )
                    })
                }

                <AdicionarMovimentacao salvarNovaMovimentacao={salvarMovimentacao} />

            </tbody>

        
        </table>
      </div>
   )
  }

  export default Movimentacoes