import React, { useEffect } from 'react'
import { usePost } from '../utils/rest'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDIiXf_P5wPXq1aqeLsRnxWcWZES04WzmI'

const Login = () => {
    
    const [postData, signin] = usePost(url)
   
    useEffect(() => {
        //if (Object.keys(postData.data) !== null || Object.keys(postData.data) !== undefined) // if(Object.keys(postData.data).length > 0)
        
        if(Object.keys(postData.data).length > 0) {
            localStorage.setItem('token', postData.data.idToken)
        }
    }, [postData])

    const login = async() => {
        await signin({
            email: 'regisgomesr@gmail.com',
	        password: 'abc123',
	        returnSecureToken: true
        })
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