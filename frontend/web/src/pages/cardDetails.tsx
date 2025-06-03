import {useState, useEffect, useRef, useImperativeHandle, forwardRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import ReactDOM from "react-dom";


export type RefsCard = {
    showInfo : () => void;
    card : HTMLDivElement | null
}
type PropsCard = {
    children : React.ReactNode;
    refSection : HTMLDivElement[] | null
}


export const CardDetails = forwardRef<RefsCard, PropsCard>(({children, refSection},ref) => {
    const [active, setActive] = useState<boolean>(false)
    const refCard = useRef<HTMLDivElement|null>(null);
    const refClose = useRef<SVGSVGElement|null>(null)

    const portalCard = document.getElementById('cardDetails');
    if (!portalCard) return null;

    const createDetails = () => {
        console.log('se activo')
        setActive(true );  // !prev
    }
    const closeDetails = () => {
        setActive(false);
    }

    useImperativeHandle( ref, () => ({
        showInfo : createDetails,
        card : refCard.current,
    }))

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => !refCard.current?.contains(e.target as Node )&& closeDetails()

        active ?
            refSection.current?.forEach( div => div && (div.style.pointerEvents="none"))
            : refSection.current?.forEach( div => div && (div.style.pointerEvents="auto"))

        active &&  document.addEventListener('mousedown', handleClickOutside);

        const root = document.getElementById('root');
        if(active) {
            root && (root.style.filter = "blur(10px)")
        } else {
             root && (root.style.filter = "blur(0)")
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            const root = document.getElementById("root");
            if (root) root.style.filter = "blur(0)";
            refSection.current?.forEach( div => div && (div.style.pointerEvents="auto"))
        };

    }, [active]);




    return ReactDOM.createPortal(
        <section ref={refCard}
                 className={`${active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} size-[700px] mx-auto bg-[orange] fixed top-1/2 left-1/2 -translate-1/2`}>
            <svg ref={refClose} onMouseDown={closeDetails} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
                <path
                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        </section>,
            portalCard
    )
})