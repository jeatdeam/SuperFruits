import {act, useEffect, useRef} from "react";
import {useActive} from "../../zustand/useActiveStore.tsx";
import {BoxSearch} from "./searchIcon.tsx";
import {useBlurMenu} from "../../zustand/useBlurMenu.tsx";
import {useBlurSearch} from "../../zustand/useBlurSearch.tsx";

export const ContainerSearch = () => {

    const refBox = useRef<HTMLDivElement|null>(null);
    // const [isActive, setIsActive] = useState<boolean>(true);
    const body = document.querySelector('body');
    const activeSearch = useActive(state=> state.isActive)

    useEffect(() => {

        const closeBox = (e: MouseEvent) => {
            const currentRefSearch = useActive.getState().refSearch;

            const switchBlur = useBlurSearch.getState().switchBlur
            if (
                refBox.current &&
                !refBox.current.contains(e.target as Node) &&
                currentRefSearch &&
                !currentRefSearch.contains(e.target as Node) &&
                body?.contains(e.target as Node) &&
                switchBlur
            ) {
                useActive.getState().isInactive();
                useBlurSearch.setState({ switchBlur: false})
            }
        };


        body.addEventListener("click", closeBox);
        return () => body.removeEventListener("click", closeBox);
    }, []);

    useEffect(() => {

        // if(activeSearch) {
        //     body.style.filter = "blur(10px)"
        // }
        //
        // return () => { body.style.filter = ""}

    },[activeSearch])


    return(
        <div ref={refBox} className={`${ activeSearch ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" } transition-half top-[200px] left-1/2 -translate-x-1/2 p-[15px] flex flex-col gap-[20px] rounded-[8px] shadow-shadowElement fixed bg-blue-300 w-[500px]`}>
            <BoxSearch/>
        </div>
    )
}