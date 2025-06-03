import {useContext, createContext, useState, useEffect} from 'react'
import * as url from "node:url";


const CarritoContext = createContext(null);



const useGetProducts =  ()=> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<number|null>(null);



    useEffect( ()=>{
        const fetchLength = async () => {
            const options = {
                method: 'GET',
                headers : { "Content-Type": "application/json" },
            }
            try{
                const response = await fetch("http://localhost:3000/products", options);
                if(!response.ok) throw new Error(`Error en la peticion - ${response.status} -> ${response.statusText}`);
                const result = await response.json()

                setData(result.carritoCompras.length)
            }catch(error){
                console.error(error.message)
            }finally{
                console.log('fetch terminado')
            }
        }

        fetchLength()


    },[])


    return {data};
}




export const CarritoProvider = ({children}) => {
    const {data} = useGetProducts();
    const [count, setCount] = useState<number>(data);

    useEffect(()=>{
        console.log(data,"<-1")
        console.log(count,"<-count 1")
        setCount(data)
        console.log(count,"<-count 2")
        console.log(data,"<-2")
    },[data])

    const incrementCount = (value) => {
        setCount(value);
        console.log('si hemos llegado aqui')
        console.log(count)
    }

    return(
        <CarritoContext.Provider value = {{count, incrementCount}}>
            {children}
        </CarritoContext.Provider>
    )

}

export const useCarrito = () => {
    const context = useContext(CarritoContext);

    if(!context) throw new Error('useCarrito debe usarse dentro de un CarritoProvider')

    return context
}
