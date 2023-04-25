import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import Cliente from './Cliente';


const Mesa = ({ users, mesa, handleRoom, handleDisconnect, handleErase }) => {
    console.log(mesa)
    console.log(users)

    // const [clientes, setClientes] = useState([
    //     { nombre: 'Ricardo', pedido: ['548', '123'] },
    //     { nombre: 'Ricardo2', pedido: ['676', '482'] }
    // ])

    const [clientes, setClientes] = useState(users)
    const [update, setUpdate] = useState(0)





    useEffect(() => {
        // console.log(users[0].mesa, mesa + '')
        // console.log(users.filter(item => item.mesa == mesa + ''))
        setClientes(users.filter(item => item?.mesa == mesa + ''))
    }, [users])



    return (
        <div className="mesaContainer">
            <span>Mesa{mesa}</span>
            <div className='mesaBx'>
                {
                    clientes &&
                    clientes?.map((cliente, index) => (
                        <Cliente
                            key={index}
                            cliente={cliente}
                            handleRoom={handleRoom}
                            handleDisconnect={handleDisconnect}
                            handleErase={handleErase}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Mesa