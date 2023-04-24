import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormRegister from '../components/FormRegister'
import Canciones from '../components/Canciones'
import Home from './Home'
import { useEffect } from 'react'


const Login = () => {
    const params = useParams()
    const mesa = params.mesa
    console.log(mesa)

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user')) navigate('/' + mesa)
    }, [mesa])

    return (
        <FormRegister mesa={mesa} />
    )
}

export default Login