import {useState, useEffect, useRef, forwardRef, useImperativeHandle} from "react";
import {useCarrito} from "../../contexts/carritoContext.tsx"
import {useGetCarrito} from "../../hooks/getCarritoMap.tsx";

type PropsButton = {
    id: string;
    activeIcon: boolean;
    refetch : () => void
}

export const ButtonAdd = forwardRef<HTMLButtonElement, PropsButton>(({id, activeIcon, refetch}, ref) => {
    const {incrementCount} = useCarrito();
    const [flicked, setFlicked] = useState<boolean>(false);

    const sendProduct = async (
        e: React.MouseEvent<SVGSVGElement> | React.MouseEvent<HTMLButtonElement>
    ) => {
        setFlicked(true);
        await fetchAdd(id);
    };

    const fetchAdd = async (id : string) => {
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id})
        }
        try {
            const response = await fetch('http://localhost:4000/addProductCarrito', options);
            if (!response.ok) throw new Error(`Error al agregar el producto - type error -> ${response.status} : ${response.statusText}`);
            const result = await response.json();
            incrementCount(result.carritoCompras?.length);
            // result.carritoCompras?.length && refetch();
            if(result.carritoCompras?.length) {
                console.log('-----si estamos haciendo refetch----')
                refetch()
                console.log('-----estamos saliendo del refetch----')
            }

        } catch (error) {
            if (error instanceof Error) {
                console.log("errorMessage -> ", error.message)
                console.log("errorName -> ", error.name)
                console.log("errorStack -> ", error.stack)
            }
        } finally {

        }

    }

    return (
       activeIcon ?
           <svg onClick={sendProduct} onAnimationEnd={()=> setFlicked(false)} className={`hover:shadow-[0_0_3.5px_rgba(0,0,0,1)] ${ flicked ? "showButton" : "" } hover:bg-white size-[25px] rounded-full transition-all duration-500 ease-in-out`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
               <path className={"pointer-events-none"} d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
           </svg>
           :
           <button onAnimationEnd={()=>setFlicked(false)} className={`${flicked ? "showButton":""} text-[14px] shadow-shadowElement rounded-[8px] p-[2.5px] h-[35px] w-[100px] leading-none`} ref={ref} data-id={id} onClick={sendProduct}>Añadir al carrito</button>
    )
})