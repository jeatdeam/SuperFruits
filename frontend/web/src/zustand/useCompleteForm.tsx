import {create} from "zustand";



 export const useCompleteForm = create((set,get)=>({
    statusForm : false,
    changeStatusForm : () => set((state)=> ({statusForm: !state.statusForm})),
    restartForm : () => set({statusForm: false}),
}))


