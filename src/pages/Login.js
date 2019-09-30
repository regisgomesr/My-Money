import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { usePost } from '../utils/rest'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDIiXf_P5wPXq1aqeLsRnxWcWZES04WzmI'

const Login = () => {
    
    const [postData, signin] = usePost(url)
    const [logado, setLogado] = useState(false)

    useEffect(() => {
        
        if(Object.keys(postData.data).length > 0) {
            localStorage.setItem('token', postData.data.idToken)
            window.location.reload()
        }
    }, [postData])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            setLogado(true)
        }
    })

    const login = async() => {
        await signin({
            email: 'regisgomesr@gmail.com',
	        password: 'abc123',
	        returnSecureToken: true
        })
    }

    if(logado) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <h1>Login</h1>
            {JSON.stringify(postData)}
            <button onClick={login}>Login</button>
        </div>
    )
}
export default Login