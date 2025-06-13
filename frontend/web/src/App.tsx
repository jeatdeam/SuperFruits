import { FadeInSection } from './pages/FadeInSection.tsx';
import {Header} from "./pages/header.tsx"
import {Footer} from "./pages/footer.tsx"
import {PayProducts} from "./pages/payProducts.tsx";
import {InfoProduct} from "./pages/infoProduct.tsx";
import {Index} from "./pages/index.tsx"
import {ProductsCards}  from "./pages/fruitProducts.tsx"
import {Routes, Route} from 'react-router-dom'
import {NewHeader} from "./pages/newHeader.tsx";
import {CarritoProvider} from "./contexts/carritoContext.tsx"
import {ProcesoCompraProvider} from "./contexts/procesoDeCompraContext.tsx";
import {ProcesoDeCompra} from "./components/procesoDeCompra.tsx";

import './App.css';
import {LayoutConProceso} from "./pages/layoutConProceso.tsx";


function App() {

    return (
        <>
            <CarritoProvider>
                <ProcesoCompraProvider>
                    <Header/>
                    {/*<NewHeader/>*/}
                    <Routes>
                        <Route path="/" element={<Index/>}/>
                        <Route element={<LayoutConProceso/>}>
                            <Route path="/:product/" element={<ProductsCards/>}/>
                            <Route path="/:product/:name" element={<InfoProduct/>} />
                            <Route path="/seccion-de-pagos" element={<PayProducts/>}/>
                        </Route>
                    </Routes>
                </ProcesoCompraProvider>
            </CarritoProvider>
            <Footer/>

        </>

    );
}

export default App;
