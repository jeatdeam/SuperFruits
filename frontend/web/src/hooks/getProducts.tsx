import {useState, useEffect} from 'react'



export type Products = {
    id : number;
    idCompra : number | null;
    fruit : string;
    name : string;
    price : number;
    img : string[];
    description : string[];
}

export const useGetProducts = () => {

    const [products, setProducts] = useState<(Products|null)[]>([])
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
                const url = "http://localhost:3000/products"
                const response = await fetch(url);
                if(!response.ok) throw new Error(`Hubo un error en la peticion | ${response.status} - ${response.statusText}`);
                const result = await response.json()

                const map = new Map<string,Products[]>()

                result.products.forEach((el,index)=>{

                    if(map.has(el.fruit)){
                        map.get(el.fruit)!.push(el);
                    }else{
                        map.set(el.fruit,[el])
                    }
                })

                setFruits([...map])

                // console.log(map,'map gaaaaaaaaaa')

                result && setProducts(result.products)
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