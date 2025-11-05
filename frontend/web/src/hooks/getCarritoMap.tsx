import {useEffect, useState} from "react";
import {Products} from "../components/headerComponents/searchIcon"


export const useGetCarrito = () => {

    const [data, setData]   = useState<Products[]|null>(null);
    const [error, setError]   = useState<boolean>(false);
    const [loading, setLoading]   = useState<boolean>(false);



    const fetchCarrito = async () => {
        const options = {
            method : 'GET',
            headers : {"Content-Type" : "application/json"},
        }
        const url = "http://localhost:4000/get/carrito";

        setLoading(true)
        try{
            // console.log('vamos a intentar el fetch')
            const response = await fetch(url,options);
            if(!response.ok) throw new Error(`error en la peticion | ${response.status} -> ${response.statusText}`)
            const result = await response.json()

            // console.log(result)
            setData(result.carritoCompras)
            console.log('aqui esta el nuevo array de productos -> ',result.carritoCompras)
            setLoading(false);
        }catch(error){
            if (error instanceof Error) {
                console.error(error.message);
            }
            setError(true);
            setLoading(false)
        }finally{
            setLoading(false);
        }

    }

    useEffect(()=>{
        fetchCarrito();
    },[])
    useEffect(()=>{
        // console.log([data?.flattenedProducts]);
    },[data])

    return {data, refetch: fetchCarrito};
}