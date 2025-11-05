import {useState, useEffect} from 'react'
import {useFetchDeleteAll} from "../hooks/fetchDeleteAll.tsx";
import {useCarrito} from "../contexts/carritoContext.tsx";
import {useCompleteForm} from "../zustand/useCompleteForm.tsx"
import {useValidateCompra} from "../zustand/useValidateCompra.tsx"
import {useNavigate} from 'react-router-dom'
import {useProceso} from "../contexts/procesoDeCompraContext.tsx";

export const SuccessPage = () => {
    const {fetchDelete} = useFetchDeleteAll();
    const {refetchCarrito} = useCarrito();
    const {restartForm} = useCompleteForm();
    const {statusCompra} = useValidateCompra();
    const navigate = useNavigate();
    const {setCheckFormulario} = useProceso();


    useEffect(()=>{

        const restarData = async () => {
            await fetchDelete();
            refetchCarrito();
            // restartForm();
            setCheckFormulario(false);
        }

        restarData();

    },[])


    if(!statusCompra) {
        return navigate('/');
    }

    return(
        <main className={"flex justify-center items-center"}>
            <img src="https://compraloahora.com.uy/wp-content/uploads/2021/07/Gracias-por-tu-compra.png.webp" alt=""/>
        </main>
    )
}