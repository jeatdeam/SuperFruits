import type { Request, Response } from "express";
import {PrismaClient} from '@prisma/client'
import puppeteer from "puppeteer";
import pug from "pug";
import nodemailer from "nodemailer";
import type {TransportOptions} from 'nodemailer';
import dotenv from "dotenv";
const dataBase = new PrismaClient();
dotenv.config();
import {v4 as uuidv4} from "uuid";



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
    console.log('aqui estan los productos filtrados ->', productosFilter)
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
        // console.log('aqui esta el id ->', id )
        const findProduct = await dataBase.products.findFirst({
            'where': {
                id_product : id
            }
        })
        findProduct && carritoCompras.push(findProduct)
        // console.log(findProduct)
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

    // console.log('cuacksitooo typeProduct->',product);

    const allTypeProducts = await dataBase.products.findMany({
        where: {
            type_fruit: product
        }
    })

    res.status(200).json({message: 'si hubo coincidencias', allTypeProducts})

    // console.log('ehhhhh -> ',allTypeProducts);

}


const generateMap = (carritoCompras : Products[]) : [string, Products[]][] => {

    const map = new Map<string, Products[]>();

    carritoCompras.forEach( (el : Products, index : number) => {

        if(map.has(el.id_product)) {
            map.get(el.id_product)?.push(el);
        } else {
            map.set(el.id_product, [el]);
        }
    })

    return [...map];
}



type DataTypes = {
    nombre: string;
    apellido: string;
    email: string;
    phone: string;
    phoneTwo: string;
    departamento: string;
    provincia: string;
    distrito: string;
    direccion: string;
    courierDelivery: string;
    textArea: string;
    amount: number;
}

let sendDataClientCompra: ((args: {validate: boolean; carritoCompras: Products[]}) => void) | null = null;

type PropsSecond = {
    validate: boolean;
    carritoCompras: Products[];
}
const sendInfoDataBase = (data : DataTypes)  => {




    return async ({validate, carritoCompras} : PropsSecond) => {

        console.log('aqui esta el valor de validate -> ', validate);
        console.log('aqui esta el carritoCompras -> ', carritoCompras);
        console.log('aqui esta el formulario -> ', data)

        const busquedaPrueba = await dataBase.products.findMany({
            where: {
                name_product: 'aguajina'
            }
        })

        console.log('busqueda de prueba -> ', busquedaPrueba);

        const insertCompra = await dataBase.clientes.create({
            data : {
                name: data.nombre,
                email: data.email,
                lastname: data.apellido,
                phoneone: data.phone,
                phonetwo: data.phoneTwo,
                departamento: data.departamento,
                distrito: data.distrito,
                provincia: data.provincia,
                direccion: data.direccion,
                courier: data.courierDelivery,
                textarea: data.textArea,
                products: carritoCompras.map(el=>el.id_product),
                fecha: new Date(),
                amount: data.amount,
                allcheck: validate
            }
        })

        console.log('este es el producto que hemos insertado -> ', insertCompra)

    }
}

const generarSesion = async (req: Request, res: Response) => {

    const {'kr-answer': krAnswer, 'kr-hash': krHash, carritoCompras} = req.body;
    console.log("el req.body de generarSesion al pagar con la tarjeta es -> ",req.body);

    try{

        if(krAnswer && krHash) {
            const answerData = JSON.parse(krAnswer);
            console.log('Datos del pago answerData : ', answerData);

            if(answerData.orderStatus === 'PAID') {
                console.log('Pago exitoso')
                res.json(true)
                sendDataClientCompra({validate: true, carritoCompras});
            } else {
                console.log('Pago fallido o pendiente')
                res.json(false)
                sendDataClientCompra({validate: false, carritoCompras});
            }

        } else {
            console.log('datos incompletos')
            res.json(false)
        }

    }catch(err){
        console.error('Error en la validacion: ', err)
        res.json(false);
    }

};


