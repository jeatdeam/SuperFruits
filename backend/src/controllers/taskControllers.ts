import { Request, Response } from "express";
import {PrismaClient} from '@prisma/client'

import puppeteer from "puppeteer";
import pug from "pug";
import nodemailer, { TransportOptions } from "nodemailer";
import dotenv from "dotenv";
// import app from "../app"; // sin .ts al final (TS lo resuelve)


const dataBase = new PrismaClient();


dotenv.config();

import {ProductStatus, Prisma} from '@prisma/client'

export type Products = {
    id_product : string;
    price_product : Prisma.Decimal;
    stock_product : number;
    status_product : ProductStatus;
    name_product : string;
    title_product : string;
    tratamiento_product : string[];
    descuento_product: number;
    img_product : string[];
    detalles_product : string[];
    caracteristicas_product : string[];
    calificacion_client : number;
    type_fruit : string;
}

export let carritoCompras : Products[] = [

]

const busquedaProducts = async ( req : Request, res: Response) => {
    // console.log('el texto reciido es ->',[...req.body].replace(/\s/,""))
    const {txt} = req.body;
    console.log( {txt} );
    const value = txt.replace(/\s+/g," ").trim().split(' '); //txt.trim().split(/\s+/)
    console.log('cuack->',value)

    const productosFilter = await dataBase.products.findMany({
        'where': {
            AND : value.map((word:string)=>({
                name_product: {
                    contains: word,
                    mode: 'insensitive'
                }
            }))
        }
    })
    console.log(productosFilter)
    productosFilter.length && res.status(200).json({message: 'si hay coincidencias de busqueda', productosFilter})
    !productosFilter.length && res.status(200).json({message: 'no hay coincidencias de busqueda', productosFilter})
}

const selectProducts = async ( req : Request, res : Response)  => {
    // console.log('cuack 0->',req.params)
    const {product} = req.params;
    //
    const extraerProducts = await dataBase.products.findMany({
        "where": {
            type_fruit : product.toLowerCase()
        }
    })
    // console.log(extraerProducts)

    res.status(200).json({message: 'si hay coincidencias', extraerProducts});

}

const getInfoProduct =  async (req: Request, res: Response)  => {

    const { name } = req.params;
    const realName = name.toLowerCase().replace(/(-)+/g," ")
    console.log("aqui esta el name -> ",realName)

    const productChosen = await dataBase.products.findFirst({
        where: {
            name_product: realName
        }
    })

    res.status(200).json({message: 'si hay coincidencia', productChosen})

    // console.log( 'gaaaaaaaa -> ',productChosen);


};


const getProducts = async (req: Request, res: Response) => {

    const catalogo_fruits = await dataBase.products.findMany()
    const mapProducts = new Map<string, Products[]>();

    catalogo_fruits.forEach((el, index)=> {

        if(mapProducts.has(el.type_fruit!)) {
            mapProducts.get(el.type_fruit!)!.push(el)
        } else {
            mapProducts.set(el.type_fruit!, [el])
        }

    })

    res.status(200).json({message: 'tipos de productos entregados correctamente', mapProducts : [...mapProducts]})

    // console.log('aqui esta el mapppp->',[...mapProducts])

}

const getCarrito = async (req: Request, res: Response) => {



    res.status(200).json({message: 'carrito entregado con exito', carritoCompras})

}


const addProductCarrito = async ( req : Request, res : Response) => {
    // console.log("POST /addProductCarrito recibida con body:", req.body);
        const {id} = req.body;
        console.log('aqui esta el id ->', id )
        const findProduct = await dataBase.products.findFirst({
            'where': {
                id_product : id
            }
        })
        findProduct && carritoCompras.push(findProduct)
        console.log(findProduct)
        console.log("aqui esta el length ->",carritoCompras.length)
    //
    res.status(200).json({message: 'enviando todo el carrito de compras', carritoCompras})
    //     const findProduct = products.find( el=> el.id === parseInt(id) );
    //     if(!findProduct)  res.status(404).json({ message: `El producto con el id-${id} no existe...`})
    //
    // if (!findProduct) {
    //     return;
    //
    // }
    // const newProduct: Products = {...findProduct}
    // newProduct.idCompra = carritoCompras.length + 1;
    // carritoCompras.push(newProduct);
    // res.status(200).json({message: 'Producto agregado con exito', carritoCompras, newProduct})
    // console.log(carritoCompras)
}




const getLastIdProducts = ( req : Request, res : Response ) => {

    const lastId = carritoCompras.length;


    // arritoCompras})

}

