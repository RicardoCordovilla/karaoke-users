import React, { useEffect } from 'react'
import Canciones from '../components/Canciones'
import Favorites from '../components/Favorites'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'

import io from 'socket.io-client'
// const socket = io('http://localhost:3500')
const socket = io('https://socketkaraoke-production.up.railway.app/')


const Home = () => {

    const params = useParams()
    const mesa = params.mesa
    const user = localStorage.getItem('user')

    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState(0)
    const [favorites, setFavorites] = useState([])
    const tabHeaders = ['Canciones', 'Favoritas']
    localStorage.clear()

    useEffect(() => {

        if (!user) navigate('/login/' + mesa)
        socket.emit('auth', user)


        // socket.on('connect', () => {
        //     setDisplayMessage('Estás conectado con el id: ' + socket.id)
        // })
        // socket.on('added', (inmessage) => {
        //     console.log('added:', inmessage)
        //     if (inmessage === user.ci) {
        //         setConnected(true)
        //     }
        // })
        // socket.on('deleted', (inmessage) => {
        //     console.log('deleted:', inmessage)

        // })
        // socket.on('paused', (inmessage) => {
        //     console.log('pasused:', inmessage)
        //     if (inmessage === user.ci) {
        //         setConnected(false)
        //     }
        // })

        socket.on('erased', (inmessage) => {
            console.log('erased', inmessage)
            console.log(user)
            if(inmessage===user.ci){
                localStorage.clear()
                window.location.href = 'https://safaerauio.com'
            }
        })


    }, [])



    return (
        <div>
            <div className="homHeader">
                {
                    tabHeaders.map((tab, index) => (
                        <span
                            onClick={() => setActiveTab(index)}
                            key={tab}
                            className={`homeHeaderTab
                            ${activeTab === index
                                    ? 'activeTab'
                                    : ''
                                }
                            `}
                        >{tab}</span>
                    ))
                }
            </div>
            {
                activeTab === 0 &&
                <Canciones
                    setFavorites={setFavorites}
                    favorites={favorites}
                />
            }
            {
                activeTab === 1 &&
                <Favorites
                    setFavorites={setFavorites}
                    favorites={favorites}
                />
            }


        </div >
    )
}

export default Home