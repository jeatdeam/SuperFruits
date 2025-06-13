import ReactDOM from "react-dom";


export const MenuSide = ({children}) => {

    const menuSide = document.getElementById('menuSide');




    const portalNode = (
        <section onClick={()=> console.log('me estas haciendo click')} className="fixed pointer-events-none left-0 top-[500px] z-[2] w-[275px] h-[350px] rounded-[12px]">
            {children}
        </section>
    )

    return ReactDOM.createPortal(portalNode, menuSide)
}