const getPayProducts = ( req : Request, res : Response) => {

    const mapProducts = new Map<number, Products[]>();
    // // console.log(mapProducts);
    //
    // carritoCompras.forEach((product, indice)=> {
    //
    //     if(mapProducts.has(product.id)){
    //         mapProducts.get(product.id)?.push(product)
    //     } else {
    //         mapProducts.set(product.id, [product])
    //     }
    // })
    // const flattenedProducts = [...mapProducts]
    // mapProducts && res.status(200).json({flattenedProducts})
}


const deleteProduct = (req : Request, res : Response ) => {
    // console.log('rebiendo el producto a eliminar -> ',req.body)
    const {id} = req.body;

    const mapProducts = new Map<string, Products[]>();

    for( let i = carritoCompras.length - 1; 0 <= i ; i--) {
        if(carritoCompras[i].id_product === id) {
            carritoCompras.splice(i, 1);
            break;
        }
    }

    res.status(200).json({message: `si se logro eliminar el element con id -> ${id}`,carritoCompras})

}
const deleteGroup = (req : Request, res : Response) => {
    // console.log('el id recibido es -> ', req.body)
    const {id} = req.body;
    console.log('aqui esta el id del grupo a eliminar -> ',id)
    carritoCompras = carritoCompras.filter( product=> product.id_product !== id )

    res.status(200).json({carritoCompras})

}

const deleteAllProducts = ( req : Request, res : Response) => {

    carritoCompras.length = 0;

    res.status(200).json({carritoCompras, messaje: "el carrito ha sido limpiado con exito"})
}

const dataClient = (req: Request, res: Response) => {

    const allInfo = req.body


}


const typeProduct = async (req : Request, res : Response) => {
    const {product} = req.body;

    console.log('cuacksitooo typeProduct->',product);

    const allTypeProducts = await dataBase.products.findMany({
        where: {
            type_fruit: product
        }
    })

    res.status(200).json({message: 'si hubo coincidencias', allTypeProducts})

    console.log('ehhhhh -> ',allTypeProducts);

}

const formulario = (req : Request, res : Response) => {

    const {nombre, apellido, email, phone, phoneTwo, departamento, provincia, distrito, direccion, courierDelivery, textArea,} = req.body;

    if(nombre && apellido && email && phone ) {


        setTimeout(()=>{
            res.status(200).json({message: 'los datos del correo short fueron recibidos correctament', ok: true})
        },3000)
    }

    if(departamento && provincia && distrito && direccion && courierDelivery && textArea) {


        res.status(200).json({message: 'los datos del correo completo fueron recibidos correctamente', ok: true})
    }

}

// changeStatusSpinner()
// const response = await fetch(url,options);
// if(!response.ok) throw new Error(`Error en la peticion - ${response.status} : ${response.statusText}`)
// const result = await response.json()
//
// result.ok ? setCheckFormulario(true) : setCheckFormulario(false)
// result.ok && setState(false);
// result.ok && changeStatusForm()
// changeStatusSpinner()


// nombre: valueName,
//     apellido: valueLastName,
//     email: valueEmail,
//     phone: valuePhone,
//     phoneTwo: valuePhoneTwo,
//     departamento: valueDepartamento,
//     provincia: valueProvincia,
//     distrito: valueDistrito,
//     direccion: valueDireccion,
//     courierDelivery: courier(),
//     textArea: valueTextArea,
//     carritoCompras
// } :
// {
//     nombre: valueName,
//         apellido: valueLastName,
//     email: valueEmail,
//     phone: valuePhone,
//     phoneTwo: valuePhoneTwo,
//     carritoCompras
// }
//







interface TaskControllers {
    getProducts: (req: Request, res: Response) => void;
    getPayProducts : (req: Request, res: Response) => void;
    getInfoProduct: (req: Request, res: Response) => void;
    selectProducts: (req: Request, res: Response) => void;
    getLastIdProducts: (req: Request, res: Response) => void;
    addProductCarrito: (req: Request, res: Response) => void;
    busquedaProducts: (req: Request, res: Response) => void;
    deleteProduct : (req: Request, res: Response) => void;
    deleteGroup : (req: Request, res: Response) => void;
    deleteAllProducts : (req: Request, res: Response) => void;
    formulario : (req: Request, res: Response) => void;
    dataClient : (req: Request, res: Response) => void;
    typeProduct: (req: Request, res: Response) => void;
    getCarrito: (req: Request, res: Response) => void;
}

const taskControllers: TaskControllers = {
    getProducts,
    getPayProducts,
    getInfoProduct,
    selectProducts,
    getLastIdProducts,
    addProductCarrito,
    busquedaProducts,
    deleteProduct,
    deleteGroup,
    deleteAllProducts,
    formulario,
    dataClient,
    typeProduct,
    getCarrito,
};

export default taskControllers;




