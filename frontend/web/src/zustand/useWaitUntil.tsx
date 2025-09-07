import {create} from 'zustand'

type WaitUntil = {
    statusSpinner: boolean;
    changeStatusSpinner: () => void;
}


export const useWaitUntil = create<WaitUntil>((set,get) => ({
    statusSpinner : false,
    changeStatusSpinner: () => set((state)=>({statusSpinner: !state.statusSpinner})),

}))