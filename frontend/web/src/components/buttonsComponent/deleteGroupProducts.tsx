import {useCarrito} from "../../contexts/carritoContext.tsx";
import {useProceso} from "../../contexts/procesoDeCompraContext.tsx";

export const DeleteGroup = ({id, refetch}:{id:string, refetch: () => void}) => {

    const {incrementCount} = useCarrito()
    const {setCheckFormulario} = useProceso()

    const removeGroup = () => {

        const options = {
            method: 'DELETE',
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({id}),
        }
        const url = "http://localhost:3000/deleteGroup";

        const fetchRemove =  async () => {
            try{
                const response = await fetch(url,options);
                if(!response.ok) throw new Error(`error en la peticion | ${response.status} - ${response.statusText}`);
                const result = await response.json();

                result.carritoCompras && incrementCount(result.carritoCompras?.length)
                result.carritoCompras && refetch()
                !result.carritoCompras.length && setCheckFormulario(false)

            }catch(error){
                console.error(error.message)

            }finally{

            }



        }
        fetchRemove();
    }

    return (
        <svg onClick={removeGroup} className={"absolute top-[5px] right-[5px] bg-white size-[27.5px] rounded-full"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path className={"pointer-events-none"}
                  d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
    )

}
