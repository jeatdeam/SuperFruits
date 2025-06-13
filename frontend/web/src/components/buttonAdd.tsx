import {useState, useEffect, useRef, forwardRef, useImperativeHandle} from "react";
import {useCarrito} from "../contexts/carritoContext.tsx"
import {useGetCarrito} from "../hooks/getCarritoMap.tsx";

type PropsButton = {
    id: number;
}
type RefButton = {
    // addCarrito: () => void,
    ref : HTMLButtonElement;
}


export const ButtonAdd = forwardRef<HTMLButtonElement, PropsButton>(({id}, ref) => {
    const {incrementCount} = useCarrito()
    const {refetch} = useGetCarrito()
    const sendProduct = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        // const idProduct = e.target.dataset.id
        setFlicked(true);
        await fetchAdd(id);

    }
    useEffect(() => {
        // console.log('el id es -> ', id)
    }, [id])
    const fetchAdd = async (id) => {
        // console.log("aqui esta el id", id)
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id})
        }
        try {
            const response = await fetch('http://localhost:3000/addProductCarrito', options);
            if (!response.ok) throw new Error(`Error al agregar el producto - type error -> ${response.status} : ${response.statusText}`);
            const result = await response.json();
            //añadir al panel del carrito
            incrementCount(result.carritoCompras.length);
            // refetch()
            // console.log(result.message)

        } catch (error) {
            if (error instanceof Error) {
                console.log("errorMessage -> ", error.message)
                console.log("errorName -> ", error.name)
                console.log("errorStack -> ", error.stack)
            }
        } finally {

        }

    }



    useEffect(() => {
        // console.log('aqui esta el ref -> ',ref)
    }, []);


    const [flicked, setFlicked] = useState<boolean>(false);



    return (
        <button onAnimationEnd={()=>setFlicked(false)} className={`${flicked ? "showButton":""} text-[14px] shadow-shadowElement rounded-[8px] p-[2.5px] h-[35px] w-[100px] leading-none`} ref={ref} data-id={id} onClick={sendProduct}>Añadir al carrito</button>
    )
})