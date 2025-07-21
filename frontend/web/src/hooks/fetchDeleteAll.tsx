import {useState, useEffect, useRef} from "react";



type DataReceived = {
    carritoCompras : [];
    message: string
}

export const useFetchDeleteAll = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<DataReceived|null>(null);


    // useEffect(()=>{


        const fetchDelete = async () => {
            const url = "http://localhost:3000/deleteAllProducts";
            const options = {
                method: "DELETE",
                headers: {"Content-Type" : "application/json"},
                // body: JSON.stringify(),
            }
            setLoading(true);
            try{
                const response = await fetch(url,options);
                if(!response.ok) throw new Error(`Error en la peticion ${response.status} -> ${response.statusText}`);

                const result = await response.json()
                setData(result)
                console.log("cuack fettAll->",result)

            }catch(error){
                setError(true)
                console.error(error.message)
            }finally{
                setLoading(false)
            }

        }

        // fetchDelete()

    // },[])

    useEffect(()=>{
        // setData(data)
        console.log(data)
    },[data])

    return {loading, error, data, fetchDelete}
}