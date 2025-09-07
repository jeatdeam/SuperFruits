import {create} from "zustand";

type CompleteFormState = {
    statusForm : boolean;
    changeStatusForm : () => void;
    restartForm: () => void;
}

 export const useCompleteForm = create<CompleteFormState>((set,get)=>({
    statusForm : false,
    changeStatusForm : () => set((state)=> ({statusForm: !state.statusForm})),
    restartForm : () => set({statusForm: false}),
}))


