import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import taskControllers from './controllers/taskControllers';

const app = express();
const port = 3000;

// Middlewares globales
app.use(cors()); // Permite solicitudes desde otros orígenes
app.use(morgan('dev')); // Muestra logs de peticiones HTTP
app.use(helmet()); // Añade seguridad a las cabeceras HTTP
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Permite leer JSON en los body requests

// Puedes usar 'path' si quieres servir archivos estáticos
// Ejemplo: Servir archivos desde una carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.send('Hello World from Node.js + TypeScript!');
});
app.get('/products', taskControllers.getProducts)
app.get('/payProducts', taskControllers.getPayProducts);
app.get('/infoProducts/:product', taskControllers.selectProducts);
app.get('/productDescription/:name', taskControllers.getInfoProduct)
app.get('/lastIdCarrito',taskControllers.getLastIdProducts)


app.post('/filterProducts',taskControllers.busquedaProducts)
app.post('/addProductCarrito', taskControllers.addProductCarrito)
app.post("/formulario", taskControllers.formulario)

app.delete("/deleteProduct", taskControllers.deleteProduct)
app.delete("/deleteGroup", taskControllers.deleteGroup)
app.delete("/deleteAllProducts", taskControllers.deleteAllProducts);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
