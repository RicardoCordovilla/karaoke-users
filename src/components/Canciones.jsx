import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import data from '../utils/canciones.json'
import Cancion from './Cancion'
import Favorites from './Favorites'
import { AiFillHeart as Like } from 'react-icons/ai';
import { motion } from "framer-motion"


// console.log(data)

const Canciones = ({ setFavorites, favorites }) => {

    const [canciones, setCanciones] = useState()
    const [searching, setSearching] = useState(false)

    const handleSearch = (e) => {
        // console.log(e)
        setSearching(true)
        if (e.length < 5) {
            setCanciones([])
            setSearching(false)
        }
        else {
            let array =
                data.filter((item) =>
                    item.ARTISTA.toLowerCase().includes(e.toLowerCase())
                    || item.TITULO.toLowerCase().includes(e.toLowerCase())
                    // || item.GENERO.toLowerCase().includes(e.toLowerCase())
                )
            // console.log(array)
            setTimeout(() => {
                // setFavorites([...new Set([...favorites, cancion])])
                setCanciones([...new Set(array.concat(favorites))])
                setCanciones(array)
                setSearching(false)
            }, 700);
        }
    }

    const handleLike = (e, cancion) => {
        console.log(e)
        e && setFavorites([...new Set([...favorites, cancion])])


        let obj = cancion
        obj.liked = e
        console.log(obj)
        // setCanciones([...new Set([...canciones, obj])])

    }

    useEffect(() => {
        // console.log(canciones)
    }, [canciones])

    return (

        <motion.div className='cancionesContainer'
            initial={{ opacity: 0.5, left: 100 }}
            animate={{
                opacity: 1,
                left: 0,
                transition: { duration: 0.3 }
            }}
            // exit={{ left: -100 }}
        >
            <div className="input-container">
                <input type="text"
                    className='input'
                    onChange={(e) => handleSearch(e.target.value)}
                    autoCorrect={'false'}
                    autoComplete={'false'}

                />
                <label htmlFor="name" className='placeholder'>Buscar canción o artista:</label>
            </div>

            {
                searching
                && <h4>Buscando...</h4>

            }
            {!searching &&
                <div className="tableContainer">

                    <table className='table-fill'>
                        <thead className='tableHead'>
                            <tr>
                                {/* <th>Numero</th> */}
                                <th className='titulo'>Título</th>
                                <th className='artista'>Artista</th>
                                {/* <th className='genero'>Género</th> */}
                                <th className=''><Like className='' /></th>
                            </tr>
                        </thead>
                        {
                            canciones && !searching &&
                            <tbody className='tableContainer'>
                                {
                                    canciones.map(cancion => (
                                        <Cancion
                                            key={cancion.NUMERO}
                                            cancion={cancion}
                                            canciones={canciones}
                                            setCanciones={setCanciones}
                                            setFavorites={setFavorites}
                                            favorites={favorites}
                                            parent={'canciones'}
                                        />

                                    ))
                                }
                            </tbody>
                        }
                    </table>

                </div>
            }

        </motion.div>



    )
}

export default Canciones