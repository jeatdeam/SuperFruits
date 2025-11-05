import {useEffect, useState, useRef, useImperativeHandle, forwardRef} from "react";
import {CardDetails, RefsCard} from "../components/bodyComponents/cardDetails.tsx" ;
import {useParams, Link, useNavigate} from 'react-router-dom'
import {useLastId} from "../hooks/lastIdProduct.tsx"
import {ButtonBuy} from "../components/buttonsComponent/buttonBuy.tsx";
import {ButtonAdd} from "../components/buttonsComponent/buttonAdd.tsx";
import {StarIcon, EmpaqueIcon} from "./payProducts.tsx";
import {ProcesoDeCompra} from "../components/bodyComponents/procesoDeCompra.tsx";
import {useBlurSearch} from "../zustand/useBlurSearch.tsx";
import {useBlurMenu} from "../zustand/useBlurMenu.tsx"
import {Products} from '../components/headerComponents/searchIcon.tsx'
import {useGetCarrito} from "../hooks/getCarritoMap.tsx";

// type Products = {
//     id: number;
//     fruit : string;
//     name : string;
//     price : number;
//     img : string[];
//     description : string[];
// }



export const ProductsCards = () => {
    const { product } = useParams<string>();
    const [productsFetch, setProductsFetch] = useState<Products[]|null>([]);
    const [ready, setReady] = useState<boolean>(false);
    const refButtonAdd = useRef<(HTMLButtonElement|null)[]>([])
    // const {data, loading, error, refetch} = useLastId()
    const refSectionProducts = useRef<HTMLDivElement|null>(null);
    const refCard = useRef<RefsCard|null>(null);
    const refButtonCarrito = useRef<(HTMLButtonElement|null)[]>([]);
    const refPadre = useRef<(HTMLDivElement|null)[]>([])
    const navigate = useNavigate();

    const {switchBlur} = useBlurSearch();
    const {activeBlur} = useBlurMenu();
    const {data, refetch} = useGetCarrito()

    useEffect(() => {
        // if (!product) return;
        // console.log('cuacksito -> ',refProducts.current)
        const fetchData = async () => {
            try {
                // console.log(product, "<-");

                const response = await fetch(`http://localhost:4000/infoProducts/${product}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error(`Error en la petición: ${response.statusText}`);

                const result = await response.json();
                // refProducts.current = result.data;
                // console.log(result.productsFilter);
                setProductsFetch(result.extraerProducts)
                setReady(true)
                // console.log(result.data);

            } catch (error) {
                console.error("Algo salió mal:", error);
            }
        };
        fetchData();
    }, [product] );  // ← Aquí incluimos `products` en las dependencias

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
            <main className={`${activeBlur ? "blur-[10px]" : ""} ${switchBlur? "blur-[10px]" : ""}  w-full pb-[25px] mb-[25px]`}>
                {
                    productsFetch && (productsFetch.length ?? 0 > 0) ?
                        <>
                            <h1 className={"text-center text-titleResponsive mb-[50px]"}>{product?.toUpperCase()}</h1>
                            <section className="w-[80%] justify-center mx-auto flex flex-wrap content-start gap-[25px] relative" ref={refSectionProducts}>
                                {productsFetch && productsFetch?.map((el,key)=>(
                                    <div className={"shadow-shadowCard rounded-[15px] w-[250px] h-[400px] p-[15px] flex flex-col items-center justify-between"}
                                         ref={(node) => refPadre.current[key] = node} key={key} onClick={showInfoProduct}>
                                        <img src={el.img_product?.[0]} alt="" className={"size-[215px] rounded-[8px] shadow-shadowElement"}/>
                                        {/*<h1>{el.fruit}</h1>*/}
                                        <h2 className={"nameProduct self-start"}>{el?.title_product}</h2>
                                        <div className={"flex justify-between w-4/5"}>
                                            <div className={"flex gap-[10px]"}>
                                                <StarIcon/>
                                                <EmpaqueIcon/>
                                            </div>
                                            <b className={"self-end"}>S/. {el?.price_product}</b>
                                        </div>
                                        <div className={"flex gap-[20px] justify-evenly w-full"}>
                                            <ButtonAdd ref={(node) => { refButtonCarrito.current[key] = node}} id={el?.id_product} activeIcon={false} refetch={refetch}/>
                                            <Link to={`/seccion-de-pagos`}>
                                                <ButtonBuy ref={(node)=> { refButtonAdd.current[key] = node }} id={el?.id_product} name={el?.name_product}/>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </>
                        :
                        <h1 className={"text-[50px] w-3/5 mx-auto text-center"}>Error no se encontraron coincidencias, pruebe otra vez.</h1>

                }

            </main>
    );
};