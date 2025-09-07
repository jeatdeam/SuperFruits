import {useState, useEffect} from 'react'
import {Products} from '../components/headerComponents/searchIcon'


// export type Products = {
//     id : number;
//     idCompra : number | null;
//     fruit : string;
//     name : string;
//     price : number;
//     img : string[];
//     description : string[];
// }

export const useGetProducts = () => {

    const [products, setProducts] = useState<[string,Products[]][]|null>(null)
    const [fruits, setFruits] = useState<([string,Products[]])[]>([])
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(()=>{
        // console.log(products,'aqui estan los products del fetch')
    },[products])

    useEffect(()=>{

        const fetchGetProducts = async () => {
            try{
                setError(false)
                setLoading(true)
                console.log('cuack cuack 1?')
                const url = "http://localhost:4000/products"
                const response = await fetch(url);
                if(!response.ok) throw new Error(`Hubo un error en la peticion | ${response.status} - ${response.statusText}`);
                const result = await response.json()
                // console.log([...result.mapProducts])
                setProducts([...result.mapProducts]);

                setLoading(false);

            }catch(error){
                setError(true)
                setLoading(false)
                console.error(error.message)
            }finally{
                setLoading(false)
            }

        }
        fetchGetProducts();

    },[])

    return {products, fruits}


}