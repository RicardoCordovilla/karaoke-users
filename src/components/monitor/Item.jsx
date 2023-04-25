import React from 'react'
import { FaCheck as Check } from "react-icons/fa"
import { motion } from "framer-motion";


const Item = ({ numero }) => {
    return (
        <motion.div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5em'
        }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <span># {numero}</span>
            <input type="checkbox" />
        </motion.div>
    )
}

export default Item