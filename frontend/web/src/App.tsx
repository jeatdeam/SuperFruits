import { FadeInSection } from './pages/FadeInSection.tsx';
import {Header} from "./pages/header.tsx"
import {Footer} from "./pages/footer.tsx"
import {PayProducts} from "./pages/payProducts.tsx";
import {InfoProduct} from "./pages/infoProduct.tsx";
import {Index} from "./pages/index.tsx"
import {ProductsCards}  from "./pages/productDetails.tsx"
import {Routes, Route} from 'react-router-dom'

import './App.css';


function App() {

    return (
        <Routes>
            {/*<Header/>*/}
            {/*<Index/>*/}
            {/*<Footer/>*/}
            <Route path="/" element={<Index/>}/>
            {/*<Route path="/cuacksito" element={<ProductsCards/>}/>*/}
            <Route path="/:product/" element={<ProductsCards/>}/>
            <Route path="/:product/:name" element={<InfoProduct/>} />
             <Route path="/productos/seccion-de-pagos" element={<PayProducts/>}/>

        </Routes>
    );
}

export default App;
