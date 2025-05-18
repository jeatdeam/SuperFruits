import {useState, useEffect, forwardRef, useRef, useImperativeHandle} from "react";
import {FormCompras} from "./formularioPago.tsx";

type CarritoProps = {
    validate : boolean | null
}
export type CarritoRefs = {
    carrito : HTMLDivElement | null;
    access : () => void;
}


export const Carrito = forwardRef<CarritoRefs,CarritoProps>( ({validate}, ref)=> {
    const containerCarrito = useRef<HTMLDivElement|null>(null);
    const [active, setActive] = useState<boolean>(validate);


    const showCarrito = () => {
        setActive(false)
    }

    useImperativeHandle(ref,()=>({
        carrito : containerCarrito.current,
        access : showCarrito,
    }))

    return(
        <div ref={containerCarrito} className={`${ validate ? " opacity-100" : "opacity-0"} translate-x-[-50%] size-[300px] bg-[pink] absolute top-[125%] left-0 transition-all duration-500 ease-in-out`}>






        </div>
    )
})
