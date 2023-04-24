import React from 'react'
import { useState } from 'react'
import { AiFillHeart as Like } from 'react-icons/ai';

const Cancion = ({ setCanciones, canciones, cancion, setFavorites, favorites, parent, setUser, user }) => {

    const [like, setLike] = useState(parent === 'canciones' ? cancion.liked : false)


    const handleLike = (e) => {
        console.log(e.id)
        if (parent === 'favorites') {
            cancion.liked = e.checked
            setFavorites([...new Set([...favorites, cancion])])
            setLike(e.checked)
            console.log(favorites)
            e.checked && setUser({ ...user, pedidos: [...new Set([...user.pedidos, e.value])] })
        }
        if (parent === 'canciones') {
            cancion.liked = e.checked
            e.checked && setFavorites([...new Set([...favorites, cancion])])
            setCanciones([...new Set([...canciones, cancion])])
            setLike(e.checked)
        }
    }

    // todo: con un boton enviar segun se seleccione en favorites

    return (
        <tr color='#fff'>
            {/* <td>{cancion.NUMERO}</td> */}
            <td className='titulo'>{cancion.TITULO}</td>
            <td className='artista'>{cancion.ARTISTA}</td>
            {/* <td className='genero'>{cancion.GENERO}</td> */}
            <td className='genero'
                style={{ backgroundColor: '#bbb' }}
            >
                <label htmlFor={`${parent}:${cancion.NUMERO}`}>
                    <div className="like">
                        <Like color={like
                            ? '#d22'
                            : '#dee'
                        }
                            className=''
                            fontSize={'1.7rem'}
                        />
                    </div>
                </label>
                <input type="checkbox" id={`${parent}:${cancion.NUMERO}`}
                    hidden
                    value={cancion.NUMERO}
                    onClick={(e) => handleLike(e.target)}
                />
            </td>
        </tr>
    )
}

export default Cancion