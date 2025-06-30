import {create} from "zustand";


type Status = {
    activeMenu: boolean;
    toggleMenu: () => void;
    inActiveMenu: () => void;
    refMenu: SVGSVGElement|null;
}


export const useActiveMenu = create<Status>( (set) => ( {
    activeMenu: false,
    toggleMenu: () => set((self) => ( { activeMenu : !self.activeMenu})),
    inActiveMenu: () => set({activeMenu: false}),
    refMenu : null,
}))