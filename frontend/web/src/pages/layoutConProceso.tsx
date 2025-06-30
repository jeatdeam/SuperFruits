import {Outlet} from "react-router-dom";
import {ProcesoDeCompra} from "../components/bodyComponents/procesoDeCompra.tsx";


export const LayoutConProceso = () => {



    return(
        <>
            <ProcesoDeCompra/>
            <Outlet/>
        </>
    )

}