const formulario =  async (req : Request, res : Response) => {

    let {nombre, apellido, email, phone, phoneTwo, departamento, provincia, distrito, direccion, courierDelivery, textArea, amount, activeEnvio} = req.body;
    const orderId = uuidv4();
    console.log('aqui esta el orderID -> ', orderId);

    if (!activeEnvio) {
        phoneTwo = "ninguno";
        departamento = "junin/recojo en tienda";
        provincia = "huancayo/recojo en tienda";
        distrito = "el tambo/recojo en tienda";
        direccion = "psj. san miguel 204/recojo en tienda";
        courierDelivery = "ninguno/recojo en tienda";
        textArea = "ninguno/recojo en tienda";
    }

    const data = {
        nombre,
        apellido,
        email,
        phone,
        phoneTwo,
        departamento,
        provincia,
        distrito,
        direccion,
        courierDelivery,
        textArea,
        amount
    };

    sendDataClientCompra = sendInfoDataBase(data);

    let publicKey = process.env.IZIPAY_PUBLIC_KEY;
    const auth = Buffer.from(`${process.env.IZIPAY_MERCHANT_ID}:${process.env.IZIPAY_API_KEY}`).toString('base64');

        try {
            // let publicKey = process.env.IZIPAY_PUBLIC_KEY;
            // const auth = Buffer.from(`${process.env.IZIPAY_MERCHANT_ID}:${process.env.IZIPAY_API_KEY}`).toString('base64');
            const identifyType = "DNI";
            const identifyCode = "71696192"
            //requerido para el Form -> amount, orderId, email, firstName, lastName, phoneNumber, identifyType(DNI), identifyCode(numero de dni), addres(direccion), city(departamento), state(provincia)
            const paymentData = {
                amount: Math.round(amount * 100),
                currency: 'PEN',
                orderId,
                customer: {
                    email,
                    billingDetails: {
                        firstName: nombre,
                        lastName: apellido,
                        phoneNumber: phone,
                        identifyType,
                        identifyCode,
                        address: direccion,
                        country: 'PE',
                        city: departamento,
                        state: provincia,
                        zipCode: "12001",
                    }
                },
                // paymentMethods: ["CARD", "YAPE"]
            }

            const response = await fetch('https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json', // Cambiar a JSON
                },
                body: JSON.stringify(paymentData), // Enviar como JSON
            });

            // console.log('status de izipay: ', response.status);
            const text = await response.text();
            // console.log('respuesta cruda de izipay: ', text);

            let data;

            try {
                data = text ? JSON.parse(text) : {};
            } catch (err) {
                console.error('Error parseando JSON de Izipay: ', err);
                data = {error: 'Invalid JSON response from Izipay', rawResponse: text};
            }

            console.log('datos parseados de Izipay: ', data);

            const finalResponse = {
                publicKey : `${process.env.IZIPAY_MERCHANT_ID}:${process.env.IZIPAY_PUBLIC_KEY}`,
                // publicKey,
                formToken: data.answer?.formToken || null,
                izipayData: data,
                success: response.status === 200 || response.status === 201,
                ok: true,
            }
            // console.log('Respuesta final que se envia al frontend: ', finalResponse);
            res.json(finalResponse);
        }catch(err){
               console.error('Error Completo: ', err);
               res.status(500).json({error: err.message,
               publicKey: `${process.env.IZIPAY_MERCHANT_ID}:${process.env.IZIPAY_PUBLIC_KEY}`,
               // publicKey,
               ok: false});
        }

    // res.render('email', {carritoCompras : generateMap(carritoCompras)}, async (err, html) => {
    //     if(err) {
    //         console.log(`ocurrio un problema -> ${err}`)
    //         return;
    //     }
    //     const transport = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: process.env.USER_EMAIL,
    //             pass: process.env.USER_PASSWORD,
    //         },
    //         tls: {
    //             rejectUnauthorized: false,
    //         }
    //     })
    //
    //     try{
    //         const mailOptions = await transport.sendMail({
    //
    //             from: process.env.USER_EMAIL,
    //             to: email,
    //             subject: `Gracias por su compra ${nombre}`,
    //             html,
    //         })
    //
    //         if(!mailOptions.accepted || mailOptions.accepted.length === 0) throw new Error(`Correo no aceptado por el servidor: ${mailOptions.response}`)
    //         res.status(200).json({message: 'el correo fue enviado exitosamente', mailOptions, ok: true})
    //     }catch(err : any){
    //         console.error('Error al enviar correo:', err.message || err);
    //         res.status(500).json({message: 'error al enviar el correo', error: err.message, ok: false})
    //     }finally{
    //
    //
    //     }
    // })


}


