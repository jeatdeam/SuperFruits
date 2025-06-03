import {useState, useEffect, useRef} from "react";

import {Header} from './Header';
import {Footer} from './Footer';
import {Carrito} from "./carrito.tsx";
import {useCarrito} from "../contexts/carritoContext.tsx";


type Carrito = {
    id: number;
    idCompra: number;
    fruit: string;
    name: string;
    price: number;
    img : string[];
    description: string[];
}
type Productos = {
    id: number;
    idCompra: number|null;
    fruit: string;
    name: string;
    price: number;
    img : string[];
    description: string[];
}



// type FlattenedProducts = {
//     id: number;
//     products : Productos[];
// }

type ResponseData = {
    flattenedProducts: [number, Productos[]][];
}



const useGetCarrito = () => {

    const [data, setData]   = useState<ResponseData|null>(null);
    const [error, setError]   = useState<boolean>(false);
    const [loading, setLoading]   = useState<boolean>(false);

    useEffect(()=>{
        const options = {
            method : 'GET',
            headers : {"Content-Type" : "application/json"},
        }
        const url = "http://localhost:3000/payProducts";

        setLoading(true)

        const fetchCarrito = async () => {
            try{
                const response = await fetch(url,options);
                if(!response.ok) throw new Error(`error en la peticion | ${response.status} -> ${response.statusText}`)
                const result = await response.json()

                setData(result)
                setLoading(false);
                console.log(result)
            }catch(error){
                console.error(error.message)
                setError(true);
                setLoading(false)
            }finally{
                setLoading(false);
            }

        }
        fetchCarrito();
    },[])

    return {data};
}


const LessProducts = ({id} : {id:number}) => {
    const {incrementCount} = useCarrito();


    const deleteProduct = () => {

        const options = {
            method : 'DELETE',
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({id}),
        }
        const url = "http://localhost:3000/deleteProduct";

        const fetchDelete = async () => {
            try{
                const response = await fetch(url,options);
                if(!response.ok) throw new Error(`error en la peticion | ${response.status} -> ${response.statusText}`);
                const result = await response.json();
                result.carritoCompras && incrementCount(result.carritoCompras?.length);
            }catch(error){
                console.error(error.message)
            }finally{

            }

        }
        fetchDelete()

    }

    return (
        <svg onClick={deleteProduct} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path className={"pointer-events-none"} d="M200-440v-80h560v80H200Z"/>
        </svg>
    )
}


const AddProducts = ({id} : {id: number}) => {
    const {incrementCount} = useCarrito();

    const addCarrito = (e:MouseEvent) => {
        const idProduct = parseInt(e.target?.closest('svg').dataset.id);
        console.log(idProduct);
        const options = {
            method : 'POST',
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({id})
        }
        const url = "http://localhost:3000/addProductCarrito"
        try{
            const fetchAdd = async () => {
                const response = await fetch(url,options);
                if(!response.ok) throw new Error(`error en la peticion | ${response.status} -> ${response.statusText}`);
                const result = await response.json()

                result.carritoCompras && incrementCount(result.carritoCompras.length);

            }
            fetchAdd()
        }catch(error){
            console.error(error.message)
        }finally{

        }

    }


    return (
        <svg onClick={addCarrito} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path className={"pointer-events-none"} d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg>
    )
}
const DeleteGroup = () => {


    return (
        <svg className={"absolute top-0 right-0"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path
                d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
    )

}


export const PayProducts = () => {
    const {data} = useGetCarrito();


    useEffect(() => {
        console.log('data es->', data)


    }, [])


    return (
        <main>
            {
                data?.flattenedProducts.map(([key, value], indice) => (
                    value?.length && <section className={"flex flex-col border-4 relative w-fit"} key={indice}>
                        <img className={"size-[75px]"} src={value[0].img[0]} alt=""/>
                        <h1>{value[0].name}</h1>
                        <b>{value[0].price}</b>
                        <div className={"flex"}>
                            <LessProducts id={value[0].id}/>
                            <small>count: {value.length}</small>
                            <AddProducts id={value[0].id}/>
                        </div>
                        <DeleteGroup/>
                    </section>
                    ))
                }
            </main>
    )
}