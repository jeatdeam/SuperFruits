import { forwardRef } from "react";
import { useCarrito } from "../../contexts/carritoContext.tsx";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";

type ButtonBuyProps = {
    id: string;
    name: string;
};

export const ButtonBuy = forwardRef<HTMLButtonElement, ButtonBuyProps>(({ id, name }, ref) => {
    const { incrementCount } = useCarrito();
    const navigate = useNavigate();
    const [flicked, setFlicked] = useState<boolean>(false);

    const sendProduct = async () => {
        setFlicked(true)
        try {
            const response = await fetch("http://localhost:4000/addProductCarrito", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok)
                throw new Error(`Error ${response.status}: ${response.statusText}`);

            const result = await response.json();
            incrementCount(result.carritoCompras.length);

            navigate("/seccion-de-pagos");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onAnimationEnd={()=>setFlicked(false)} className={`${flicked ? "showButton" :""} text-[14px] shadow-shadowElement h-[35px] p-[2.5px] rounded-[8px] w-[85px] leading-none`} ref={ref} data-id={id} data-name={name} onClick={sendProduct}>
            Comprar
        </button>
    );
});


