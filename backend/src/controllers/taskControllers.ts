import {Request, Response} from 'express';

type Producto = {
    id: number,
    name: string,
    img: string,
    price: number
}


const baseDatos: Producto[] = [
    {
     id: 1,
     name: "John",
     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvy6EgNArwl_-Hp8y-uloNR-9vjOB522dlsQ&s",
     price: 1000,
    },
    {
     id: 2,
     name: "John",
     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvy6EgNArwl_-Hp8y-uloNR-9vjOB522dlsQ&s",
     price: 2000,
    },
    {
    id: 3,
    name: "John",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvy6EgNArwl_-Hp8y-uloNR-9vjOB522dlsQ&s",
    price: 5000,
    },
    {
    id: 4,
    name: "John",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvy6EgNArwl_-Hp8y-uloNR-9vjOB522dlsQ&s",
    price: 8000,
    },
]


type Products = {
    id : number;
    idCompra : number | null;
    fruit : string;
    name : string;
    price : number;
    img : string[];
    description : string[];
}
const products : Products[] = [
    {
        id : 1,
        idCompra : null,
        fruit : "aguaje",
        name : "pulpa de aguaje",
        price : 2200,
        img : ["https://res.cloudinary.com/dfwtyxxba/image/upload/v1744128099/agresivo-two_zh22jb.webp","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744128098/agresivo-three_jbct5e.webp","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744128098/agresivo-one_tselei.webp","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744128098/agresivo-four_xmobis.webp"],
        description : ["descripcion one","descripcion two","descripcion three"," descripcion four"],
    },
    {
        id : 2,
        idCompra : null,
        fruit : "aguaje",
        name : "jugo de aguaje",
        price : 1500,
        img : ["https://res.cloudinary.com/dfwtyxxba/image/upload/v1743982937/anquilosaurio-three_ojwluy.webp","https://res.cloudinary.com/dfwtyxxba/image/upload/v1743982937/anquilosaurio-four_mmgzlg.webp","https://res.cloudinary.com/dfwtyxxba/image/upload/v1743982937/anquilosaurio-two_apwoil.webp","https://res.cloudinary.com/dfwtyxxba/image/upload/v1743982937/anquilosaurio-one_gpass7.webp"],
        description : ["descripcion one","descripcion two","descripcion three"," descripcion four"],
    },
    {
        id : 3,
        idCompra : null,
      fruit : "aguaje",
      name : "fruta de aguaje entero",
      price : 1000,
      img : ["https://res.cloudinary.com/dfwtyxxba/image/upload/v1744212304/f8389f67fb1282e772d47eac338ec653_esmwfb.jpg","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744211270/22529f942d0ede6fc6350f2c53560a33-removebg-preview_saa8ot.png","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744210455/animales-uno_ftgef9.jpg","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744210274/dino-mejoado_fsiyf0.png"],
      description : ["descripcion one","descripcion two","descripcion three"," descripcion four"],
    },
    {
        id : 4,
        idCompra : null,
        fruit : "camu camu",
        name : "jugo de camu camu",
        price : 1500,
        img : ["https://res.cloudinary.com/dfwtyxxba/image/upload/v1743996478/espinosaurio-two_dq7hz5.webp","https://res.cloudinary.com/dfwtyxxba/image/upload/v1743996477/espinosaurio-three_vrvqv1.webp","https://res.cloudinary.com/dfwtyxxba/image/upload/v1743996475/espinosaurio-one_f8o5pg.webp","https://res.cloudinary.com/dfwtyxxba/image/upload/v1743996474/espinosaurio-four_imotlm.webp"],
        description : ["descripcion one","descripcion two","descripcion three"," descripcion four"],
    },
    {
        id : 5,
        idCompra : null,
        fruit : "camu camu",
        name : "pulpa de camu camu",
        price : 2200,
        img : ["https://res.cloudinary.com/dfwtyxxba/image/upload/v1744218955/cda0ea27db4358557a216d90803528ca_anq4hl.jpg","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744218762/d2f2f32726c2c3fafe959e523097105b_1_dkpqmn.jpg","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744218448/5ebb9b15a18314acd13d2fc95088d57c_g4ygll.jpg","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744218281/eb3b2805a43b0bf41e2e6fa0ef99defa_kqzhum.jpg"],
        description : ["descripcion one","descripcion two","descripcion three","descripcion four"],
    },
    {
        id : 6,
        idCompra : null,
        fruit : "camu camu",
        name : "fruto entero de camu camu",
        price : 1500,
        img : ["https://res.cloudinary.com/dfwtyxxba/image/upload/v1744216978/aa73bc4defab93cce73738e1ca5f01b4_rjajlx.jpg","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744216973/7d7e1e6d958eb76ec39ee069da0f06db_p4v40t.jpg","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744214632/575a94b43a35010b56b17f683a6fdc91_ztdugx.jpg","https://res.cloudinary.com/dfwtyxxba/image/upload/v1744214619/bdc9abc877b6efdd812a6ab3d1ac09ec_ptog6e.jpg"],
        description : ["descripcion one","descripcion two","descripcion three","descripcion four"],
    }
];

type ProductsCarrito = {
    idCompra : number;
    id : number;
    fruit : string;
    name : string;
    price : number;
    img : string;
    description : string;
}
let carritoCompras : Products[] = [

]

