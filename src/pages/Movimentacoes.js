import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-regis.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)

const Movimentacoes = ({ match }) => {

    const infoMes = useGet(`meses/${match.params.data}`)
    const [dataPatch, alterarMes] = usePatch(`meses/${match.params.data}`)

    const movimentacoes = useGet(`movimentacoes/${match.params.data}`)
    const [postData, salvarNovaMovimentacao] = usePost(`movimentacoes/${match.params.data}`)
    const [removeData, removerMovimentacao] = useDelete('')

    // gestao form
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')

    const onChangeDescricao = evt => {
        setDescricao(evt.target.value)
    }

    const onChangeValor = evt => {
        setValor(evt.target.value)
    }

    const sleep = time => new Promise(resolve => setTimeout(resolve, time))
    const salvarMovimentacao = async() => {
        
        if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0)
            await salvarNovaMovimentacao({
                descricao,
                valor: parseFloat(valor)
            })
            setDescricao('')
            setValor(0)
            movimentacoes.refetch()
            await sleep(5000)
            infoMes.refetch()
            
    }

    const removerMovimentacaoClick = async(id) => {
        await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`)
        movimentacoes.refetch()
        await sleep(5000)
        infoMes.refetch()
    }

    const alterarPrevisaoEntrada = (evt) => {
        alterarMes({ previsao_entrada: evt.target.value })
    }

    const alterarPrevisaoSaida = (evt) => {
        alterarMes({ previsao_saida: evt.target.value })
    }

    if(movimentacoes.error === 'Permission denied'){
        return <Redirect to='/login' />
    }

   return (
      <div className='container'>
        <h1>Movimentações</h1>
        {
            !infoMes.loading && infoMes.data && <div>
                Previsão Entrada: {infoMes.data.previsao_entrada} <input type='text' onBlur={alterarPrevisaoEntrada} /> / Previsão Saída: {infoMes.data.previsao_saida} <input type='text' onBlur={alterarPrevisaoSaida} /> <br/>
                Entradas: {infoMes.data.entradas} / Saídas: {infoMes.data.saidas}
            </div>
        }
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

                <tr>
                    <td><input type='text' value={descricao} onChange={onChangeDescricao} /></td>
                    <td><input type='text' value={valor} onChange={onChangeValor} /></td>
                    <td className='text-right'>
                        <button onClick={salvarMovimentacao} className="btn btn-primary">Adicionar</button>
                    </td> 
                </tr>

            </tbody>

        
        </table>
      </div>
   )
  }

  export default Movimentacoes