import {create} from 'zustand'


type Props = {
    switchBlur: boolean;
    toggleBlur: () => void;
}

export const useBlurSearch = create<Props>((set) => (
    {
        switchBlur : false,
        toggleBlur : () => set((self) => ( { switchBlur: !self.switchBlur })),
    }
))