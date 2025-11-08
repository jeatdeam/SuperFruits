import express from 'express';
import type {Request, Response} from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import taskControllers from './controllers/taskControllers.ts';
// import { formulario } from './services/generatePDF.ts';

console.log('🟢 app.ts está iniciando...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World from Node.js + TypeScript!');
});


// console.log("🟡 Claves de taskControllers:", Object.keys(taskControllers));

app.get('/products', taskControllers.getProducts);
app.get("/get/carrito",taskControllers.getCarrito)
app.get('/payProducts', taskControllers.getPayProducts);
app.get('/infoProducts/:product', taskControllers.selectProducts);
app.get('/productDescription/:name', taskControllers.getInfoProduct);
app.get('/lastIdCarrito', taskControllers.getLastIdProducts);




app.post('/filterProductsBusqueda', taskControllers.busquedaProducts);
app.post('/api/crear-sesion', taskControllers.crearSesion)
app.post('/datosPago', taskControllers.generarSesion);
app.post('/emailVerify', taskControllers.validateEmail)
app.post('/typeProduct', taskControllers.typeProduct);
app.post('/addProductCarrito', taskControllers.addProductCarrito);
app.post('/formulario', taskControllers.formulario);
app.post('/dataClient', taskControllers.dataClient);

app.delete('/deleteProduct', taskControllers.deleteProduct);
app.delete('/deleteGroup', taskControllers.deleteGroup);
app.delete('/deleteAllProducts', taskControllers.deleteAllProducts);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
