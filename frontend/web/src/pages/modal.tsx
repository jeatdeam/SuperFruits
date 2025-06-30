import ReactDOM from 'react-dom';
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

type ModalProps = {
    children: React.ReactNode;
    activeBox: boolean;
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({ children, activeBox }, ref) => {
    const modalRoot: HTMLElement | null = document.getElementById('modal');
    const modalContainer = useRef<HTMLDivElement | null>(null);
    // xponemos el ref externo al div interno
    useImperativeHandle(ref, () => modalContainer.current as HTMLDivElement);

    useEffect(() => {

        const app = document.getElementById('root')

        if (!modalContainer.current) return;
        if (activeBox) {
            modalContainer.current.classList.add('showItem');
            modalContainer.current?.classList.remove('hideItem');
            modalContainer.current.style.opacity = '1';
            modalContainer.current.style.pointerEvents = "auto"
            app.style.transition = "all 0.35s ease-in-out"
            app.style.filter = "blur(15px)";
        } else {
            if (modalContainer.current.style.opacity === "1") {
                modalContainer.current.classList.add('hideItem');
            }
            modalContainer.current?.classList.remove('showItem');
            modalContainer.current.style.opacity = '0';
            modalContainer.current.style.pointerEvents = "none"
            app.style.filter = "blur(0)";
        }
    }, [activeBox]);

    return ReactDOM.createPortal(
        <div ref={modalContainer} className={`${activeBox ? "opacity-100":"opacity-0"} fixed top-[200px] left-[50%] -translate-x-[50%] w-[85%] sm:w-[475px] shadow-[0_0_7.5px_rgba(0,0,0,.9)] rounded-[12px]  bg-red-300 transition-opacity duration-300 p-[15px] flex flex-col gap-[15px]`}>

            {children}

        </div>,
        modalRoot
    );
});

