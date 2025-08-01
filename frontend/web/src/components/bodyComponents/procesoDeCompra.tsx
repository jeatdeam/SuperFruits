import {useRef, useEffect, forwardRef} from "react";
import {useProceso} from "../../contexts/procesoDeCompraContext.tsx"
import {useCarrito} from "../../contexts/carritoContext.tsx";
import {useGetCarrito} from "../../hooks/getCarritoMap.tsx";
import {useBlurSearch} from "../../zustand/useBlurSearch.tsx";
import {useBlurMenu} from "../../zustand/useBlurMenu.tsx"

export const ProcesoDeCompra = () => {
    const {refProcess, checkFormulario} = useProceso();
    const {count} = useCarrito()
    const {switchBlur, toggleBlur } = useBlurSearch()
    const {activeBlur} = useBlurMenu()

    useEffect(()=>{
        // refProcess[1]?.classList.add('animate-process')
        // console.log(refProcess)
        // console.log('cuanto es ', count)
    })

    return(
        <section className={`${switchBlur ? "blur-[10px]": ""} ${activeBlur ? "blur-[10px]" : ""} containerProcess w-[80%] xl:w-[1280px] h-[100px] flex items-center px-[5%] mx-auto`}>
            <div className={"relative processOne flex-1 bg-white h-[5px]"}>

                <div className={"absolute flex flex-col translate-y-[-50%] z-[2]"}>
                    <div className={"size-[25px] bg-blue-300 rounded-full flex items-center justify-center text-[12.5px] z-[2]"}> 1 </div>
                    <div className={"shadow-[0_0_0_2.5px_rgba(173,216,230,1)] size-[20px] whitespace-pre-line absolute left-1/2 translate-x-[-50%] bg-white rounded-full top-[125%] flex items-center justify-center text-[12.5px] z-[2]"}>{count ?
                        <Check/> : <ShoppingCar/>}
                    </div>
                </div>
                <ProcessOne ref={(cuack) => refProcess.push(cuack)} styleProps={"w-full h-full absolute border border-gray-400 origin-left z-[1]"}/>
            </div>

            <div className={"relative processTwo flex-1 bg-white h-[5px]"}>
                <div className={"absolute flex flex-col items-center h-[60px] gap-[4px] z-[2]"}>
                    <div className={"size-[25px] bg-blue-300  left-[-5px]  -translate-y-1/2 rounded-full flex items-center justify-center text-[12.5px] z-[2]"}> 2 </div>
                    <div className={"size-[20px] bg-white rounded-full shadow-[0px_0px_0px_2px_rgba(173,216,230,1)] -translate-y-1/2 flex items-center justify-center"}>
                        {checkFormulario? <Check/> : <FormIcon/>}
                    </div>
                </div>
                <ProcessTwo ref={(cuack)=>refProcess.push(cuack)} styleProps={"w-full h-full absolute  border border-gray-400 origin-left z-[1]"}/>
            </div>

            <div className={"relative processThree flex-1 bg-white h-[5px]"}>
                <div className={"absolute flex flex-col items-center h-[60px] gap-[4px]"}>
                    <div
                        className={"size-[25px] bg-blue-300  left-[-5px]  -translate-y-1/2 rounded-full flex items-center justify-center text-[12.5px] z-[2]"}> 2
                    </div>
                    <div
                        className={"size-[20px] bg-white rounded-full shadow-[0px_0px_0px_2px_rgba(173,216,230,1)] -translate-y-1/2 flex items-center justify-center"}>
                        {0 ? <Check/> : <FormIcon/>}
                    </div>
                </div>
                <ProcessThree ref={(cuack) => refProcess.push(cuack)}
                              styleProps={"w-full h-full absolute  border border-gray-400 origin-left z-[1]"}/>
            </div>
            <div className={"relative processFour flex-1 bg-white h-[5px]"}>
                <div
                    className={"size-[25px] bg-blue-300 absolute left-[-5px] top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[12.5px] z-[2]"}>4
                </div>
                <div
                    className={"size-[25px] bg-blue-300 absolute right-[-20px] top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[12.5px] z-[2]"}>5
                </div>
                <ProcessFour ref={(cuack)=>refProcess.push(cuack)}
                     styleProps={"w-full h-full absolute  border border-gray-400 origin-left z-[1]"}/>
            </div>
        </section>
    )
}


const Check = () => {
    return (
        <svg className={"showItem size-[15px]"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>
    )
}

const ShoppingCar = () => {
   return(
       <svg className={"showItem size-[15px]"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
        <path
            d="m634-440-81-80h69l110-200H353l-80-80h525q23 0 35.5 19.5t.5 42.5L692-482q-11 20-28 31t-30 11ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm540 52L566-280H304q-44 0-67-37.5t-3-78.5l42-86-72-162L28-820l56-56L876-84l-56 56ZM486-360l-80-80h-62l-40 80h182Zm136-160h-69 69Zm58 440q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80Z"/>
    </svg>
   )
}

const FormIcon = () => {


    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path
                d="m840-234-80-80v-446h-80v120H434L234-840h133q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v526ZM480-760q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Zm166 560L200-646v446h446Zm-446 80q-33 0-56.5-23.5T120-200v-526l-65-65 57-57 736 736-57 57-65-65H200Z"/>
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
    const {checkFormulario} = useProceso();


    return (
        <div ref={ref} className={`${styleProps} ${checkFormulario ? "animate-process" : "" }`}/>
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