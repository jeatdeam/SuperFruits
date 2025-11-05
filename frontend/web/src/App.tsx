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
import {InfoProduct} from "./pages/infoProduct.tsx";
import {PayProducts} from "./pages/payProducts.tsx";
import {IziPayForm} from "./pages/iziPayForm.tsx"
import {NotFound} from "./pages/notFound.tsx";

import './App.css';
import {LayoutConProceso} from "./pages/layoutConProceso.tsx";

import {useActive} from './zustand/useActiveStore.tsx'
import {ErrorPage} from './pages/comprasError.tsx'
import {SuccessPage} from './pages/compraSuccess.tsx'


function App() {

    return (
        <>
                <CarritoProvider>
                    <ProcesoCompraProvider>
                        <Header/>
                        <Routes>
                         <Route path="/" element={<Index/>}/>
                         <Route element={<LayoutConProceso/>}>
                             <Route path="/:product" element={<ProductsCards/>}/>
                             <Route path="/:product/:name" element={<InfoProduct/>} />
                             <Route path="/seccion-de-pagos" element={<PayProducts/>}/>
                             <Route path="/pagoProducts" element={<IziPayForm/>}/>
                             <Route path="/errorPage" element={<ErrorPage/>}/>
                             <Route path="/successPage" element={<SuccessPage/>}/>
                         </Route>
                            {/* ruta de fallback */}
                            <Route path={"*"} element={<NotFound/>}></Route>
                        </Routes>
                        <Footer/>
                    </ProcesoCompraProvider>
                </CarritoProvider>

                <ContainerSearch/>
                <Menu/>
        </>

    );
}



export default App;
