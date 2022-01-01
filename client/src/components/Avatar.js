import React from 'react'
import { useSelector } from 'react-redux'

const Avartar = ({src, size}) => {
    const {theme} = useSelector(state => state)
    return (
        <img src={src} alt="avartar" className={size}
        style={{filter: `${theme?'invert(1)':'invert(0)'}`}}/>        
    )
}


export default Avartar
