import React, { useEffect, useState } from 'react'
import { FaCheck as Check } from "react-icons/fa"
import { GiPauseButton as Pause } from "react-icons/gi"
import { FiLogOut as Out } from "react-icons/fi"
import Item from './Item'
import { motion } from "framer-motion";


const Cliente = ({ cliente, handleRoom, handleDisconnect, handleErase }) => {
    console.log(cliente)



    useEffect(() => {
    }, [cliente])
    // const [cliente, setCliente] = useState({ nombre: 'Ricardo', pedido: ['548', '123'] })
    return (
        <motion.div className='clientContainer'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="headerCliente">
                <span
                    style={{ fontSize: '1rem' }}
                >{cliente?.name}</span>
                <div className="iconsContainer">
                    <button className="iconBx active" type='button'
                        onClick={() => handleRoom(cliente)}>
                        <Check />
                    </button>
                    <button className="iconBx"
                        type='button' onClick={() => handleDisconnect(cliente)}>
                        <Pause />
                    </button>
                    <button className="iconBx"
                        type='button' onClick={() => handleErase(cliente)}>
                        <Out />
                    </button>
                </div>
            </div>
            <div className="pedidos">
                {
                    cliente?.pedidos &&
                    cliente?.pedidos.map(item => (
                        <Item key={item} numero={item} />
                    ))
                }

            </div>
        </motion.div>
    )
}

export default Cliente