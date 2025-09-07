import {useContext, createContext, useRef, ReactNode, useState, Dispatch, SetStateAction} from 'react';

type RefProcesoContext = {
    refProcess : (HTMLDivElement|null)[];
    checkFormulario : boolean;
    setCheckFormulario : Dispatch<SetStateAction<boolean>>;
}

const ProcesoCompraContext = createContext<RefProcesoContext|null>(null)

type ProcesoCompraProviderProps = {
    children : ReactNode;
}


export const ProcesoCompraProvider = ({children}:ProcesoCompraProviderProps) => {
    // const refProcess = useRef<RefProcesoContext>([]);
    // const refPro = useRef<(React.RefObject<HTMLDivElement>)[]>([]);
    const refProcess = useRef<(HTMLDivElement|null)[]>([]);
    const [checkFormulario, setCheckFormulario] = useState<boolean>(false)


return(
    <ProcesoCompraContext.Provider value={{refProcess : refProcess.current, checkFormulario ,setCheckFormulario, }} >
        {children}
    </ProcesoCompraContext.Provider>
)

}

export const useProceso = () => {
    const context = useContext(ProcesoCompraContext)
    if(!context) throw new Error('No se puede el proceso')
    return context
}
