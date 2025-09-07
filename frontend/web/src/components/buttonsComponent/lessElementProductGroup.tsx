import {useCallback, useEffect, useRef, useState} from "react";
import {useCarrito} from "../../contexts/carritoContext.tsx";
import {useProceso} from "../../contexts/procesoDeCompraContext.tsx";


export const LessProducts = ({id, refetch}: { id: string; refetch: () => void; }) => {

    const { incrementCount } = useCarrito();
    const [flicked, setFlicked] = useState<boolean>(false);
    const {setCheckFormulario} = useProceso()

    const deleteProduct = async () => {
        setFlicked(true);
        try {
            const res = await fetch("http://localhost:4000/deleteProduct", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) throw new Error("Error al eliminar");

            const result = await res.json();
            result.carritoCompras && incrementCount(result.carritoCompras.length);
            result.carritoCompras && refetch();
            // onAnimate(); // Activa animación en el padre
            !result.carritoCompras.length && setCheckFormulario(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <svg
            onClick={deleteProduct}
            onAnimationEnd={()=> setFlicked(false)}
            className={`${flicked? "showButton" : "" } size-[25px] hover:shadow-[0_0_3.5px_rgba(0,0,0,1)] hover:bg-white rounded-full transition-all duration-500 ease-in-out`}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#999999"
        >
            <path className="pointer-events-none" d="M200-440v-80h560v80H200Z" />
        </svg>
    );
};
