import {useState, useEffect, useRef} from "react";
import {useFetchDeleteAll} from "../../hooks/fetchDeleteAll.tsx";
import {useCarrito} from "../../contexts/carritoContext.tsx";
import {useCompleteForm} from "../../zustand/useCompleteForm.tsx";
import {useProceso} from "../../contexts/procesoDeCompraContext.tsx";
import {useProce} from "../../contexts/procesoDeCompraContext.tsx"

export const ClearCarrito = ({refetch}:{refetch: () => void}) => {
    const {data, fetchDelete} = useFetchDeleteAll();
    const {incrementCount} = useCarrito();
    const {restartForm} = useCompleteForm();
    const {setCheckFormulario} = useProceso();


    useEffect(()=> {
        // console.log('el data inicial es->',data)
    },[data])

    const deleteCarrito = async () => {
        await fetchDelete();
        incrementCount(data?.length);
        refetch();
        restartForm();
        setCheckFormulario(false);
    }


    return(
        <button className={"showItem border-2 border-gray-500 px-[5px] py-[2.5px] h-[35px] rounded-[7.5px] w-[125px] text-center font-medium"} onClick={deleteCarrito} >borrar carrito</button>
    )
}