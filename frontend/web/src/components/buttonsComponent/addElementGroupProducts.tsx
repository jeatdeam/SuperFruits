import {useCarrito} from "../../contexts/carritoContext.tsx";
import {RefObject} from "react";


export const AddProducts = ({id, refetch, onAnimate} : {id: number, refetch : () => void, onAnimate: () => void }) => {
    const {incrementCount} = useCarrito();

    const addCarrito = (e:MouseEvent) => {
        const idProduct = parseInt(e.target?.closest('svg').dataset.id);
        console.log(idProduct);
        const options = {
            method : 'POST',
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({id})
        }
        const url = "http://localhost:3000/addProductCarrito"
        try{
            const fetchAdd = async () => {
                const response = await fetch(url,options);
                if(!response.ok) throw new Error(`error en la peticion | ${response.status} -> ${response.statusText}`);
                const result = await response.json()

                result.carritoCompras && incrementCount(result.carritoCompras.length);
                result.carritoCompras && refetch();
                onAnimate()
            }
            fetchAdd()
        }catch(error){
            console.error(error.message)
        }finally{

        }

    }

    return (
        <svg onClick={addCarrito} className={"hover:shadow-[0_0_3.5px_rgba(0,0,0,1)] rounded-full transition-all duration-500 ease-in-out"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path className={"pointer-events-none"} d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg>
    )
}