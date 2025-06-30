
import {Index} from "./pages/index.tsx"
import {ContainerSearch} from "./components/headerComponents/containerSearch.tsx";
import {Menu} from "./components/headerComponents/menu.tsx";
import {Header} from "./components/headerComponents/header.tsx";
import {Footer} from "./components/footerComponents/footer.tsx";
import {BoxSearch} from "./components/headerComponents/searchIcon.tsx";
import {Modal} from "./pages/modal.tsx"
import {ProductsCards}  from "./pages/fruitProducts.tsx"
import {Routes, Route} from 'react-router-dom'
import {NewHeader} from "./pages/newHeader.tsx";
import {CarritoProvider} from "./contexts/carritoContext.tsx"
import {ProcesoCompraProvider} from "./contexts/procesoDeCompraContext.tsx";
import {ProcesoDeCompra} from "./components/bodyComponents/procesoDeCompra.tsx";

import './App.css';
import {LayoutConProceso} from "./pages/layoutConProceso.tsx";

import {useActive} from './zustand/useActiveStore.tsx'



function App() {

    return (
        <>
                <CarritoProvider>
                    <ProcesoCompraProvider>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Index/>}/>
            {/*             <Route element={<LayoutConProceso/>}>*/}
            {/*                 <Route path="/:product/" element={<ProductsCards/>}/>*/}
            {/*                 <Route path="/:product/:name" element={<InfoProduct/>} />*/}
            {/*                 <Route path="/seccion-de-pagos" element={<PayProducts/>}/>*/}
            {/*             </Route>*/}
                        </Routes>
                        <Footer/>
                    </ProcesoCompraProvider>
                </CarritoProvider>
                {/*<Modal/>*/}
                <ContainerSearch/>
                <Menu/>
        </>

    );
}



export default App;
