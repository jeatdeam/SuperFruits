import {forwardRef, useEffect, useRef, useState} from "react";
import {Menu, Ref} from "../pages/menu.tsx";



export const MenuIcon = forwardRef<HTMLDivElement, null>((props, ref) => {
    const [active, setActive] = useState<boolean>(false);
    const refMenu = useRef<Ref>(null);
    const refIcon = useRef<SVGSVGElement|null>(null);

    const {container, childContainer} = refMenu.current ?? {}

    const showMenu = () => {
        setActive(prev => !prev);
    }

    useEffect(() => {

        const hideMenu = (event: MouseEvent) => {
            if (refMenu.current && refMenu.current.container ){
                if (!container.current.contains(event.target as Node) && !refIcon.current?.contains(event.target as Node) ) {
                    setActive(false);
                }
            }
        }
        if (active) {
            document.addEventListener('mousedown', hideMenu);
        } else {
            document.removeEventListener('mousedown', hideMenu);
        }

        return () => {
            document.removeEventListener('mousedown', hideMenu);
        };
    }, [active]);

    return (
        <>
            <svg className={"cuack2 rounded-full transition-all duration-500"} onClick={showMenu} ref={refIcon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
            <Menu show={active} ref={refMenu}/>
        </>
    )
});