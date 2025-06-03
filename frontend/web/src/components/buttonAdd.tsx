import {useState, useEffect, useRef, forwardRef, useImperativeHandle} from "react";
import {useCarrito} from "../contexts/carritoContext.tsx"

type PropsButton = {
    id: number,
}
type RefButton = {
    // addCarrito: () => void,
}


export const ButtonAdd = forwardRef<RefButton, PropsButton>(({id}, ref) => {
    const {incrementCount} = useCarrito()
    const sendProduct = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        // const idProduct = e.target.dataset.id

        await fetchAdd(id);

    }
    useEffect(() => {
        // console.log('el id es -> ', id)
    }, [id])
    const fetchAdd = async (id) => {
        // console.log("aqui esta el id", id)
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id})
        }
        try {
            const response = await fetch('http://localhost:3000/addProductCarrito', options);
            if (!response.ok) throw new Error(`Error al agregar el producto - type error -> ${response.status} : ${response.statusText}`);
            const result = await response.json();
            //añadir al panel del carrito
            incrementCount(result.carritoCompras.length);
            // console.log(result.message)

        } catch (error) {
            if (error instanceof Error) {
                console.log("errorMessage -> ", error.message)
                console.log("errorName -> ", error.name)
                console.log("errorStack -> ", error.stack)
            }
        } finally {

        }

    }


    useImperativeHandle(ref, () => ({
        // addCarrito : sendProduct,
    }))


    return (
        <button data-id={id} onClick={sendProduct}>Añadir al carrito</button>
    )
})