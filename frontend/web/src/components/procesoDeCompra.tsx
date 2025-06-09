import {useRef, useEffect, forwardRef} from "react";
import {useProceso} from "../contexts/procesoDeCompraContext.tsx"
import {useCarrito} from "../contexts/carritoContext.tsx";
import {useGetCarrito} from "../hooks/getCarritoMap.tsx";

export const ProcesoDeCompra = () => {
    const {refProcess} = useProceso();
    const {count} = useCarrito()

    useEffect(()=>{
        // refProcess[1]?.classList.add('animate-process')
        console.log(refProcess)
        console.log('cuanto es ', count)
    })

    return(
        <section className="containerProcess w-full h-[100px] bg-orange-500 flex items-center px-[5%]">
            <div className={"relative processOne flex-1 bg-white h-[5px]"}>

                <div className={"size-[25px] bg-blue-300 absolute left-0 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[12.5px] z-[2]"}>1</div>
                <div className={"whitespace-pre-line bg-blue-300 absolute left-0 top-[500%] -translate-y-1/2 rounded-full flex items-center justify-center text-[12.5px] z-[2]"}>{ count ? <Check/> : <ShoppingCar/> }</div>

                <ProcessOne ref={(cuack)=>refProcess.push(cuack)} styleProps={"w-full h-full absolute   origin-left z-[1]"}/>
            </div>
            <div className={"relative processTwo flex-1 bg-white h-[5px]"}>
                <div
                    className={"size-[25px] bg-blue-300 absolute left-0 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[12.5px] z-[2]"}>2
                </div>
                <ProcessTwo ref={(cuack)=>refProcess.push(cuack)} styleProps={"w-full h-full absolute   origin-left z-[1]"}/>
            </div>
            <div className={"relative processThree flex-1 bg-white h-[5px]"}>
                <div
                    className={"size-[25px] bg-blue-300 absolute left-0 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[12.5px] z-[2]"}>3
                </div>
                <ProcessThree ref={(cuack)=>refProcess.push(cuack)}
                     styleProps={"w-full h-full absolute   origin-left z-[1]"}/>
            </div>
            <div className={"relative processFour flex-1 bg-white h-[5px]"}>
                <div
                    className={"size-[25px] bg-blue-300 absolute left-0 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[12.5px] z-[2]"}>4
                </div>
                <div
                    className={"size-[25px] bg-blue-300 absolute right-0 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[12.5px] z-[2]"}>5
                </div>
                <ProcessFour ref={(cuack)=>refProcess.push(cuack)}
                     styleProps={"w-full h-full absolute  origin-left z-[1]"}/>
            </div>
        </section>
    )
}


const Check = () => {
    return (
        <svg className={"showItem"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>
    )
}

const ShoppingCar = () => {
   return(
       <svg className={"showItem"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
        <path
            d="m634-440-81-80h69l110-200H353l-80-80h525q23 0 35.5 19.5t.5 42.5L692-482q-11 20-28 31t-30 11ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm540 52L566-280H304q-44 0-67-37.5t-3-78.5l42-86-72-162L28-820l56-56L876-84l-56 56ZM486-360l-80-80h-62l-40 80h182Zm136-160h-69 69Zm58 440q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80Z"/>
    </svg>
   )
}


type ProcessProps = {
    styleProps: string;
}
// type ProcessRef = {
//     cuack : HTMLDivElement
// }

const ProcessOne = forwardRef<HTMLDivElement, ProcessProps>(({styleProps}, ref) => {
    const {count} = useCarrito()


    useEffect(() => {
        count && console.log(count, 'cuacksote')
    }, [count]);

    return (
        <div ref={ref} className={`${styleProps} ${count ? "animate-process" : ""}`}/>
    )
})


const ProcessTwo = forwardRef<HTMLDivElement, ProcessProps>(({styleProps}, ref) => {

    return (
        <div ref={ref} className={`${styleProps}`}/>
)
})
const ProcessThree = forwardRef<HTMLDivElement,ProcessProps>(({styleProps}, ref) => {


    return (
        <div ref={ref} className={`${styleProps}`}/>
    )
})
const ProcessFour = forwardRef<HTMLDivElement,ProcessProps>(({styleProps},ref) => {

    return(
        <div ref={ref} className={`${styleProps}`}/>
    )
})