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
        <div
            ref={modalContainer}
            className="fixed top-[200px] left-[50%] -translate-x-[50%] w-[600px] border-[5px] border-[green] bg-[lightblue] transition-opacity duration-300"
        >
            {children}
        </div>,
        modalRoot
    );
});

//
// import ReactDOM from 'react-dom';
// import { useRef } from 'react';
//
// export const Modal = ({
//                           children,
//                           activeBox,
//                       }: {
//     children: React.ReactNode;
//     activeBox: boolean;
// }) => {
//     const modalRoot: HTMLElement | null = document.getElementById('modal');
//     const modalContainer = useRef<HTMLDivElement | null>(null);
//
//     if (!modalRoot) return null;
//
//     return ReactDOM.createPortal(
//         <div
//             ref={modalContainer}
//             className={`
//         fixed top-[200px] left-[50%] -translate-x-1/2 z-50
//         transition-all duration-300 ease-in-out
//         ${activeBox ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
//         bg-[lightblue] border-[5px] border-[green] rounded-lg size-[600px]
//       `}
//         >
//             {children}
//         </div>,
//         modalRoot
//     );
// };
