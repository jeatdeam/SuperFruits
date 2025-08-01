import {useContext, createContext, useState, useEffect} from 'react'
import * as url from "node:url";


const CarritoContext = createContext(null);

type Products = {
    id : number;
    idCompra : number | null;
    fruit : string;
    name : string;
    price : number;
    img : string[];
    description : string[];
}

export const useGetProducts =  ()=> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<number|null>(null);
    const [carritoCompras, setCarritoCompras] = useState<Products[]>([]);


    // const

    const fetchLength = async () => {
        const options = {
            method: 'GET',
            headers : { "Content-Type": "application/json" },
        }
        try{
            const response = await fetch("http://localhost:3000/products", options);
            if(!response.ok) throw new Error(`Error en la peticion - ${response.status} -> ${response.statusText}`);
            const result = await response.json()
            setCarritoCompras(result.carritoCompras)
            console.log('aqui esta el result con carritoCompras ->', result.carritoCompras)
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
    const {data, carritoCompras} = useGetProducts();
    const [count, setCount] = useState<number>(data);

    useEffect(()=>{

        setCount(data)

    },[data])
    useEffect(()=>{
        console.log('gaaaaaaaa->', carritoCompras)
    },[carritoCompras])

    const incrementCount = (value) => {
        setCount(value);
    }

    return(
        <CarritoContext.Provider value = {{count, incrementCount, carritoCompras}}>
            {children}
        </CarritoContext.Provider>
    )

}

export const useCarrito = () => {
    const context = useContext(CarritoContext);

    if(!context) throw new Error('useCarrito debe usarse dentro de un CarritoProvider')

    return context
}
