import {useEffect, useState, useRef, useImperativeHandle, forwardRef} from "react";
import {CardDetails, RefsCard} from "./cardDetails.tsx" ;
import {useParams, Link, useNavigate} from 'react-router-dom'
import {useLastId} from "../hooks/lastIdProduct.tsx"
import {ButtonBuy} from "../components/buttonBuy.tsx";
import {ButtonAdd} from "../components/buttonAdd.tsx";
import {ProcesoDeCompra} from "../components/procesoDeCompra.tsx";

type Products = {
    id: number;
    fruit : string;
    name : string;
    price : number;
    img : string[];
    description : string[];
}



export const ProductsCards = () => {
    const { product } = useParams<string>();
    const [allProducts,setAllProducts] = useState<Products[]|null>(null)
    const [selectedId, setSelectedId] = useState<number|null>(null);
    const refProducts = useRef<Products[]|null>(null);
    const [ready, setReady] = useState<boolean>(false);
    const refButtonAdd = useRef<(HTMLButtonElement|null)[]>([])
    const {data, loading, error, refetch} = useLastId()
    const refSectionProducts = useRef<HTMLDivElement|null>(null);
    const refCard = useRef<RefsCard|null>(null);
    const refButtonCarrito = useRef<(HTMLButtonElement|null)[]>([]);
    const refPadre = useRef<(HTMLDivElement|null)[]>([])
    const navigate = useNavigate();

    const sendProduct = ( e : MouseEvent) => {
        const id = e.target?.dataset.id;
        console.log(id)
        if( id) {
            refetch(id);
            console.log(data)
        }
    }
    useEffect(() => {
        console.log('cuacksito -> ',refProducts.current)
        const fetchData = async () => {
            try {
                console.log(product, "<-");

                const response = await fetch(`http://localhost:3000/infoProducts/${product}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error(`Error en la petición: ${response.statusText}`);

                const result = await response.json();
                refProducts.current = result.data;
                setReady(true)
                console.log(result.data);

            } catch (error) {
                console.error("Algo salió mal:", error);
            }
        };
        fetchData();
    }, [product]);  // ← Aquí incluimos `products` en las dependencias

    const showInfoProduct = (e: MouseEvent) => {


        // if(!refCard.current) return;
        // const { showInfo } = refCard.current;
        // const target = e.target as HTMLElement;
        //
        // // Si clickeaste un botón o algo dentro de un botón, salir
        // if (target.closest('button')) return;
        //
        // // Buscar si el click fue dentro de alguna tarjeta del refPadre
        // for (const card of refPadre.current) {
        //     if (card && card.contains(target)) {
        //         console.log('Click válido en una tarjeta');
        //         showInfo(); // activa showInfo si se hizo clic dentro de una tarjeta
        //         break;
        //     }
        // }
        for ( const [indice,card] of refPadre.current.entries()) {
            let object = 0;
            if(card.contains(e.target as Node)) {
                object = indice;
                const name = refButtonAdd.current[object].dataset.name;
                console.log('aqui ta el name ',name)
                if(!refButtonAdd.current[object].contains(e.target as Node) && !refButtonCarrito.current[object].contains(e.target as Node)) {
                    navigate(`/${product}/${name.replace(/\s+/g,"-")}`)
                    console.log('no estaos presionando ninguno de los dos botones')
                    break;
                }
            }

        }
    };


    return (
        <>
            <main className={"w-full"}>
                <h1 className={"text-center text-[50px]"}>Products Cards</h1>
                <section className="w-[80%] border-[5px]  justify-center border-[purple] mx-auto flex flex-wrap content-start gap-[15px] relative" ref={refSectionProducts}>
                    {refProducts.current && refProducts.current?.map((el,key)=>(
                        // <Link to={`/${product}/${el.name.replace(/\s+/g,"-")}`}>
                            <div
                                className={"border-[2px]  border-[gray] rounded-[15px] w-[275px] h-[450px] px-[5px] py-[17.5px] flex flex-col items-center"}
                                ref={(node) => refPadre.current[key] = node} key={key} onClick={showInfoProduct}>
                                <img src={el.img[0]} alt="" className={"size-[240px] rounded-[8px]"}/>
                                <h1>{el.fruit}</h1>
                                <h2>{el.description[0]}</h2>
                                <h2 className={"nameProduct"}>{el.name}</h2>
                                <b>{el.price}</b>
                                <div className={"flex gap-[20px] justify-evenly w-full"}>
                                    <ButtonAdd ref={(node) => (refButtonCarrito.current[key] = node)} id={el.id}/>
                                    <Link to={`/seccion-de-pagos`}>
                                        <ButtonBuy ref={(node)=>(refButtonAdd.current[key] = node)} id={el.id} name={el.name}/>
                                    </Link>
                                </div>
                            </div>
                        // </Link>
                    ))}
                    {/*<CardDetails ref={refCard} refSection={refPadre}/>*/}
                </section>
            </main>
        </>
    );
};