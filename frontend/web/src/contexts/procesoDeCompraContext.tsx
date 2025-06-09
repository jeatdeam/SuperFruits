import {useContext, createContext, useRef, ReactNode} from 'react';

//
// type RefProcesoContext = {
//     refProcess : React.RefObject<HTMLDivElement>[];
// }
// type RefProcesoContext = {
    // refProcess : <(HTMLDivElement|null)[]>;
    // }

type RefProcesoContext = {
    refProcess : (HTMLDivElement|null)[];
}

const ProcesoCompraContext = createContext<RefProcesoContext|null>(null)

type ProcesoCompraProviderProps = {
    children : ReactNode;
}


export const ProcesoCompraProvider = ({children}:ProcesoCompraProviderProps) => {
    // const refProcess = useRef<RefProcesoContext>([]);
    // const refPro = useRef<(React.RefObject<HTMLDivElement>)[]>([]);
    const refProcess = useRef<(HTMLDivElement|null)[]>([]);
return(
    <ProcesoCompraContext.Provider value={{refProcess : refProcess.current}} >
        {children}
    </ProcesoCompraContext.Provider>
)

}

export const useProceso = () => {
    const context = useContext(ProcesoCompraContext)
    if(!context) throw new Error('No se puede el proceso')
    return context
}