// const merchantId = process.env.IZIPAY_MERCHANT_ID;
// const apikey = process.env.IZIPAY_API_KEY;
// const base64Auth = Buffer.from(`${merchantId}:${apiKey}`).toString("base64");

// Test rápido - agregar antes de tu función crearSesion
const testDifferentMethods = async () => {
    const baseUrl = "https://sandbox-api-pw.izipay.pe";
    const merchantId = process.env.IZIPAY_MERCHANT_ID;
    const apiKey = process.env.IZIPAY_API_KEY;
    const base64Auth = Buffer.from(`${merchantId}:${apiKey}`).toString("base64");

    // Posibles endpoints comunes
    const endpoints = [
        "/v2/ecommerce/token/session",
        "/v1/ecommerce/token/session",
        "/ecommerce/token/session",
        "/token/session",
        "/session/create",
        "/create-session",
        "/payment/session",
        "/checkout/session"
    ];

    console.log("🔍 Probando diferentes endpoints...");

    for (const endpoint of endpoints) {
        const fullUrl = baseUrl + endpoint;

        try {
            console.log(`🧪 Probando: ${fullUrl}`);

            // Probar POST
            const response = await fetch(fullUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${base64Auth}`,
                },
                body: JSON.stringify({
                    channel: "web",
                    amount: "15.00",
                    currency: "PEN",
                    purchaseNumber: "TEST123"
                })
            });

            console.log(`📊 POST Status: ${response.status}`);

            if (response.status !== 404) {
                console.log(`🎉 ¡ENDPOINT ENCONTRADO!: ${fullUrl}`);

                if (response.status === 401) {
                    console.log("🔐 Credenciales incorrectas, pero endpoint existe");
                } else if (response.status === 400) {
                    const text = await response.text();
                    console.log("⚠️ Bad request, revisar payload:", text.substring(0, 200));
                } else if (response.ok) {
                    const data = await response.json();
                    console.log("✅ SUCCESS:", data);
                } else {
                    const text = await response.text();
                    console.log(`📋 Respuesta (${response.status}):`, text.substring(0, 200));
                }
                break;
            }

        } catch (error) {
            if (!error.message.includes('fetch failed')) {
                console.log(`❌ Error: ${error.message}`);
            }
        }

        await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Si nada funciona, probar GET en la raíz para ver si responde
    try {
        console.log("\n🔍 Probando GET en raíz...");
        const response = await fetch(baseUrl, { method: "GET" });
        console.log(`📊 GET Root Status: ${response.status}`);

        if (response.ok) {
            const text = await response.text();
            console.log("📋 Respuesta root:", text.substring(0, 200));
        }
    } catch (error) {
        console.log("❌ GET Root Error:", error.message);
    }
};

// testDifferentMethods();

const crearSesion = async (req: Request, res: Response) => {
    console.log(req.body);





};

import qs from "qs"; // importa qs al inicio de tu archivo





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
    crearSesion: (req: Request, res: Response) => void;
    generarSesion: (req: Request, res: Response) => void;
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
    crearSesion,
    generarSesion
};

export default taskControllers;




