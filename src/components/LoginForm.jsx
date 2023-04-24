import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3500')
const userSocket = io('http://localhost:3500/users',
    { auth: { token: 'token-test' } }
)


const LoginForm = () => {
    const [message, setMessage] = useState('')
    const [displayMessage, setDisplayMessage] = useState()
    const [user, setUser] = useState('')
    const [room, setRoom] = useState('')
    const [connected, setConnected] = useState(false)





    const handleUser = () => {
        console.log(user)
        socket.emit('auth', user)
        setRoom(user)
        setUser(user)
    }

    const handleRoom = (room) => {
        console.log('join', room)
        // socket.emit('join', room)
    }
    const handleSend = (e) => {
        e.preventDefault()
        // console.log(message)
        socket.emit('mensaje', message, room)
    }

    useEffect(() => {

        socket.on('connect', () => {
            setDisplayMessage('Estás conectado con el id: ' + socket.id)
        })
        socket.on('server-receive-message', (message) => {
            setMessage(message)
            setDisplayMessage('Server dice: ' + message)
            if (message === 'disconnect') socket.disconnect()
            if (message === 'connect') socket.connect()
        })

        socket.on('added', (inmessage) => {
            setMessage(inmessage)
            console.log(inmessage, user)
            setConnected(inmessage == user)
            // if (inmessage == user)
            // setDisplayMessage('connected: ' + inmessage == user ?)
        })
        socket.on('deleted', (inmessage) => {
            setMessage(inmessage)
            console.log(inmessage, user)
            setConnected(!(inmessage == user))

        })

        socket.on('user', (username, room) => {
            setMessage(username)
            setDisplayMessage('user: ' + username + room)
            // socket.emit('join', room)
            // handleRoom(room)
            console.log('pedir autorizacion al servidor', username + room)
        })

        socket.on('connect_error', err => setDisplayMessage(err))



        // socket.on('socketmensaje', (data) => {
        //   console.log(data)
        // })

        // return () => {
        //   socket.off('socketmensaje')
        // }

    }, [message, user])


    return (
        <div>
            <h2>Usuario</h2>
            <div className="messagecontainer">
                <h4>Incoming message</h4>
                {connected && <h5>Conectado</h5>}
            </div>
            <form onSubmit={handleSend}>
                <div className="field">
                    <label htmlFor="">Message</label>
                    <input type="text" name="" id="" onChange={(e) => setMessage(e.target.value)} />
                    <button type='submit'>send</button>
                </div>
                <div className="field">
                    <label htmlFor="">User</label>
                    <input type="text" name="" id="" onChange={(e) => setUser(e.target.value)} />
                    <button type='button' onClick={handleUser}>user</button>
                </div>
                {/* <div className="field">
                    <label htmlFor="">room</label>
                    <input type="text" name="" id=""
                        onChange={(e) => setRoom(e.target.value)}
                        value={room}
                    />
                    <button type='button' onClick={handleRoom}>Solicitar</button>
                </div> */}

            </form>
        </div>
    )
}

export default LoginForm