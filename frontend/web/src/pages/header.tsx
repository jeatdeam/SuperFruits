import {useRef, useState, useEffect, forwardRef, useImperativeHandle, act} from "react";
import { Modal } from "./Modal";
import {Menu, Ref} from "./menu";
import {useFetchProducts} from "../hooks/customProducts.tsx";
import {Carrito, CarritoRefs} from "./carrito.tsx"
import {NavBar} from "./navigationBar.tsx"
import {Link} from "react-router-dom"
// import { BoxSearch } from "./BoxSearch"; // asumiendo que lo separas también

export function Header() {
    const refImg = useRef<HTMLImageElement|null>(null)

    const redirectIndex = () => {
        window.location.href="/"
    }

    return (
        <>
            <header
                className={"h-[250px] w-[80%] bg-[lightblue] flex justify-between items-center mx-auto rounded-[8px] border-[5px] border-[green]"}>

                <div className={"flex justify-between items-center w-full"}>
                    <Link to="/">
                        <img className="size-[150px]"
                             src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1746066848/22529f942d0ede6fc6350f2c53560a33_wyf0oh.jpg"
                             alt="superFruts"
                             // onClick={redirectIndex}
                             ref={refImg}/>
                    </Link>
                    <nav className={"flex gap-[25px] items-center"}>
                        <SearchIcon
                            className="rounded-full transition-all duration-500 hover:ring-2 ring-black ring-offset-[6px] hover:bg-white"
                        />
                        <BagIcon/>
                        <SettingsSight/>
                        <MenuIcon/>
                    </nav>
                </div>

            </header>
            {/*<NavBar>*/}
            {/*    <div>Aqui esta el navBar nuevo</div>*/}
            {/*</NavBar>*/}
        </>
    )
}

export const SearchIcon = ({className}: { className?: string }) => {
    const [activeBox, setActiveBox] = useState(false);
    const refInput = useRef<BoxGroup | null>(null);
    const refModal = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLElement | null>(null);
    // sin | null porque ya es handled internamente
    const toggleSearch = () => setActiveBox(prev => !prev);
    const [clearProducts, setClearProducts] = useState<(() => void) | null>(null);
    useEffect(() => {
        if (activeBox) {
            refInput.current?.input && (refInput.current.input.value = "");
            // clearProducts(); // 👈 Limpia productos reactivamente
        }
        const hideAfterShow = (e: MouseEvent) => {
            if (refModal.current && !refModal.current?.contains(e.target as Node) && !iconRef.current?.contains(e.target as Node)) {
                setActiveBox(false);
            }
        }

        document.addEventListener('mousedown', hideAfterShow)

        return () => document.removeEventListener('mousedown', hideAfterShow)

    }, [activeBox]);


    return (
        <>
            <svg className={className} onClick={toggleSearch} ref={iconRef} xmlns="http://www.w3.org/2000/svg" height="24px"
                 viewBox="0 -960 960 960"
                 width="24px" fill="#999999">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
            <Modal activeBox={activeBox} ref={refModal}>
                <BoxSearch
                    ref={refInput}
                    deleteElements={activeBox ? '/products' : null}
                    onClear={(fn) => setClearProducts(() => fn)}
                />
            </Modal>
        </>
    );
};
type BoxSearchProps = {
    deleteElements: string | null;
    onClear?: () => void; // 👈 nueva prop
};
type BoxGroup = {
    input: HTMLInputElement | null;
    group: HTMLDivElement | null
}

const BoxSearch = forwardRef<BoxGroup, BoxSearchProps>(({ deleteElements, onClear }, ref) => {
    const [withElements, setWidthElements] = useState<string|null>(deleteElements);
    const [products, setProducts] = useState<any[]>([]);
    const { data } = useFetchProducts(deleteElements);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const groupRef = useRef<HTMLDivElement | null>(null);
    const inputEvent = (): void => {
        if (data) {
            setProducts([...data]);
        }
    };
    useImperativeHandle(ref, () => ({
        input: inputRef.current,
        group: groupRef.current,
    }));

    useEffect(()=>{
        if(deleteElements===null){
            setProducts([]);
        }else{
        }
    },[deleteElements])

    return (
        <>
            <input
                onInput={inputEvent}
                ref={inputRef}
                className="w-[90%] bg-white mx-auto block rounded-[7.5px] px-[10px]"
                type="text"
                placeholder="busque un producto"
            />
            <div ref={groupRef} className={"border-[5px] border-[orange] w-[90%] mx-auto"}>
                {products.map((el) => (
                    <div key={el.id} className="flex justify-evenly">
                        <img src={el.img} alt={el.name} />
                        <h1>{el.name}</h1>
                        <h2>{el.price}</h2>
                    </div>
                ))}
            </div>
        </>
    );
});



