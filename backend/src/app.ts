const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const taskControllers = require('./controllers/taskControllers');


import {formulario} from './services/generatePDF'

console.log('🟢 app.ts está iniciando...');

const app = express();
const port = 3000;

module.exports = app;

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

console.log(__dirname)

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
import type { Request, Response } from 'express';

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World from Node.js + TypeScript!');
});

app.get('/products', taskControllers.getProducts);
app.get('/payProducts', taskControllers.getPayProducts);
app.get('/infoProducts/:product', taskControllers.selectProducts);
app.get('/productDescription/:name', taskControllers.getInfoProduct);
app.get('/lastIdCarrito', taskControllers.getLastIdProducts);

app.post('/filterProducts', taskControllers.busquedaProducts);
app.post('/addProductCarrito', taskControllers.addProductCarrito);
app.post('/formulario', formulario);
app.post('/dataClient', taskControllers.dataClient);

app.delete('/deleteProduct', taskControllers.deleteProduct);
app.delete('/deleteGroup', taskControllers.deleteGroup);
app.delete('/deleteAllProducts', taskControllers.deleteAllProducts);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
