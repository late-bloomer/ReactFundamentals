import React, { useContext } from 'react'
import { ColorContext } from './App'

export default function Details(props){
    let mycontextcolor = useContext(ColorContext) //for getting context use in parent
    return(
        <div style={{ color: mycontextcolor, fontSize: '60px' }}>Congrates You are inside details component...</div>
    )
}