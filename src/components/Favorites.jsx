import React, { useState } from 'react'
import Cancion from './Cancion'
import { useEffect } from 'react'
import { motion } from "framer-motion"
import { AiFillHeart as Like } from 'react-icons/ai';

import io from 'socket.io-client'
// const socket = io('http://localhost:3500')
const socket = io('https://socketkaraoke-production.up.railway.app/')





const Favorites = ({ setFavorites, favorites }) => {

    const [connected, setConnected] = useState(localStorage.getItem('connected'))

    const [message, setMessage] = useState('')
    const [displayMessage, setDisplayMessage] = useState('')

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const room = localStorage.getItem('room')
    console.log(user)

    const handleSend = () => {
        console.log(user, room)
        socket.emit('mensaje', room, user)
    }

    useEffect(() => {

    }, [favorites, user])


    useEffect(() => {

        socket.on('connect', () => {
            setDisplayMessage('Estás conectado con el id: ' + socket.id)
        })
        socket.on('added', (inmessage) => {
            console.log('added:', inmessage)
            if (inmessage === user.ci) {
                setConnected(true)
            }
        })
        socket.on('deleted', (inmessage) => {
            console.log('deleted:', inmessage)

        })
        socket.on('paused', (inmessage) => {
            console.log('pasused:', inmessage)
            if (inmessage === user.ci) {
                setConnected(false)
            }
        })


    }, [message, user])

    return (
        <motion.div className='cancionesContainer'
            initial={{
                opacity: 0.5,
                left: -100
            }}
            animate={{
                opacity: 1,
                left: 0,
                transition: { duration: 0.3 }
            }}
        // exit={{ left: 300 }}
        >
            {/* {!connected && <p > Gracias, pronto te daremos acceso para solicitar tus canciones</p>} */}

            <div className="tableContainer">

                <table className='table-fill'>
                    <thead className='tableHead'>
                        <tr>
                            {/* <th>Numero</th> */}
                            <th className='titulo'>Título</th>
                            <th className='artista'>Artista</th>
                            {/* <th className='genero'>Género</th> */}
                            <th className=''><Like color='#dee' fontSize={'1.5rem'} /></th>
                        </tr>
                    </thead>
                    {
                        favorites &&
                        <tbody className='tableContainer'>
                            {
                                favorites.map(item => (
                                    <Cancion
                                        key={item.NUMERO}
                                        cancion={item}
                                        parent={'favorites'}
                                        favorites={favorites}
                                        setFavorites={setFavorites}
                                        user={user}
                                        setUser={setUser}
                                    />
                                ))
                            }
                        </tbody>
                    }
                </table>

            </div>

            <div className="btnBx">


                {!connected &&
                    <h3>
                        Muy pronto te daremos acceso para solicitar tus canciones
                    </h3>
                }
                <button
                    onClick={handleSend}
                    disabled={!connected}
                    className='submit'>Solicitar</button>
            </div>


        </motion.div>
    )
}

export default Favorites