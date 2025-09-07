import {useState, useEffect, useRef, useImperativeHandle, forwardRef, act} from "react";
import {MenuSide} from "../menuSide.tsx";
import {useGetProducts, Products} from "../../hooks/getProducts.tsx";
import {Link} from "react-router-dom";
import {useActiveMenu} from "../../zustand/useActiveMenu.tsx"
import {useBlurMenu} from "../../zustand/useBlurMenu.tsx"


export type Props = {
    show? : boolean;
    toggleMenu : () => void
}
export type Ref = {
    container : HTMLDivElement | null;
    childContainer : HTMLDivElement | null;
}

type BackRefs = {
    hideItems : () => void;
}



export const Menu = forwardRef<Ref,Props>(({show, toggleMenu}, ref) => {
    const {products, fruits} = useGetProducts()
    const switchContainer = useActiveMenu((state)=>state.activeMenu)
    const desactiveContainer = useActiveMenu((state)=>state.inActiveMenu)
    const refContainer = useRef<HTMLDivElement|null>(null);
    const refHeaderMenu = useRef<HTMLDivElement|null>(null);
    const body = document.querySelector('body')
    const toggleBlur = useBlurMenu(state => state.toggleBlur)


    useImperativeHandle(ref, () => ({
        container : refContainer,
        childContainer: refHeaderMenu
    }))

    const [activeFruits, setActiveFruits] = useState<boolean>(false);
    const [activeSubFruits, setActiveSubFruits] = useState<number|null>(null);
    const [activeTitle, setActiveTitle] = useState<number|null>(null);

    useEffect(()=>{
        if(!switchContainer) {
            setActiveFruits(false);
            setActiveSubFruits(false)
        }
    },[switchContainer])

    useEffect(() => {

        const closeMenu = (e: MouseEvent) => {
            const refIconMenu = useActiveMenu.getState().refMenu
            const statusBlur = useBlurMenu.getState().activeBlur;
            // console.log(refContainer.current)
            if( statusBlur && refIconMenu && !refIconMenu.contains(e.target as Node)  && !refContainer.current.contains(e.target as Node) && body.contains(e.target as Node)) {
                desactiveContainer();
                useBlurMenu.setState({activeBlur: false})
            }
        }
        body.addEventListener('click', closeMenu)
        return () => body.removeEventListener('click', closeMenu)

    },[])

    return(
            <section ref={refContainer} className={`${ switchContainer ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed top-1/2 -translate-y-1/2 w-[250px] h-[400px] z-[10] p-[15px] rounded-[8px] transition-all duration-500 ease-in-out bg-white flex flex-col gap-[10px] shadow-shadowButton`}>

                <div ref={refHeaderMenu} className={"flex justify-between items-center"}>
                    <svg onClick={()=> { setActiveFruits(false); setActiveSubFruits(null)} } className={` ${activeFruits ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" }`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="#999999">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                    <h1 className={" text-[20px]"}>Productos</h1>
                    <h1 className={"bg-red-600 size-[40px] rounded-full"}></h1>
                </div>

                <div className={`w-full flex flex-col gap-[15px] ${ activeFruits ? "-translate-x-full" : ""} transition-all duration-500 ease-in-out relative`}>

                    { (products?.length ?? 0) > 0 && products.map(([key, value],index) => (
                        <div className={`w-full transition-all duration-500 ease-in-out  flex justify-between  gap-[15px]`} key={index}>
                            <div className={`relative flex gap-[15px] justify-between items-center min-w-full hover:bg-blue-300 rounded-[8px] ${activeFruits ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

                                <Link className={"w-full shadow-shadowButton px-[15px] rounded-[8px] h-[30px] flex items-center  transition-half"} to={`/${value[0]?.type_fruit.replace(/\s+/g,'-')}`} onClick={() => toggleMenu()}>
                                    <h1 className={``}>{key}</h1>
                                </Link>
                                <svg  className={"absolute right-[15px] size-[20px]"} onClick={() => {setActiveFruits(true); setActiveSubFruits(index)}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px" fill="#999999">
                                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                                </svg>

                            </div>
                            <div className={`min-w-full flex flex-col gap-[15px] ${index === activeSubFruits ? "block absolute top-0 right-[-100%]" : "hidden"}`}>

                            {value.map((el,indice) => (
                                    <Link className={"w-full rounded-[8px] px-[15px] h-[30px] shadow-shadowButton transition-half flex items-center hover:bg-blue-300"} key={indice} to={`/${el.type_fruit}/${el.name_product.replace(/\s+/g,"-")}`} onClick={()=>{toggleMenu();setActiveFruits(false); setActiveSubFruits(null)}}>
                                        <div className={`w-full`}>
                                            {el.name_product}
                                        </div>
                                    </Link>
                            ))}

                            </div>
                        </div>
                    ))}

                </div>
            </section>
    )
})

type AguajeProductsProps = {
    cuack : boolean;
    move : () => void;
    back : () => void;
    estado: boolean;
}
type AguajeRefs = {
    hideItems : () => void
}

const AguajeProducts = forwardRef<AguajeRefs,AguajeProductsProps>(({cuack, move, back, estado},ref)=>{
    const [active, setActive] = useState<boolean>(false)

    const showSubSection = (event: React.MouseEvent<HTMLDivElement>) => {

        if(estado) {
            move();
            setActive(true);
        }
    };
    useImperativeHandle( ref,()=> ({
        hideItems : subProductsActive,
    }))
    const subProductsActive = () => {
        setActive(false);
    }

    return(
        <div>
            <h1 onClick={showSubSection}
                className={`border-[5px] bg-[purple] border-[blue] relative`}>
                Aguaje
            </h1>
            <SubProductsAguaje show={active}/>
        </div>
    )
})
const SubProductsAguaje = ({show}) => {
    // const [active, setActive] = useState<boolean>(show);


    return (
        <div className={`${show ? "opacity-[1]" : "opacity-[0]"} absolute bg-[orange] left-[100%] top-0 transition-opacity duration-350 ease-in-out`}>
            subProducts
        </div>
    )
}

type CamuCamuProductsProps = {
    cuack: boolean;
    move: () => void;
}
type CamuCamuRefs = {
    hideItems: () => void
}

const CamuCamuProducts = forwardRef<CamuCamuRefs,CamuCamuProductsProps>(({cuack, move}, ref) => {

    const [active, setActive] = useState<boolean>(false)

    const showSubProducts = () => {
        move()
        setActive(true);
    }

    const subProdCamu = () => {
        setActive(false);
    }

    useImperativeHandle(ref,()=>({
        hideItems: subProdCamu
    }))

    return(
        <div className={"relative"}>
            <h1 onClick={showSubProducts} >Camu Camu</h1>
            <SubProductsCamuCamu show={active}/>
        </div>
    )
})


const SubProductsCamuCamu = ({show}) => {




    return(
        <div className={`${show ? "opacity-[1]" : "opacity-[0]" } absolute left-[100%] top-0 transition-opacity duration-350 ease-in-out`}>
            subproducts
        </div>
    )

}





type UngurahuiProps = {
    cuack : boolean;
    move : () => void;
}

type UngurahuiRefs = {
    hideItems : () => void;
}

const UngurahuiProducts = forwardRef<UngurahuiRefs,UngurahuiProps>(({cuack, move}, ref) => {

    const [active, setActive] = useState<boolean>(false)

    const showSubProducts = () => {
        move();
        setActive(true);
    }


    const hideSubUngurahui = () =>{
        setActive(false)
    }
    useImperativeHandle(ref,()=> ({
        hideItems: hideSubUngurahui,
    }))


    return(
        <div className={"relative"}>
            <h1 onClick={showSubProducts}>ungurahui</h1>
            <SubProductsUngurahui show={active} />
        </div>
    )

})

const SubProductsUngurahui = ({show}) => {

    return(
        <div className={`${show ? "opacity-[1]" : "opacity-[0]"} absolute top-0 left-full transition-opacity duration-350 ease-in-out`}>
            subProducts
        </div>
    )
}


//
// import {useState, useEffect, useRef, useImperativeHandle, forwardRef} from "react";
// import {MenuSide} from "../components/menuSide.tsx";
// import {useGetProducts, Products} from "../hooks/getProducts.tsx";
//
// export type Props = {
//     show?: boolean;
// }
//
// export type Ref = {
//     container: HTMLDivElement | null;
//     childContainer: HTMLDivElement | null;
// }
//
// export const Menu = forwardRef<Ref, Props>(({show}, ref) => {
//     const {products, fruits} = useGetProducts()
//
//     const refContainer = useRef<HTMLDivElement | null>(null);
//     const refHeaderMenu = useRef<HTMLDivElement | null>(null);
//     const [activeFruits, setActiveFruits] = useState<boolean>(false);
//     const [activeSubFruits, setActiveSubFruits] = useState<number | null>(null);
//
//     useImperativeHandle(ref, () => ({
//         container: refContainer,
//         childContainer: refHeaderMenu
//     }))
//
//     return (
//         <MenuSide>
//             <section ref={refContainer} className={`${show ? "opacity-[1] pointer-events-auto" : "opacity-0 pointer-events-none"} z-[10] border-[1px] border-blue-500 transition-all duration-500 ease-in-out bg-white relative overflow-hidden`}>
//                 <div ref={refHeaderMenu} className={"flex justify-between items-center p-4"}>
//                     <svg
//                         onClick={() => { setActiveFruits(false); setActiveSubFruits(null) }}
//                         className={"opacity-[1] cursor-pointer"}
//                         xmlns="http://www.w3.org/2000/svg"
//                         height="24px"
//                         viewBox="0 -960 960 960"
//                         width="24px"
//                         fill="#999999"
//                     >
//                         <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
//                     </svg>
//                     <h1>Productos</h1>
//                     <h1 className={"bg-[lightblue] size-[40px] rounded-full"}></h1>
//                 </div>
//
//                 {/* Contenedor principal con dos paneles */}
//                 <div className="relative h-[400px] overflow-hidden">
//                     {/* Panel de categorías */}
//                     <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${activeFruits ? '-translate-x-full' : 'translate-x-0'}`}>
//                         {fruits.length > 0 && fruits.map(([key, value], index) => (
//                             <div key={key} className={`w-full p-4 border-b hover:bg-gray-50 cursor-pointer`}>
//                                 <h1
//                                     onClick={() => {
//                                         setActiveFruits(true);
//                                         setActiveSubFruits(index)
//                                     }}
//                                     className={`text-lg font-medium`}
//                                 >
//                                     {value[0]?.fruit}
//                                 </h1>
//                             </div>
//                         ))}
//                     </div>
//
//                     {/* Panel de subproductos */}
//                     <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${activeFruits ? 'translate-x-0' : 'translate-x-full'}`}>
//                         {activeSubFruits !== null && fruits[activeSubFruits] && (
//                             <div className="h-full overflow-y-auto">
//                                 <div className="p-4 border-b bg-gray-100">
//                                     <h2 className="text-xl font-bold">{fruits[activeSubFruits][1][0]?.fruit}</h2>
//                                 </div>
//                                 {fruits[activeSubFruits][1].map((product, index) => (
//                                     <div key={product.id} className="p-4 border-b hover:bg-gray-50">
//                                         <h3 className="font-medium">{product.name}</h3>
//                                         <p className="text-sm text-gray-600">${product.price}</p>
//                                         {product.description && product.description.length > 0 && (
//                                             <p className="text-sm text-gray-500 mt-1">{product.description[0]}</p>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </section>
//         </MenuSide>
//     )
// })

