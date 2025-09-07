import {useEffect, useRef, useState} from "react";
import {useFetchProducts} from "../../hooks/customProducts.tsx";
import {Carrito, CarritoRefs} from "./carrito.tsx";
import {useCarrito} from "../../contexts/carritoContext.tsx";

export const BagIcon = () => {
    const [validate, setValidate] = useState<boolean>(false);
    const refCarrito = useRef<CarritoRefs|null>(null);
    const refIcon = useRef<SVGSVGElement|null>(null);
    const {count} = useCarrito()

    const getInfo = () : void =>{
        setValidate(prev=>!prev)
    }

    const hideCarrito = ( e : MouseEvent) => {

        if(refIcon.current && !refCarrito.current?.carrito.contains(e.target as Node) && !refIcon.current.contains(e.target as Node) ) {
            // refCarrito.current.access();
            setValidate(false);
        }

    }

    const closeWindowCarrito = () => {
        setValidate(false);
    }

    useEffect(()=>{

        if(validate) {
            document.addEventListener('mousedown',hideCarrito);
        } else {
            document.removeEventListener('mousedown',hideCarrito);
        }
        // console.log("aqui esta el count",count)
        return () => {
            document.removeEventListener('mousedown',hideCarrito);
        }
    },[validate])


    return (
        <div className={"relative"}>
            <svg
                ref={refIcon}
                className={"rounded-full transition-all duration-500 hover:ring-2 ring-black ring-offset-[3px] hover:bg-white"}
                onClick={getInfo} onMouseDown={hideCarrito}  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                fill="#999999">
                <path
                    d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/>
            </svg>
            <Carrito ref={refCarrito} validate={validate} closeWindow={closeWindowCarrito}/>
            <div className={`${  count ? "opacity-100" : "opacity-0"} itemCount transition-element size-[20px]  rounded-full absolute top-[-90%] left-[50%] translate-x-[-50%] center-flex text-[10px]`}>
                {count}
            </div>
        </div>
    )
}