const busquedaProducts = ( req : Request, res: Response) => {
    // console.log('el texto reciido es ->',[...req.body].replace(/\s/,""))
    const {txt} = req.body;
    const value = txt.replace(/\s+/," ");
    console.log('cuack->',value)

    const productsName = products.map(product => product.name);
    const productsCuack = productsName.filter(name=>name.includes(value))
    const productsFilter = products.filter(product=> productsCuack.some(cuack=>cuack.includes(product.name)))
    console.log(productsFilter);

    productsFilter.length && res.status(200).json({productsFilter,message:"si hay productos", void : false,});
    !productsFilter.length && res.status(200).json({productsFilter,message: "no hay productos", void : true,});
}





const selectProducts = ( req : Request, res : Response) : void => {
    console.log('cuack 0->',req.params)
    const {product} = req.params;


    if(product) {

        const filterProducts = products.filter(element=> element.fruit.toLowerCase()===product.toLowerCase().replace(/-+/g," "))

        // console.log(filterProducts);

        res.status(200).json({data:filterProducts});

    }

}

type KeyOptions = {
    dataFront : string | null,
    afterData : string | null,
    finded : boolean | null,
    product : Products | null,
    message : string,
}


const getInfoProduct = (req: Request, res: Response) : void => {
    const options : KeyOptions = {
        dataFront: null,
        afterData: null,
        finded : null,
        product : null,
        message : '',
    }
    const { name } = req.params;

    if(!name) {
        options.message = "el parametro de ingreso es invalido"
        res.status(400).json(options)
    } else {
        options.dataFront = name;
        const nombreNormalizado = name.replace(/-+/g, " ").toLowerCase();
        if(!nombreNormalizado) {
            options.message = `no se pudo limpiar el parametro recibido: ${options.dataFront}`;
            res.status(400).json(options)
        } else {
            options.afterData = nombreNormalizado
            const findProduct = products.find( el => el.name.toLowerCase()===nombreNormalizado);
            if(!findProduct) {
                options.message = `no se encontro el producto '${options.afterData}' en la base de datos`;
                res.status(400).json(options)
            } else {
                options.finded = true;
                options.product  = findProduct;
                options.message  = "el producto fue encontrado exitosamente";
                res.status(200).json(options)
            }
        }

    }

};


const getProducts = (req: Request, res: Response) :void => {
    try{
        // setTimeout(()=>
            res.status(200).json({products,carritoCompras})
            // ,5000);
    }catch (error: unknown) {
        if(error instanceof Error) {
            // setTimeout(()=>
                res.status(500).json({message: 'Error interno', error: error.message})
                // ,5000);
        } else {
            // setTimeout(()=>
                res.status(500).json({message: 'Error desconocido'})
                // ,5000);
        }
    }
}
const addProductCarrito = ( req : Request, res : Response) : void => {
    console.log("POST /addProductCarrito recibida con body:", req.body);
        const {id} = req.body;

        const findProduct = products.find( el=> el.id === parseInt(id) );
        if(!findProduct)  res.status(404).json({ message: `El producto con el id-${id} no existe...`})

    if (!findProduct) {
        return;
        
    }
    const newProduct: Products = {...findProduct}
    newProduct.idCompra = carritoCompras.length + 1;
    carritoCompras.push(newProduct);
    res.status(200).json({message: 'Producto agregado con exito', carritoCompras, newProduct})
    console.log(carritoCompras)
}




const getLastIdProducts = ( req : Request, res : Response ) => {

    const lastId = carritoCompras.length;


    // arritoCompras})

}

const getPayProducts = ( req : Request, res : Response) => {

    const mapProducts = new Map<number, Products[]>();

    carritoCompras.forEach((product, indice)=> {

        if(mapProducts.has(product.id)){
            mapProducts.get(product.id)?.push(product)
        } else {
            mapProducts.set(product.id, [product])
        }
    })
    const flattenedProducts = [...mapProducts]
    mapProducts && res.status(200).json({flattenedProducts})
}


const deleteProduct = (req : Request, res : Response ) => {
    console.log('rebiendo el producto a eliminar -> ',req.body)
    const {id} = req.body;

    const mapProducts = new Map<number, Products[]>();

    carritoCompras.forEach((product, indice)=> {
        if(mapProducts.has(product.id)){
            mapProducts.get(product.id)?.push(product)
        }else{
            mapProducts.set(product.id, [product])
        }
    })

    const elementDeleted = mapProducts.get(id)?.pop();

    carritoCompras = carritoCompras.filter(product=> product.idCompra !== elementDeleted?.idCompra)
    console.log('el nuevo carrito de compras es', carritoCompras)

    res.status(200).json({carritoCompras})

}
const deleteGroup = (req : Request, res : Response) => {
    console.log('el id recibido es -> ', req.body)
    const {id} = req.body;

    carritoCompras = carritoCompras.filter( product=> product.id !== id )

    res.status(200).json({carritoCompras})

}

const deleteAllProducts = ( req : Request, res : Response) => {

    carritoCompras.length = 0;
    console.log(carritoCompras);

    res.status(200).json({carritoCompras, messaje: "el carrito ha sido limpiado con exito"})
}

const formulario = ( req : Request, res : Response) => {

    const body = req.body
    console.log(body)

    res.status(200).json({ok: true ,messageBackend: "enviados correctamente"})
    // console.log(body)
}


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
};

export default taskControllers;



