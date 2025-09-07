import { useState, useEffect} from "react";
import { useGetCarrito } from "../hooks/getCarritoMap.tsx";
import { DeleteGroup } from "../components/buttonsComponent/deleteGroupProducts.tsx";
import { LessProducts } from "../components/buttonsComponent/lessElementProductGroup.tsx";
import {FormCompras} from "../components/bodyComponents/formularioPago.tsx"
import {ButtonAdd} from '../components/buttonsComponent/buttonAdd.tsx'
import {useBlurSearch} from "../zustand/useBlurSearch.tsx";
import {useBlurMenu} from "../zustand/useBlurMenu.tsx"
import {Products} from '../components/headerComponents/searchIcon.tsx'
import {ClearCarrito} from '../components/buttonsComponent/clearCarrito.tsx'
import {useCompleteForm} from '../zustand/useCompleteForm.tsx'


import {useWaitUntil} from "../zustand/useWaitUntil.tsx";

export const PayProducts = () => {
    const { data, refetch } = useGetCarrito();
    const [animateIndex, setAnimateIndex] = useState<number | null>(null);
    const {switchBlur} = useBlurSearch();
    const {activeBlur} = useBlurMenu();
    const [mapProducts, setMapProducts] = useState<[string,Products[]][]|null>(null)
    const {statusForm, changeStatusForm, restartForm} = useCompleteForm();
    const {statusSpinner} = useWaitUntil();


    useEffect(()=>{
        const map = new Map<string,Products[]>(null)

        data?.forEach(product=>{
            if(map.has(product.id_product)) {
                map.get(product.id_product)?.push(product)
            } else {
                map.set(product.id_product,[product])
            }
        })
        setMapProducts([...map])

    },[data])

    const sendProductsToPay = () => {



        console.log('gaaaaaaaaaaaaaaaaaaaaaaa')
    }

    const [activeForm, setActiveForm] = useState<boolean|null>(false);

    return (
        <section className={"relative"}>
            <main className={`${statusSpinner ? "blur-[20px]" : ""} ${switchBlur? "blur-[20px]" : ""} ${activeBlur? "blur-[20px]" : ""} w-3/4 mx-auto flex flex-col gap-[25px] pb-[25px]`}>
                <h1 className="text-titleResponsive text-center leading-none z-0">{ ((mapProducts?.length ?? 0) > 0) ? "Seccion de pagos" : "Ups...Necesita agregar productos al carrito"}</h1>

                <div className={"flex justify-center"}>
                    <div className="flex flex-wrap gap-[25px] justify-center p-[10px] transition-half">
                        {((mapProducts?.length ?? 0) > 0) && mapProducts?.map(([_, value], index) => (
                            <section
                                key={index}
                                className={`transition-all duration-500 ease-in-out flex flex-col justify-between gap-[10px] rounded-[8px] items-center w-[250px] h-[375px] p-[15px] shadow-[0_0_5px_rgba(0,0,0,.8)] relative ${
                                    animateIndex === index ? "showItem" : ""
                                }`}
                                onAnimationEnd={() => setAnimateIndex(null)}
                            >
                                <img
                                    className="size-[215px] rounded-[8px] object-cover shadow-[0_0_2.5px_rgba(0,0,0,.9)]"
                                    src={value[0].img_product[0]}
                                    alt=""
                                />
                                <h1 className="self-start">{value[0].name_product} - {value[0].type_fruit}</h1>

                                <div className="flex justify-between w-[85%]">
                                    <div className="flex gap-[10px]">
                                        <StarIcon />
                                        <EmpaqueIcon />
                                    </div>
                                    <b className="font-medium self-end">S/. {value[0].price_product}</b>
                                </div>

                                <div className="flex w-1/2 justify-between">
                                    <LessProducts
                                        id={value[0].id_product}
                                        refetch={refetch}
                                    />
                                    <small className="rounded-full size-[25px] flex items-center justify-center shadow-[0_0_3.5px_rgba(0,0,0,1)]">
                                        {value.length}
                                    </small>
                                    <ButtonAdd
                                        id={value[0].id_product}
                                        activeIcon={true}
                                        refetch={refetch}
                                    />
                                </div>

                                <DeleteGroup id={value[0].id_product} refetch={refetch} activePosition={true}/>
                            </section>
                        ))}
                    </div>

                    { activeForm && <FormCompras state={activeForm} setState={setActiveForm}/> }

                </div>

                <div className={"flex w-full justify-between"}>
                    { (mapProducts?.length ?? 0) > 0 && <h1 className={"font-medium border-b-2 border-gray-900 px-[5px] py-[2.5px] h-[35px] w-[125px] text-center showItem"}>
                        Total: S/. {mapProducts?.reduce((total,[_,value]) => total + value.reduce((subTotal, el) => subTotal + parseInt(String(el.price_product)) , 0) ,0)}

                    </h1>}
                    { (mapProducts?.length ?? 0 )> 0 && <button className={`showItem ${ statusForm ? "hidden": "pointer-events-auto block"} font-medium border-2 border-gray-500 px-[5px] py-[2.5px] h-[35px] w-[125px] text-center rounded-[7.5px]`} onClick={ () => setActiveForm(prev=>!prev)} >rellenar datos</button> }

                    { (((mapProducts?.length ?? 0)>0) && statusForm) && <button className={"showItem border-2 border-gray-500 px-[5px] py-[2.5px] h-[35px] rounded-[7.5px] w-[125px] text-center font.medium"} onClick={sendProductsToPay}>pagar</button>}

                    { (mapProducts?.length ?? 0) > 0 && <ClearCarrito refetch={refetch}/> }


                </div>

            </main>
            {statusSpinner &&
                <div className={"size-[150px] bg-blue-500 rounded-full top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2"}/>
            }
        </section>

    );
};


export const EmpaqueIcon = () => {
    return (
        <svg className={"size-[25px]"} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             width="100" height="100"
             viewBox="0 0 50 50">
            <path
                d="M 1 3 L 1 15 L 3 15 L 3 48 L 47 48 L 47 15 L 49 15 L 49 3 Z M 3 5 L 47 5 L 47 13 L 3 13 Z M 5 15 L 45 15 L 45 46 L 5 46 Z M 17.5 19 C 15.578125 19 14 20.578125 14 22.5 C 14 24.421875 15.578125 26 17.5 26 L 32.5 26 C 34.421875 26 36 24.421875 36 22.5 C 36 20.578125 34.421875 19 32.5 19 Z M 17.5 21 L 32.5 21 C 33.339844 21 34 21.660156 34 22.5 C 34 23.339844 33.339844 24 32.5 24 L 17.5 24 C 16.660156 24 16 23.339844 16 22.5 C 16 21.660156 16.660156 21 17.5 21 Z"></path>
        </svg>
    )
}
export const StarIcon = () => {

    const flickElement = ( e : MouseEvent ) => {
        const rootNode = e.target?.parentNode.parentNode;
        console.log(rootNode,"aqui ta")

    }

    return (
        <svg onClick={flickElement} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
             width="24px" fill="#999999">
            <path
                d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
        </svg>
    )
}
