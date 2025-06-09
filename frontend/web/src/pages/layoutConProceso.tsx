import {Outlet} from "react-router-dom";
import {ProcesoDeCompra} from "../components/procesoDeCompra.tsx";


export const LayoutConProceso = () => {



    return(
        <>
            <ProcesoDeCompra/>
            <Outlet/>
        </>
    )

}