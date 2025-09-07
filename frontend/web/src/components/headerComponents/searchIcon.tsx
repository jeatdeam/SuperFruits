import {forwardRef, useEffect, useRef, useState} from "react";
import {useActive} from "../../zustand/useActiveStore.tsx"
import {Modal} from "../../pages/modal.tsx";
import {useFetchProducts} from "../../hooks/customProducts.tsx";
import {Link} from "react-router-dom";
import {useBlurSearch} from "../../zustand/useBlurSearch.tsx"

export const SearchIcon = ({className}: { className?: string }) => {

    const activeSearch = useActive(state=> state.isActive)
    const changeStatus = useActive(state=> state.toggleActive)
    const setRef = useActive((state) => state);
    const toggleBlur = useBlurSearch(state=> state.toggleBlur);

    const [activeBox, setActiveBox] = useState(false);
    const refInput = useRef<BoxGroup | null>(null);
    const refModal = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLElement | null>(null);
    // sin | null porque ya es handled internamente

    const [clearProducts, setClearProducts] = useState<(() => void) | null>(null);
    const toggleSearch = () => {
        changeStatus();
        toggleBlur();
    }
    useEffect(() => {
        if (activeBox) {
            refInput.current?.input && (refInput.current.input.value = "");
        }
        const hideAfterShow = (e: MouseEvent) => {
            if (refModal.current && !refModal.current?.contains(e.target as Node) && !iconRef.current?.contains(e.target as Node)) {
                setActiveBox(false);
            }
        }

        document.addEventListener('mousedown', hideAfterShow)

        return () => document.removeEventListener('mousedown', hideAfterShow)

    }, [activeBox]);

    useEffect(()=>{
        if(iconRef.current) {
            useActive.setState({ refSearch : iconRef.current});
        }
    },[])

    return (
        <>
            <svg className={className} onClick={toggleSearch} ref={iconRef} xmlns="http://www.w3.org/2000/svg" height="24px"
                 viewBox="0 -960 960 960"
                 width="24px" fill="#999999">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
            {/*<Modal activeBox={activeBox} ref={refModal}>*/}
            {/*    <BoxSearch*/}
            {/*        ref={refInput}*/}
            {/*        closeModal={toggleSearch}*/}
            {/*        // deleteElements={activeBox ? '/products' : null}*/}
            {/*        // onClear={(fn) => setClearProducts(() => fn)}*/}
                {/*/>*/}
            {/*</Modal>*/}
        </>
    );
};

type BoxSearchProps = {
    closeModal: () => void; // 👈 nueva prop
};
type BoxGroup = {
    input: HTMLInputElement | null;
    group: HTMLDivElement | null
}
export type Products = {
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

export const BoxSearch = forwardRef<BoxGroup, BoxSearchProps>(({ closeModal }, ref) => {
    const [products, setProducts] = useState<Products[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const groupRef = useRef<HTMLDivElement | null>(null);
    const refInfo = useRef<HTMLHeadingElement|null>(null);
    const withItems = useRef<boolean|null>(null);
    const [active, setActive] = useState<boolean>(false);
    const [contador,setContador] = useState<number|null>(0);

    const extraerProducts = async () => {

        const txt : string = inputRef.current?.value.toLowerCase() ?? "no hay valores validos";
        const cleanTxt = txt.replace(/\s+/," ");

        console.log(txt)

        if(cleanTxt === " " || cleanTxt === "" ) {
            // console.log(cleanTxt)
            setProducts([])
            // withItems.current = false;
            setActive(false)
            setContador( prev => prev + 1)
            return;
        }

        const options = {
            method: 'POST',
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify({txt})
        }
        const url = "http://localhost:4000/filterProductsBusqueda";
        try{
            const response = await fetch(url,options)
            if(!response.ok) throw new Error('error en la peticion')
            const result = await response.json()
            console.log(result.productosFilter)
            setProducts(result.productosFilter)
            !result.productosFilter.lenght && (setActive(true))
            setContador(prev => prev + 1 )
            // withItems.current = result.void
            // setActive()
        }catch(error){

        }finally {

        }
    }

    const rebootState = () => {

        useActive.setState({isActive: false });
        useBlurSearch.setState({switchBlur : false})
    }

    return (
        <>
            <input
                onInput={extraerProducts}
                ref={inputRef}
                className="w-full bg-red mx-auto block rounded-[7.5px] px-[10px] h-[32.5px] outline-none shadow-[0_0_5px_rgba(0,0,0,.9)] text-gray-700"
                type="text"
                placeholder="busque un producto"
            />
            <div ref={groupRef} className={`flex flex-col gap-[15px] w-full mx-auto min-h-[150px]`}>
                { products.length ?  products.map((el,index) => (
                            <Link key={index} onClick={rebootState} to={`/${el.type_fruit.replace(/\s+/g,"-")}/${el.name_product.replace(/\s+/g,"-")}`}>
                                <div className="showItem transition-all duration-[250] ease-in-out flex justify-between gap-[15px] items-center shadow-[0_0_7.5px_rgba(0,0,0,.9)] rounded-[8px] hover:bg-amber-50 py-[10px] px-[15px]">
                                    <img className={"size-[75px] rounded-[8px] shadow-[0_0_2.5px_rgba(0,0,0,.9)]"} src={el.img_product?.[0]??""} alt={el.name_product} />
                                    <h1 className={"text-start flex-1 "}>{el.name_product}</h1>
                                    <h2 className={"text-start"}>S/. {el.price_product}</h2>
                                </div>
                            </Link>
                        ))
                    : <h1 className={`border border-gray-700 p-[10px] rounded-[8px] whitespace-pre showItem`} ref={refInfo}>
                        <span className={"font-[400]"}>{active?"no hay coincidencias para: ":"Ingrese datos del productos deseado"}</span>
                        { active && <span className={"font-normal text-gray-700"}>{`"${inputRef.current?.value}"` }</span>}
                    </h1>
                }
            </div>
        </>
    );
});