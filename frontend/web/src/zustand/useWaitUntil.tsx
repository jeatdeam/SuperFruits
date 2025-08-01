import {create} from 'zustand'



export const useWaitUntil = create((set,get) => ({
    statusSpinner : false,
    changeStatusSpinner: () => set((state)=>({statusSpinner: !state.statusSpinner})),

}))