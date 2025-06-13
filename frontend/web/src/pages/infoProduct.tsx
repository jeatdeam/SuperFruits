import {Header} from './header';
import {Footer} from "./footer";
import {ButtonAdd} from "../components/buttonAdd.tsx"
import {ButtonBuy} from "../components/buttonBuy.tsx";

import { useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom"
import {ProcesoDeCompra} from "../components/procesoDeCompra.tsx";

type Products = {
    id : number;
    idCompra : number | null;
    fruit : string;
    name : string;
    price : number;
    img : string[];
    description : string[];
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
                const response = await fetch(`http://localhost:3000/productDescription/${name}`, options);
                // console.log('aqui esta el response->',response);

                if(!response.ok) {
                    throw new Error(`error en la peticion - url no valida- status: ${response.status} -> ${response.statusText}`);
                }
                const result = await response.json()
                // console.log('aqui esta el result->',result)
                    setData(result.product)
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



export const InfoProduct = () => {
    const {product, name} = useParams();
    const {dataProduct} = useFetchItem(name);

    useEffect(()=>{



    },[])

    return (
        <main>
            <section className={"w-4/5 xl:w-3/5 mx-auto flex flex-col gap-[25px]"}>
                <h1 className={"text-titleResponsive text-center mb-[25px]"}>{name.replace(/-/g,' ')}</h1>
                <div className={"w-full flex-col flex md:flex-row gap-0 md:gap-[25px] shadow-shadowElement p-[25px] rounded-[8px]"} >
                        <div className={"w-full md:w-1/2 rounded-[8px] h-full flex flex-col justify-center items-center gap-[10px]"}>
                            <img className={"shadow-shadowElement size-[250px] object-cover border rounded-[8px]"} src={dataProduct?.img[0]} alt=""/>
                            <div className={"flex gap-[10px] justify-between"}>
                                <img className={"shadow-shadowElement size-[75px] object-cover border rounded-[8px]"}  src={dataProduct?.img[1]} alt=""/>
                                <img className={"shadow-shadowElement size-[75px] object-cover border rounded-[8px]"}  src={dataProduct?.img[2]} alt=""/>
                                <img className={"shadow-shadowElement size-[75px] object-cover border rounded-[8px]"}  src={dataProduct?.img[3]} alt=""/>
                            </div>
                            <div className={"flex gap-[10px] justify-center items-center translate-y-1/2"}>
                                <span className={"size-[20px] rounded-full bg-red-600 inline-block"}></span>
                                <span className={"size-[20px] rounded-full bg-red-600 inline-block"}></span>
                                <span className={"size-[20px] rounded-full bg-red-600 inline-block"}></span>
                                <span className={"size-[20px] rounded-full bg-red-600 inline-block"}></span>
                            </div>
                        </div>
                        <div className={"w-full md:w-1/2  flex flex-col gap-[15px]"}>
                            <h1 className={"leading-none text-[27.5px]"}>{ dataProduct && dataProduct?.name} - { dataProduct && dataProduct?.fruit}</h1>
                            <div className={"flex justify-between "}>
                                <div className={"flex gap-[5px]"}>
                                    <span className={""}>S/. {dataProduct?.price}</span>
                                    <span className={"line-through"}>S/. {dataProduct?.price}</span>
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
                                <h1>Tratamiento</h1>
                                <div className={"flex justify-between"}>
                                    <ul className={"list-disc pl-[25px]"}>
                                        <li>1 cuack cuack cuack</li>
                                        <li>1 cuack cuack cuack</li>
                                        <li>1 cuack cuack cuack</li>
                                        <li>1 cuack cuack cuack</li>
                                        <li>1 cuack cuack cuack</li>
                                    </ul>
                                    <ul className={"list-disc pl-[25px]"}>
                                        <li>2 cuack cuack cuack</li>
                                        <li>2 cuack cuack cuack</li>
                                        <li>2 cuack cuack cuack</li>
                                        <li>2 cuack cuack cuack</li>
                                        <li>2 cuack cuack cuack</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={"flex flex-1 gap-[10px] w-full justify-evenly mx-auto items-center"}>
                                <ButtonAdd id={dataProduct?.id ?? 999}/>
                                <ButtonBuy id={dataProduct?.id ?? 999}/>
                            </div>
                        </div>
                </div>
                <div className={"mx-auto p-[25px] shadow-shadowElement flex flex-col w-full rounded-[8px] gap-[25px]"}>
                    <h1 className={"text-[40px]"}>Informacion adicional</h1>
                    <div className={"flex gap-[5px]"}>
                        <div className={"border-t-2 border-l-2 border-r-2 border-gray-500 rounded-[8px] flex-1 flex flex-col gap-[5px]"}>
                            <h1 className={"pl-[5px]"} >Detalles del producto</h1>
                            <div className={"pl-[5px] border-t-2  border-gray-500"}>{dataProduct?.description[0] ?? '-'}</div>
                            <div className={"pl-[5px] border-t-2  border-gray-500"}>{dataProduct?.description[1] ?? '-'}</div>
                            <div className={"pl-[5px] border-t-2  border-gray-500"}>{dataProduct?.description[2] ?? '-'}</div>
                            <div className={"pl-[5px] border-t-2  border-gray-500"}>{dataProduct?.description[3] ?? '-'}</div>
                            <div className={"pl-[5px] border-t-2 border-b-2 border-gray-500 rounded-b-[8px]"}>{dataProduct?.description[4] ?? '-'}</div>
                        </div>
                        <div className={"border-t-2 border-l-2 border-r-2 border-gray-500 rounded-[8px] flex-1 flex flex-col gap-[5px]"}>
                            <h1 className={"pl-[5px]"} >caracteristicas</h1>
                            <div className={"pl-[5px] border-t-2  border-gray-500"}>{dataProduct?.caracteristicas?.[0] ?? '-'}</div>
                            <div className={"pl-[5px] border-t-2  border-gray-500"}>{dataProduct?.caracteristicas?.[1] ?? '-'}</div>
                            <div className={"pl-[5px] border-t-2  border-gray-500"}>{dataProduct?.caracteristicas?.[2] ?? '-'}</div>
                            <div className={"pl-[5px] border-t-2  border-gray-500"}>{dataProduct?.caracteristicas?.[3] ?? '-'}</div>
                            <div className={"pl-[5px] border-t-2 border-b-2 border-gray-500 rounded-b-[8px]"}>{dataProduct?.caracteristicas?.[4] ?? '-'}</div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-lime-500 flex flex-wrap justify-center items-center gap-[10px]">
                    <div className={"size-[350px] border-2"}></div>
                    <div className={"size-[350px] border-2"}></div>
                    <div className={"size-[350px] border-2"}></div>
                    <div className={"size-[350px] border-2"}></div>
                    <div className={"size-[350px] border-2"}></div>
                    <div className={"size-[350px] border-2"}></div>
                </div>

            </section>
        </main>
    )
}