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
            <section className={"bg-[green] w-4/5 mx-auto"}>
                <h1 className={"text-[75px]"}>{name.replace(/-/g,' ')}</h1>
                <div className={"w-full bg-blue-300 flex"} >
                        <div className={"w-1/2 bg-amber-300 h-full flex flex-col justify-center items-center gap-[10px]"}>
                            <img className={"size-[250px] object-cover border rounded-[8px]"} src={dataProduct?.img[0]} alt=""/>
                            <div className={"flex gap-[10px] justify-between"}>
                                <img className={"size-[75px] object-cover border rounded-[8px]"}  src={dataProduct?.img[1]} alt=""/>
                                <img className={"size-[75px] object-cover border rounded-[8px]"}  src={dataProduct?.img[2]} alt=""/>
                                <img className={"size-[75px] object-cover border rounded-[8px]"}  src={dataProduct?.img[3]} alt=""/>
                            </div>
                            <div className={"flex gap-[10px] justify-center items-center"}>
                                <span className={"size-[25px] rounded-full bg-red-600 inline-block"}></span>
                                <span className={"size-[25px] rounded-full bg-red-600 inline-block"}></span>
                                <span className={"size-[25px] rounded-full bg-red-600 inline-block"}></span>
                                <span className={"size-[25px] rounded-full bg-red-600 inline-block"}></span>
                            </div>
                        </div>
                        <div className={"w-1/2 bg-blue-300 flex flex-col"}>
                            <h1 className={"text-[50px] border-blue-800 border-4 pb-[25px]"}>{ dataProduct && dataProduct?.name}{ dataProduct && dataProduct?.fruit}</h1>
                            <div className={"flex justify-between border-4 border-violet-600 pt-[10px]"}>
                                <div className={"flex gap-[5px]"}>
                                    <span>S/. {dataProduct?.price}</span>
                                    <span>S/. {dataProduct?.price}</span>
                                </div>
                                <div className={"flex gap-[7.5px] "}>
                                    <span className={"size-[20px] border inline-block rounded-full"}/>
                                    <span className={"size-[20px] border inline-block rounded-full"}/>
                                    <span className={"size-[20px] border inline-block rounded-full"}/>
                                    <span className={"size-[20px] border inline-block rounded-full"}/>
                                    <span className={"size-[20px] border inline-block rounded-full"}/>
                                </div>
                            </div>
                            <div className={"w-full border-4"}>
                                <h1>Tratamiento</h1>
                                <div className={"flex justify-evenly"}>
                                    <ul className={"list-disc"}>
                                        <li>1</li>
                                        <li>1</li>
                                        <li>1</li>
                                        <li>1</li>
                                        <li>1</li>
                                    </ul>
                                    <ul className={"list-disc"}>
                                        <li>2</li>
                                        <li>2</li>
                                        <li>2</li>
                                        <li>2</li>
                                        <li>2</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={"flex flex-1 gap-[10px] w-full justify-evenly mx-auto bg-orange-500 items-center"}>
                                <ButtonAdd id={dataProduct?.id ?? 999}/>
                                <ButtonBuy id={dataProduct?.id ?? 999}/>
                            </div>
                        </div>

                </div>
                <div className={"h-[600px] w-[90%] mx-auto border-4 bg-red-400 flex"}>
                    <div className={"border flex-1"}>
                        <h1>Detalles del producto</h1>
                        <div className={"border-2"}>{dataProduct?.description[0] ?? '-'}</div>
                        <div className={"border-2"}>{dataProduct?.description[1] ?? '-'}</div>
                        <div className={"border-2"}>{dataProduct?.description[2] ?? '-'}</div>
                        <div className={"border-2"}>{dataProduct?.description[3] ?? '-'}</div>
                        <div className={"border-2"}>{dataProduct?.description[4] ?? '-'}</div>
                    </div>
                    <div className={"border flex-1"}>
                        <h1>caracteristicas</h1>
                        <div className={"border-2"}>{dataProduct?.caracteristicas?.[0] ?? '-'}</div>
                        <div className={"border-2"}>{dataProduct?.caracteristicas?.[1] ?? '-'}</div>
                        <div className={"border-2"}>{dataProduct?.caracteristicas?.[2] ?? '-'}</div>
                        <div className={"border-2"}>{dataProduct?.caracteristicas?.[3] ?? '-'}</div>
                        <div className={"border-2"}>{dataProduct?.caracteristicas?.[4] ?? '-'}</div>
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