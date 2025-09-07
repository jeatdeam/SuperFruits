import {Header} from '../components/headerComponents/header.tsx';
import {Footer} from "../components/footerComponents/footer.tsx";
import {ButtonAdd} from "../components/buttonsComponent/buttonAdd.tsx"
import {ButtonBuy} from "../components/buttonsComponent/buttonBuy.tsx";

import { useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom"
import {ProcesoDeCompra} from "../components/bodyComponents/procesoDeCompra.tsx";

type Products = {
    id_product : string;
    price_product : number;
    stock_product : number;
    status_product : string;
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


const useFetchItem = (name : string ) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [dataProduct, setData] = useState<Products|null>(null);


    useEffect(()=>{
        // console.log(name)
        const options = {
            method : 'GET',
            headers : {"Content-Type": "application/json"},
        }

        const getProduct = async () => {
            setLoading(true);
            setError(false);

            try{
                const response = await fetch(`http://localhost:4000/productDescription/${name}`, options);
                // console.log('aqui esta el response->',response);

                if(!response.ok) {
                    throw new Error(`error en la peticion - url no valida- status: ${response.status} -> ${response.statusText}`);
                }
                const result = await response.json()
                // console.log('aqui esta el result->',result)
                    setData(result.productChosen)
                    setLoading(false);
                    setError(false);
            } catch (error){
                if (error instanceof Error) {
                    console.error("mensaje personalizado:", error.message);
                    console.error("nombre del error:", error.name);
                    console.error("stack:", error.stack);
                } else {
                    console.error("No es un error de tipo estándar:", error);
                }
                setError(true)
            }finally{
                setLoading(false);
            }
        }

        getProduct();
    },[name]);

    return {dataProduct}
}

const useFetchType =  ( product : string)=> {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [allTypeProducts, setTypeProducts] = useState<Products[]>([])

    useEffect(()=>{

        const url = `http://localhost:4000/typeProduct`;
        const options = {
            method: 'POST',
            headers : {"Content-Type" : "application/json"},
            body: JSON.stringify({product})
        }

        const getTypesProduct = async () => {

            try{
                const response = await fetch(url, options);
                if(!response.ok) throw new Error(`Error en la peticion ${response.status} - ${response.statusText}`);
                const result = await response.json()

                result.allTypeProducts.length && setTypeProducts(result.allTypeProducts);
                console.log(result.allTypeProducts)
            }catch(error){
                console.error(error.message);
                return null;
            }finally{
                console.log('ya termino el typeProduct')
            }

        }

        getTypesProduct();

    },[product])


    useEffect(()=>{

    },[allTypeProducts])

    return {allTypeProducts};

}

export const InfoProduct = () => {
    const {product, name} = useParams();
    const {dataProduct} = useFetchItem(name);
    const {allTypeProducts} = useFetchType(product);

    useEffect(()=>{
        console.log(product)
        console.log(name)
        console.log(allTypeProducts)
    },[allTypeProducts])

    return (
        <main>
            <section className={"w-4/5 xl:w-[1024px] 2xl:w-[1250px] mx-auto flex flex-col gap-[20px] lg:gap-[25px]"}>
                <h1 className={"w-full text-titleResponsive text-center mb-[25px] leading-none"}>{name.replace(/-/g,' ')}</h1>
                <div className={"w-full mx-auto flex-col flex md:flex-row gap-[25px] shadow-[0px_0px_7.5px_rgba(0,0,0,.5)] p-[25px] rounded-[8px]"} >
                        <div className={"w-full md:w-1/2 rounded-[8px] h-full flex flex-col justify-center items-center gap-[10px]"}>
                            <img className={"shadow-shadowElement size-[250px] object-cover border rounded-[8px]"} src={dataProduct?.img_product[0]} alt=""/>
                            <div className={"flex gap-[10px] justify-between"}>
                                <img className={"shadow-shadowElement size-[75px] object-cover border rounded-[8px]"}  src={dataProduct?.img_product[1]} alt=""/>
                                <img className={"shadow-shadowElement size-[75px] object-cover border rounded-[8px]"}  src={dataProduct?.img_product[2]} alt=""/>
                                <img className={"shadow-shadowElement size-[75px] object-cover border rounded-[8px]"}  src={dataProduct?.img_product[3]} alt=""/>
                            </div>
                            <div className={"flex gap-[10px] justify-center items-center translate-y-1/2"}>
                                <span className={"size-[20px] rounded-full bg-red-600 inline-block"}></span>
                                <span className={"size-[20px] rounded-full bg-red-600 inline-block"}></span>
                                <span className={"size-[20px] rounded-full bg-red-600 inline-block"}></span>
                                <span className={"size-[20px] rounded-full bg-red-600 inline-block"}></span>
                            </div>
                        </div>
                        <div className={"w-full md:w-1/2  flex flex-col gap-[15px]"}>
                            <h1 className={"leading-none text-[27.5px]"}>{ dataProduct && dataProduct?.name_product} - { dataProduct && dataProduct?.type_fruit}</h1>
                            <div className={"flex justify-between items-center"}>
                                <div className={"flex gap-[5px] flex-col"}>
                                    <span className={"text-red-600 text-[12.5px]"}>{dataProduct?.descuento_product}% descuento</span>
                                    <div className={"flex gap-[10px]"}>
                                        <span className={""}>S/. {dataProduct?.price_product * ( 100 - dataProduct?.descuento_product)/100}</span>
                                        <span className={"line-through text-red-600"}>S/. {dataProduct?.price_product}</span>
                                    </div>
                                </div>
                                <div className={"flex gap-[7.5px] "}>
                                    <span className={"size-[20px] border inline-block rounded-full"}/>
                                    <span className={"size-[20px] border inline-block rounded-full"}/>
                                    <span className={"size-[20px] border inline-block rounded-full"}/>
                                    <span className={"size-[20px] border inline-block rounded-full"}/>
                                    <span className={"size-[20px] border inline-block rounded-full"}/>
                                </div>
                            </div>
                            <div className={"w-full shadow-shadowElement px-[5px] py-[10px] rounded-[8px]"}>
                                <h1 className={"text-[17.5px] pl-[10px] font-medium"}>Tratamiento</h1>
                                <div className={"flex justify-between flex-wrap"}>
                                    <ul className={"list-[square] pl-[35px]"}>
                                        {
                                            dataProduct?.tratamiento_product.length && dataProduct?.tratamiento_product.map((item: any, index: number) => (
                                                <li key={index}>{item ?? '-'}</li>
                                                ))
                                        }
                                    </ul>
                                    <ul className={"list-[square] pl-[25px]"}>

                                    </ul>
                                </div>
                            </div>
                            <div className={"flex flex-1 gap-[10px] w-full justify-evenly mx-auto items-center"}>
                                <ButtonAdd id={dataProduct?.id_product ?? 999}/>
                                <ButtonBuy id={dataProduct?.id_product ?? 999}/>
                            </div>
                        </div>
                </div>
                <div className={"mx-auto p-[25px] flex flex-col w-full rounded-[8px] gap-[25px]  shadow-[0px_0px_7.5px_rgba(0,0,0,.5)]"}>
                    <h1 className={"w-[90%] lg:w-full mx-auto text-[35px] leading-none"}>Informacion adicional</h1>
                    <div className={"flex gap-[25px] justify-center flex-col lg:flex-row"}>

                        <div className={"rounded-[8px] flex flex-col gap-[5px] w-[90%] mx-auto lg:w-1/2 border-t-2 border-l-2 border-r-2 border-gray-500 h-full"}>
                            <h1 className={"bg-amber-200 h-[30px] mb-[-5px] pl-[7.5px] font-medium flex items-center rounded-t-[8px] text-[17px]"} >Detalles del producto</h1>
                            { dataProduct?.detalles_product.length && dataProduct?.detalles_product.map((el,index)=> (
                                index === dataProduct.detalles_product.length - 1 ?
                                    <div className={"pl-[7.5px]  border-t-2 border-b-2 border-gray-500 rounded-b-[8px]"} key={index}>{el}</div>
                                    :
                                    <div className={"pl-[7.5px] border-t-2 border-gray-500"} key={index}>{el}</div>
                            )) }
                        </div>

                        <div className={"w-[90%] border-t-2 border-l-2 border-r-2 mx-auto border-gray-500 lg:w-1/2 rounded-[8px] flex flex-col gap-[5px] h-full"}>
                            <h1 className={"pl-[7.5px] bg-amber-400 font-medium rounded-t-[8px] h-[30px] mb-[-5px] flex items-center text-[17px]"} >Caracteristicas</h1>
                            { dataProduct?.detalles_product.length && dataProduct?.detalles_product.map((el,index)=> (
                                index === dataProduct.detalles_product.length - 1 ?
                                    <div className={"pl-[7.5px] border-b-2 border-t-2 border-gray-500"} key={index}>{el}</div>
                                    :
                                    <div className={"pl-[7.5px] border-t-2 border-gray-500"} key={index}>{el}</div>
                            ))
                            }
                        </div>

                    </div>
                </div>
                <div className="w-full bg-lime-500 flex flex-wrap justify-center items-center gap-[10px]">
                    <div className={"size-[350px] border-2"}>{allTypeProducts?.[0]?.name_product ?? '-'}</div>
                    <div className={"size-[350px] border-2"}>{allTypeProducts?.[0]?.name_product ?? '-'}</div>
                    <div className={"size-[350px] border-2"}>{allTypeProducts?.[0]?.name_product ?? '-'}</div>
                    <div className={"size-[350px] border-2"}>{allTypeProducts?.[0]?.name_product ?? '-'}</div>
                    <div className={"size-[350px] border-2"}>{allTypeProducts?.[0]?.name_product ?? '-'}</div>
                    <div className={"size-[350px] border-2"}>{allTypeProducts?.[0]?.name_product ?? '-'}</div>
                </div>

            </section>
        </main>
    )
}