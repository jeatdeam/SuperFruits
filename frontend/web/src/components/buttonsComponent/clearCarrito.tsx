import {useState, useEffect, useRef} from "react";
import {useFetchDeleteAll} from "../../hooks/fetchDeleteAll.tsx";
import {useCarrito} from "../../contexts/carritoContext.tsx";
import {useGetCarrito} from "../../hooks/getCarritoMap.tsx";
import {useProceso} from "../../contexts/procesoDeCompraContext.tsx";

export const ClearCarrito = ({refetch}:{refetch: () => void}) => {
    const {loading, error, data, fetchDelete} = useFetchDeleteAll();
    const {incrementCount} = useCarrito();
    const {setCheckFormulario} = useProceso()
    // const {refetch} = useGetCarrito();
    //
    //
    // useEffect(()=>{
    //
    // },[data])

    useEffect(()=>{
        console.log('el data inicial es->',data)
    },[data])
    const deleteCarrito = async () => {
        await fetchDelete();
        setCheckFormulario(false);
        incrementCount(data?.carritoCompras.length)
        refetch()
        // console.log(data)
    }


    return(
        <button className={"showItem"} onClick={deleteCarrito} >borrar carrito</button>
    )
}