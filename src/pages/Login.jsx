import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormRegister from '../components/FormRegister'
import { useEffect } from 'react'
import { v4 as uuid } from "uuid";
import '../App.css'


const Login = () => {
    const params = useParams()
    const mesa = params.mesa
    console.log(mesa)
    const id = uuid()
    console.log(id)

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user')) navigate('/' + mesa)
    }, [mesa])

    return (
        <FormRegister mesa={mesa} />
    )
}

export default Login