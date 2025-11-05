import {create} from 'zustand';


type PropsForm = {
    formToken : string;
    updateValueFormToken : (state:string) => void;
    publicKey : string;
    updatePublicKey : (state:string) => void;
}


export const FormToken = create<PropsForm>((set)=>({
    formToken : '',
    updateValueFormToken : (state) => set({formToken: state}),
    publicKey: '',
    updatePublicKey : (state) => set({publicKey: state})
}))