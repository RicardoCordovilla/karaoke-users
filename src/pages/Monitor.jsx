import { useEffect, useState } from 'react'
import '../Monitor.css'
import { motion } from "framer-motion";
import Mesa from '../components/monitor/Mesa';



import io from 'socket.io-client'
// const socket = io('http://localhost:3500')
const socket = io('https://socketkaraoke-production.up.railway.app/')

// const users = JSON.parse(localStorage.getItem('users')) || []
// console.log(users)

function App() {
    const [message, setMessage] = useState('')
    const [displayMessage, setDisplayMessage] = useState()
    const [mesas, setMesas] = useState([1, 2, 3, 4])
    const [pedidos, setPedidos] = useState([{ name: '', pedido: '' }])
    const [room, setRoom] = useState('')
    // const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [{ name: '', ci: '', pedidos: [''] }])
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
    // const [users, setUsers] = useState([])

    console.log(localStorage.getItem('users'))




    const handleEnable = () => {
        // socket.emit('enable', user, room)
    }

    const handleRoom = (user) => {
        console.log(user)
        socket.emit('join', user.ci)

    }
    const handleDisconnect = (user) => {
        console.log(user)
        socket.emit('djoin', user.ci)

    }

    const handleSend = (e) => {
        e.preventDefault()
        // console.log(message)
        socket.emit('mensaje', message, room)
    }

    const handleErase = (user) => {
        console.log(user)
        socket.emit('erase', user.ci)
        let arr = users.filter(item => item?.ci !== user?.ci)
        console.log(arr)
        localStorage.setItem('users', JSON.stringify(arr))
        setUsers(arr)
    }

    useEffect(() => {

        socket.on('connect', () => {
            setDisplayMessage('Estás conectado con el id: ' + socket.id)
        })

        socket.on('add', (user) => {
            console.log(user)
            console.log(users)
            users.length > 1 && users.forEach(item => {
                if (item?.ci !== user?.ci) {
                    setUsers([...users, user])
                    localStorage.setItem('users', JSON.stringify([...users, user]))
                }
            })

            if (users.length < 1) {
                setUsers([...users, user])
                localStorage.setItem('users', JSON.stringify([...users, user]))
            }
        })


        socket.on('server-receive-message', (user) => {
            console.log(user)
            setDisplayMessage('mesa: ' + user?.mesa + ' dice: ' + JSON.stringify(user?.pedidos))

            let array = [user, ...users]
            console.log(array)
            let hash = {};
            array = array.filter(o => hash[o?.ci] ? false : hash[o?.ci] = true)
            console.log(array)

            setUsers(array)
            localStorage.setItem('users', JSON.stringify(array))

            // if (message === 'disconnect') socket.disconnect()
            // if (message === 'connect') socket.connect()
        })

        socket.on('connect_error', err => setDisplayMessage(err))

        return () => {
            socket.off('add')
        }

    }, [users, displayMessage])



    return (
        <div className="App">
            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >Monitor</motion.h3>
            <motion.div className="mesasContainer">

                {
                    mesas.map((mesa, index) => (
                        <Mesa
                            key={index}
                            users={users}
                            mesa={mesa}
                            handleRoom={handleRoom}
                            handleDisconnect={handleDisconnect}
                            handleErase={handleErase}
                        />
                    ))
                }



            </motion.div>
        </div>
    )
}

export default App
