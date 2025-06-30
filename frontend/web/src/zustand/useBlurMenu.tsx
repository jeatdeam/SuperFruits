import {create} from 'zustand';



type Status = {
    activeBlur: boolean;
    toggleBlur: () => void;
}

export const useBlurMenu = create<Status>((set)=> ({

    activeBlur : false,
    toggleBlur : () => set((state)=>({activeBlur: !state.activeBlur}))
}))

