import {useState, useEffect, useRef, forwardRef} from 'react'
import {useFetchProducts} from "../../hooks/customProducts.tsx"



const Check = () => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path
                d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
        </svg>
    )
}
const Key = () => {
    const { data, loading, error, fetchData } = useFetchProducts();
    const refCuack = useRef<HTMLDivElement | null>(null);
    const refButton = useRef<HTMLButtonElement | null>(null);

    const initAnimation = (): void => {
        if (refButton.current) {
            refButton.current.style.transition = "all 0.5s linear";
            refButton.current.style.height = "35px";
            refButton.current.style.width = "75px";
            refButton.current.textContent = "";
        }

        if (refCuack.current) {
            refCuack.current.style.opacity = "1";
            refCuack.current.classList.add("animateCuack");
        }

        // Disparamos la petición al hacer click
        fetchData("/products");
    };

    useEffect(() => {
        if (!loading && refCuack.current) {
            refCuack.current.style.opacity = "0";

            refCuack.current.addEventListener(
                "transitionend",
                () => {
                    refCuack.current?.classList.remove("animateCuack");
                    if (refButton.current) {
                        refButton.current.textContent = "Click me";
                    }
                },
                { once: true }
            );
        }
    }, [loading]);

    return (
        <div className="containerCheck flex items-center justify-center">
            <button
                ref={refButton}
                onClick={initAnimation}
                className="border p-2 rounded bg-[pink]"
            >
                Click me
            </button>
            <div
                ref={refCuack}
                className="cuack pointer-events-none size-[25px] absolute rounded-full transition-opacity duration-500 linear"
            />
        </div>
    );
};


export function Candado() {


    return (
        <>
            <Check/>
            <Key/>
        </>
    )
}