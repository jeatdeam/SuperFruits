import {useEffect, useState, useRef} from "react";

//addProductCarrito

type Products = {
    id : number;
    idCompra : number | null;
    fruit : string;
    name : string;
    price : number;
    img : string[];
    description : string[];
}

export const useLastId = () => {
    // const [active, setActive] = useState<>("/");
    const [data, setData] = useState<Products|null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean|null>(null);
    const [trigger,setTrigger] = useState<number|null>(0);

        const fetchId = async (id) => {
            if(id === 0) return;
            const options = {
                method: "POST",
                headers : { "Content-Type": "application/json" },
                body : JSON.stringify({ id : parseInt(String(id)) })
            }
            const url = "http://localhost:3000/addProductCarrito"
            setError(false);
            setLoading(true);
            try {
                const response = await fetch(url,options);
                if(!response.ok) throw new Error("Error en la peticion")
                const result = await response.json();

                setData(result.carritoCompras);
                setLoading(false);
            } catch(err : any) {
                console.error(`Hubo un error ${err}`);
                setError(true);
            } finally{
                setLoading(false);
                setError(false);
            }

        }

        useEffect(()=>{
            // fetchId()
        },[trigger])

        const refetch = (id) => {
            // setTrigger(prev=> prev+1)
            fetchId(id)
        }


    return {data, loading, error, refetch}
}