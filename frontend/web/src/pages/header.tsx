import {useRef, useState, useEffect, forwardRef, useImperativeHandle, act} from "react";
import {BagIcon} from "../components/bagIcon.tsx"
import {MenuIcon} from "../components/menuIcon.tsx"
import {SettingsSight} from "../components/settingsSight.tsx";
import {SearchIcon} from "../components/searchIcon.tsx";
import {ProcesoDeCompra} from "../components/procesoDeCompra.tsx"
import ReactDOM from "react-dom";
import {Link} from "react-router-dom"
import {Options} from "autoprefixer";



export function Header() {
    const refImg = useRef<HTMLImageElement|null>(null)
    const refHeader = useRef<HTMLDivElement|null>(null);
    const [activeOptions, setActiveOptions] = useState<boolean>(false)

    const redirectIndex = () => {
        window.location.href="/"
    }

    useEffect(()=>{

        const observer = new IntersectionObserver(([entry])=>{

            // setDesacoplar(!entry.isIntersecting)

            // if(activeOptions && entry.isIntersecting) setDesacoplar(false)

            setDesacoplar(!entry.isIntersecting)


        }, {root: null, threshold: 0});

        refHeader.current && observer.observe(refHeader.current);

        return () => {
            refHeader.current && observer.unobserve(refHeader.current);
        }

    },[activeOptions])

    const [desacoplar, setDesacoplar] = useState<boolean>(false);
    const cuacksito = useRef<HTMLDivElement|null>(null)

    useEffect(()=>{



    },[desacoplar])



    return (
        <>
            <header ref={refHeader}
                    className="gaaa w-full h-[200px] bg-pink-200 flex flex-col items-center justify-center">

                { !desacoplar && <div className={`relative mx-auto w-[90%] xs:w-[80%] xl:w-[1024px] flex justify-between items-center rounded-[16px] z-10`}>

                <div className="flex justify-between items-center w-full px-[25px] relative">
                    <Link to="/">
                        <img
                            className="size-[75px]"
                            src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1746066848/22529f942d0ede6fc6350f2c53560a33_wyf0oh.jpg"
                            alt="superFruts"
                            ref={refImg}
                        />
                    </Link>
                    <nav className="gapIcons flex items-center">
                        <SearchIcon
                            className="rounded-full transition-all duration-500 hover:ring-2 ring-black ring-offset-[3px] hover:bg-white"/>
                        <BagIcon/>
                        <SettingsSight/>
                        <MenuIcon/>
                    </nav>
                </div>

                {/* fondo borroso debajo */}
                <div
                    className="absolute inset-0 h-[75px] z-[-1] rounded-[16px] backdrop-blur-md border border-white/30 shadow-md"/>

            </div> }

            </header>
             <div className={"h-[75px] sticky top-[37.5px] z-10 mx-auto w-[90%] xs:w-[80%] xl:w-[1024px] mb-[-75px]"}>
               { desacoplar &&

                   <div ref={cuacksito} className={` ${desacoplar ? "animate-heightUp" : "" }  flex justify-between items-center rounded-[16px] z-[30] `}>

                        <div className="flex justify-between items-center w-full px-[25px] relative">
                            <Link to="/">
                                <img
                                    className="size-[75px]"
                                    src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1746066848/22529f942d0ede6fc6350f2c53560a33_wyf0oh.jpg"
                                    alt="superFruts"
                                    ref={refImg}
                                />
                            </Link>
                            <nav className="gapIcons flex items-center">
                                <SearchIcon
                                    className="rounded-full transition-all duration-500 hover:ring-2 ring-black ring-offset-[3px] hover:bg-white"/>
                                <BagIcon/>
                                <SettingsSight/>
                                <MenuIcon/>
                            </nav>
                        </div>

                        {/* fondo borroso debajo */}
                        <div className="absolute inset-0 h-[75px] z-[-1] rounded-[16px] backdrop-blur-md border border-white/50 shadow-md"/>

                    </div>
               }
           </div>
        </>
    )
}


const SunIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path
                d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/>
        </svg>
    )
}
const MoonIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
            <path
                d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
        </svg>
    )
}




