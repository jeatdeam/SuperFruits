import {useState, useEffect, useRef, useImperativeHandle, forwardRef} from "react";



export type Props = {
    show? : boolean;
}
export type Ref = {
    container : HTMLDivElement | null;
    childContainer : HTMLDivElement | null;
}

type BackRefs = {
    hideItems : () => void;
}

export const Menu = forwardRef<Ref,Props>(({show}, ref) => {

    const refContainer = useRef<HTMLDivElement|null>(null);
    const refHeaderMenu = useRef<HTMLDivElement|null>(null);
    const [isActive, setIsActive] = useState<boolean>(show);
    const [activeTitles, setActiveTitles] = useState<boolean>(false);
    const refTitles = useRef<HTMLDivElement|null>(null)
    const signalSub = useRef<boolean>(false);
    const handleShow = useRef<BackRefs|null>(null);
    const handleShowTwo = useRef<BackRefs|null>(null);
    const handleShowThree = useRef<BackRefs|null>(null);

    const moveTitles = () => {
        refTitles.current.style.transform = "translateX(-100%)"
        setActiveTitles(true)
    }

    const backItems = () => {
        if(activeTitles) {
            activeTitles && (refTitles.current.style.transform = "translateX(0)")
            handleShow.current && handleShow.current.hideItems();
            handleShowTwo.current && handleShowTwo.current.hideItems();
            handleShowThree.current && handleShowThree.current.hideItems();
        } else {
            console.log('para actuar se necesita true y el valor actual de activeTitles es -> ',activeTitles)
        }
    }

    useImperativeHandle(ref, () => ({
        container : refContainer,
        childContainer: refHeaderMenu
    }))
    useEffect(()=>{
        show ? refContainer.current.style.left="0" : refContainer.current.style.left="-100%"
    },[show])

    return(
            <section ref={refContainer} className={`${show? "opacity-[1]" : "opacity-[0]"} fixed top-[500px] border-[10px] border-blue-500 size-[300px] z-[5] transition-all duration-500 ease-in-out`}>
                <div ref={refHeaderMenu} className={"flex justify-between items-center"}>
                    <svg onClick={backItems} className={"opacity-[1]"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="#999999">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                    <h1>Productos</h1>
                    <h1 className={"bg-[lightblue] size-[40px] rounded-full"}></h1>
                </div>
                <div ref={refTitles} className={"transition-all duration-500 ease-in-out"}>
                    <AguajeProducts ref={handleShow} cuack={show} move={moveTitles} back={backItems} estado={signalSub}/>
                    <CamuCamuProducts ref={handleShowTwo} cuack={show} move={moveTitles}/>
                    <UngurahuiProducts ref={handleShowThree} cuack={show} move={moveTitles} />
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




