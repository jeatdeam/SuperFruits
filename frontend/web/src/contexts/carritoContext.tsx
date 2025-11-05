import {useContext, createContext, useState, useEffect} from 'react'
import * as url from "node:url";
import {Products} from "../components/headerComponents/searchIcon"

type TypeCarritoContext = {
    count: number;
    incrementCount: (value: number) => void;
    carritoCompras: Products[];
    refetchCarrito : ()=>void;
}


const CarritoContext = createContext<TypeCarritoContext|null>(null);

export const useGetProducts =  ()=> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<number>(0);
    const [carritoCompras, setCarritoCompras] = useState<Products[]>([]);

    const fetchLength = async () => {

        try{
            const response = await fetch("http://localhost:4000/get/carrito");
            if(!response.ok) throw new Error(`Error en la peticion - ${response.status} -> ${response.statusText}`);
            const result = await response.json()
            setCarritoCompras(result.carritoCompras)
            setData(result.carritoCompras.length)
        }catch(error){
            console.error(error.message)
        }finally{
            // console.log('fetch terminado')
        }
    }

    useEffect( ()=>{
        fetchLength()
    },[])

    return {data, carritoCompras,  refetchCarrito: fetchLength};
}

export const CarritoProvider = ({children}) => {
    const {data, carritoCompras, refetchCarrito} = useGetProducts();
    const [count, setCount] = useState<number>(data);

    useEffect(()=>{

        setCount(data)

    },[data])
    useEffect(()=>{
    },[carritoCompras])

    const incrementCount = (value : number) => {
        setCount(value);
    }

    return(
        <CarritoContext.Provider value = {{count, incrementCount, carritoCompras, refetchCarrito}}>
            {children}
        </CarritoContext.Provider>
    )

}

export const useCarrito = () => {
    const context = useContext(CarritoContext);

    if(!context) throw new Error('useCarrito debe usarse dentro de un CarritoProvider')

    return context
}
