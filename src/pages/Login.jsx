import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormRegister from '../components/FormRegister'
import { useEffect } from 'react'
import '../App.css'


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