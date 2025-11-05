import {create} from 'zustand'


type FormProps = {
    statusForm: boolean;
    changeStatusForm: () => void;
    restartForm: () => void;
    completeForm: boolean;
    toggleCompleteForm: () => void;
}

export const useCompleteForm = create<FormProps>((set)=>({
    statusForm: false,
    changeStatusForm : () => set((state)=>({statusForm:!state.statusForm})),
    restartForm: () => set(({statusForm: false})),
    completeForm: false,
    toggleCompleteForm: () => set((state)=>({completeForm:!state.completeForm}))
}))