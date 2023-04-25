import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'


// const socket = io('http://localhost:3500')
const socket = io('https://socketkaraoke-production.up.railway.app/')


const FormRegister = ({ mesa }) => {

    const navigate = useNavigate()


    const [message, setMessage] = useState('')
    const [displayMessage, setDisplayMessage] = useState()
    const [user, setUser] = useState({ name: '', ci: '', mesa: mesa, pedidos: [] })
    const [connected, setConnected] = useState(false)
    const [room, setRoom] = useState('')
    const [pedidos, setPedidos] = useState([])

    const handleRegister = () => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('room', user.ci)
        console.log(user)
        socket.emit('auth', user)
        setRoom(user.ci)
        setUser(user)
        alert('Gracias, pronto podrás solicitar tus canciones')
        navigate('/' + mesa)
    }

    const handleSend = () => {
        // setUser({ ...user, pedidos: pedidos })
        console.log(user, room)
        // socket.emit('mensaje', room, user)
    }

    useEffect(() => {

        socket.on('add', () => {
            console.log('add')
        })
        socket.on('added', (inmessage) => {
            console.log(user.ci)
            setMessage(inmessage)
            // console.log(inmessage)
            // setConnected(inmessage == user.ci)
            localStorage.setItem('connected', true)
        })
        socket.on('deleted', (inmessage) => {
            setMessage(inmessage)
            console.log(inmessage, user.ci)
            setConnected(!(inmessage == user.ci))
        })

    }, [message, user, pedidos])


    return (
        <div className="reservas">
            <h4>{mesa}</h4>

            <form className='form' onSubmit={handleRegister}>
                <span>{displayMessage}</span>
                <h4>Registrarse</h4>

                <div className="input-container ic1">
                    <input id='name' type="text" className='input'
                        placeholder=''
                        required={5}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    // defaultValue={info?.nombre}
                    />
                    <label htmlFor="name" className='placeholder'>Nombre:</label>
                </div>
                <div className="input-container ic1">
                    <input id='cedula' type="tel" className='input'
                        placeholder=''
                        required={10}
                        onChange={(e) => setUser({ ...user, ci: e.target.value })}
                    // defaultValue={info?.cedula}
                    />
                    <label htmlFor="cedula" className='placeholder'>Cédula:</label>
                </div>
                {/* <div className="input-container ic1">
                    <input id='celular' type="tel" className='input'
                        placeholder=''
                        // required={10}
                        minLength={10}
                        onChange={(e) => setCelular(e.target.value)}
                        defaultValue={info?.celular}
                    />
                    <label htmlFor="cedula" className='placeholder'>Celular:</label>
                </div> */}


                <button
                    type='submit'
                    className='submit'
                // disabled={saving}
                >
                    Registrarse
                </button>


            </form>

        </div >
    )
}

export default FormRegister