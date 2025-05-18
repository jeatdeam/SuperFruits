import  {createPortal} from "react-dom";
import {useState, useEffect, useRef, forwardRef, } from 'react';
import {ReactNode} from "react";


type PropsNavBar = {
    children : ReactNode;
}

export const NavBar  = ({children}: PropsNavBar) => {
    const portalRoot = document.getElementById('navBar');
    if(!portalRoot) return null;
    const body = document.querySelector('body');


    useEffect(()=>{

    },[])

        return createPortal(
            <section className={"clampNavBar rounded-[50px] h-[100px] bg-[purple] fixed left-1/2 top-[5%] translate-x-[-50%] px-[25px] py-[10px]"}>
                <nav>
                    {children}
                </nav>
            </section>,
            portalRoot
        )
    }
