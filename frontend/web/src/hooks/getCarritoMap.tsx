import {useEffect, useState} from "react";

type Productos = {
    id: number;
    idCompra: number|null;
    fruit: string;
    name: string;
    price: number;
    img : string[];
    description: string[];
}

type ResponseData = {
    flattenedProducts: [number, Productos[]][];
}

export const useGetCarrito = () => {

    const [data, setData]   = useState<ResponseData|null>(null);
    const [error, setError]   = useState<boolean>(false);
    const [loading, setLoading]   = useState<boolean>(false);



    const fetchCarrito = async () => {
        const options = {
            method : 'GET',
            headers : {"Content-Type" : "application/json"},
        }
        const url = "http://localhost:3000/payProducts";

        setLoading(true)
        try{
            const response = await fetch(url,options);
            if(!response.ok) throw new Error(`error en la peticion | ${response.status} -> ${response.statusText}`)
            const result = await response.json()

            setData(result)
            setLoading(false);
            console.log('si se esta haciendo fetch')
            // console.log('si se esta haciendo el fetch')
        }catch(error){
            console.error(error.message)
            setError(true);
            setLoading(false)
        }finally{
            setLoading(false);
        }

    }

    useEffect(()=>{
        fetchCarrito();
    },[])

    return {data, refetch: fetchCarrito};
}