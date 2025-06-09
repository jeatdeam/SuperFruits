import { forwardRef } from "react";
import { useCarrito } from "../contexts/carritoContext";
import { useNavigate } from "react-router-dom";


type ButtonBuyProps = {
    id: number;
    name: string;
};

// forwardRef espera: forwardRef<refType, propsType>((props, ref) => ...)
export const ButtonBuy = forwardRef<HTMLButtonElement, ButtonBuyProps>(({ id, name }, ref) => {
    const { incrementCount } = useCarrito();
    const navigate = useNavigate();

    const sendProduct = async () => {
        try {
            const response = await fetch("http://localhost:3000/addProductCarrito", {
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
        <button ref={ref} data-id={id} data-name={name} onClick={sendProduct}>
            Comprar
        </button>
    );
});


