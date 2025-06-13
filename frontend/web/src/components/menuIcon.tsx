import {forwardRef, useEffect, useRef, useState} from "react";
import {Menu, Ref} from "../pages/menu.tsx";



export const MenuIcon = forwardRef<HTMLDivElement, null>((props, ref) => {
    const [active, setActive] = useState<boolean>(false);
    const refMenu = useRef<Ref>(null);
    const refIcon = useRef<SVGSVGElement|null>(null);

    const {container, childContainer} = refMenu.current ?? {}

    const showMenu = () => {
        setActive(false);
    }

    useEffect(() => {
        const container = refMenu.current?.container?.current;
        const icon = refIcon.current;

        const handleClickOutside = (event: MouseEvent) => {
            if (!active) return;

            if (container && !container.contains(event.target as Node) && icon && !icon.contains(event.target as Node)) {
                console.log("estamos fuera del menu");
                setActive(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [active]);


    return (
        <>
            <svg className={" cuack2 rounded-full transition-all duration-500"} onClick={() => setActive(prev=>!prev)} ref={refIcon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
            <Menu show={active} ref={refMenu} toggleMenu={showMenu}/>
        </>
    )
});