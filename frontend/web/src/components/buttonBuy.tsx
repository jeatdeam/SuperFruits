import {useState, useEffect, useRef, useImperativeHandle} from 'react'
import {Link} from 'react-router-dom'
import {useCarrito} from "../contexts/carritoContext.tsx";


type ButtonProps = {
    id : number;
}
type ButtonRef = {

}



export const ButtonBuy = ({id} : ButtonProps ) => {
    const {incrementCount} = useCarrito()

    const sendProduct = async () => {


        await fetchBuy(id)
    }
    const fetchBuy = async (id) => {
        const options = {
            method : 'POST',
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({id})
        }
        const url = "http://localhost:3000/addProductCarrito";
        const response = await fetch(url, options);
        if(!response.ok) throw new Error(`Error en la peticion - ${response.status} -> ${response.statusText}`);
        const result = await response.json();
        incrementCount(result.carritoCompras.length);

    }

    return(
        <Link to={"/seccion-de-pagos"}>
            <button data-id={id} onClick={sendProduct}>
                comprar
            </button>
        </Link>
    )
}