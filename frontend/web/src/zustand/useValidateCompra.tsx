import {useState, useEffect} from 'react'
import {create} from "zustand";

type PropsValidate = {
    statusCompra: boolean;
    toggleCompra: () => void;
}


export const useValidateCompra = create<PropsValidate>((set) =>({
    statusCompra : false,
    toggleCompra : () => set((state)=> ({statusCompra: !state.statusCompra})),
}))
