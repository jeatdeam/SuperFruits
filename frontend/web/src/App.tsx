import { FadeInSection } from './pages/FadeInSection.tsx';
import {Header} from "./pages/header.tsx"
import {Footer} from "./pages/footer.tsx"
import {PayProducts} from "./pages/payProducts.tsx";
import {InfoProduct} from "./pages/infoProduct.tsx";
import {Index} from "./pages/index.tsx"
import {ProductsCards}  from "./pages/productDetails.tsx"
import {Routes, Route} from 'react-router-dom'
import {NewHeader} from "./pages/newHeader.tsx";
import {CarritoProvider} from "./contexts/carritoContext.tsx"

import './App.css';


function App() {

    return (
        <>
            <CarritoProvider>
                <Header/>
                <NewHeader/>
                <Routes>
                    <Route path="/" element={<Index/>}/>
                    {/*<Route path="/cuacksito" element={<ProductsCards/>}/>*/}
                    <Route path="/:product/" element={<ProductsCards/>}/>
                    <Route path="/:product/:name" element={<InfoProduct/>} />
                    <Route path="/seccion-de-pagos" element={<PayProducts/>}/>
                </Routes>
            </CarritoProvider>
            <Footer/>
        </>

    );
}

export default App;