const BagIcon = () => {

    const [url, setUrl] = useState<string|null>(null);
    const { data, loading, error } = useFetchProducts(url)
    const [validate, setValidate] = useState<boolean>(false);
    const [shortInfo, setShortInfo] = useState<boolean>(false);
    const refCarrito = useRef<CarritoRefs|null>(null);
    const refIcon = useRef<SVGSVGElement|null>(null);

    const getInfo = () : void =>{


        if(refCarrito.current) {
            const {carrito, access} = refCarrito.current ?? {};
            access();
        }

        setUrl('/products');
        setValidate(prev=>!prev)
    }

    const hideCarrito = ( e : MouseEvent) => {

        if(refIcon.current && !refCarrito.current?.carrito.contains(e.target as Node) && !refIcon.current.contains(e.target as Node) ) {
            refCarrito.current.access();
            setValidate(false);
        }

    }

    const showShort = () => {
        setShortInfo(true);
    }
    const hideShort = () => {
        setShortInfo(false)
    }

    useEffect(()=>{

        if(validate) {
            document.addEventListener('mousedown',hideCarrito);
        } else {
            document.removeEventListener('mousedown',hideCarrito);
        }
        // if(shortInfo) {
        //
        // } else {
        //
        // }



        return () => {
            document.removeEventListener('mousedown',hideCarrito);
        }
    },[validate])


    return (
        <div className={"relative"}>
            <svg
                ref={refIcon}
                className={"rounded-full transition-all duration-500 hover:ring-2 ring-black ring-offset-[6px] hover:bg-white"}
                onClick={getInfo} onMouseDown={hideCarrito} onMouseEnter={showShort} onMouseLeave={hideShort} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                fill="#999999">
                <path
                    d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/>
            </svg>
            <Carrito ref={refCarrito} validate={validate}/>
            <div className={`${shortInfo ? "opacity-100" : "opacity-0"} transition-element size-[20px] bg-[pink] rounded-full absolute top-[-120%] left-[50%] translate-x-[-50%] center-flex text-[10px]`}>
                0
            </div>
        </div>
    )
}
const SunIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path
                d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/>
        </svg>
    )
}
const MoonIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path
                d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
        </svg>
    )
}
const SettingsSight = () => {
    return (
        <svg className={"rounded-full transition-all duration-500 hover:ring-2 ring-black ring-offset-[6px] hover:bg-white"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path
                d="M680-80q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80Zm88-114q5-5 2.5-12t-9.5-8q-26-5-48.5-19.5T676-272q-14-24-15.5-51t7.5-52q2-7-2.5-12.5T654-391q-67 12-91.5 76T582-196q35 44 92 45t94-43ZM480-480ZM370-80l-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-74 56q-22-11-45-18.5T714-558l63-48-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q17 17 36.5 30.5T400-275q1 57 23.5 107T484-80H370Zm41-279q6-20 14.5-38.5T445-433q-11-8-17-20.5t-6-26.5q0-25 17.5-42.5T482-540q14 0 27 6.5t21 17.5q17-11 35-19.5t38-13.5q-18-32-50-51.5T482-620q-59 0-99.5 41T342-480q0 38 18.5 70.5T411-359Z"/>
        </svg>
    )
}

const MenuIcon = forwardRef<HTMLDivElement, null>((props, ref) => {
    const [active, setActive] = useState<boolean>(false);
    const refMenu = useRef<Ref>(null);
    const refIcon = useRef<SVGSVGElement|null>(null);

    const {container, childContainer} = refMenu.current ?? {}

    const showMenu = () => {
        setActive(prev => !prev);
    }

    useEffect(() => {

        const hideMenu = (event: MouseEvent) => {
            if (refMenu.current && refMenu.current.container ){
                if (!container.current.contains(event.target as Node) && !refIcon.current?.contains(event.target as Node) ) {
                    setActive(false);
                }
            }
        }
        if (active) {
            document.addEventListener('mousedown', hideMenu);
        } else {
            document.removeEventListener('mousedown', hideMenu);
        }

        return () => {
            document.removeEventListener('mousedown', hideMenu);
        };
    }, [active]);

    return (
        <>
            <svg className={"cuack2 rounded-full transition-all duration-500"} onClick={showMenu} ref={refIcon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
            <Menu show={active} ref={refMenu}/>
        </>
    )
});

