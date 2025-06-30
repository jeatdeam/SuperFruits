import {create} from 'zustand';

type Status = {
    isActive : boolean;
    toggleActive: () => void;
    refSearch : SVGSVGElement|null;
    isInactive : () => void;
}

export const useActive = create<Status>( (set)=> (
    {
        isActive : false,
        toggleActive : () => set((self) => ( { isActive : !self.isActive})),
        refSearch : null,
        isInactive : () => set({ isActive : false })
    }
))



