import {Footer} from "./footer.tsx";
import {Header} from "./header.tsx";
import { useNavigate} from "react-router-dom"
// import {Water} from "./cascada.tsx";
import {Candado} from "./checkout.tsx"

import {useEffect, useState, useRef, forwardRef} from 'react';



export function Index () {



    return (
        <>
            <Header/>
            <section className={"w-full"}>
                <Introduction/>
            </section>
            <Footer/>
        </>
    )
}

type ArrowProps = {
    onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}
const ArrowRight = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(({onClick},ref)=>
    {
        return (
            <svg onClick={onClick} className={"size-[50px]"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
            </svg>
        )
});
const ArrowLeft = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(({onClick}, ref) => {
    return (
        <svg
            onClick={onClick}
            className={"size-[50px]"}
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#999999"
        >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
    );
});

function Slider() {
    const allImgs: string[] = [
        "https://res.cloudinary.com/dfwtyxxba/image/upload/v1746066844/575a94b43a35010b56b17f683a6fdc91_t98ls9.jpg",
        "https://res.cloudinary.com/dfwtyxxba/image/upload/v1746066848/22529f942d0ede6fc6350f2c53560a33_wyf0oh.jpg",
        "https://res.cloudinary.com/dfwtyxxba/image/upload/v1745036633/plinTwo_lbggx2.png",
        "https://res.cloudinary.com/dfwtyxxba/image/upload/v1743736943/Imagen_de_WhatsApp_2025-03-25_a_las_20.33.16_73a6986c_frpub0.jpg"
    ];

    const containerImgs = useRef<HTMLDivElement | null>(null);
    const refs = useRef<(HTMLDivElement | null)[]>(Array(allImgs.length).fill(null));
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const refPosition = useRef<number|null>(0);

    const changeCircle = (indice: number | null) => {
        refs.current.forEach(ref => ref?.classList.remove('paintItem','paintWidthItem'));
        refs.current[indice]?.classList.add('paintItem','paintWidthItem');
    };

    const startTransition = (direction: "next" | "prev") => {
        if (containerImgs.current && !isTransitioning) {
            setIsTransitioning(true);
            containerImgs.current.style.transition = "transform 0.5s linear";

            if (direction === "next") {
                containerImgs.current.style.transform = "translateX(-200%)";
            } else {
                containerImgs.current.style.transform = "translateX(0%)";
            }
        }
    };

    const handleTransitionEnd = () => {
        if (containerImgs.current) {
            containerImgs.current.style.transition = "none";

            const firstElement = containerImgs.current.children[0];
            const lastElement = containerImgs.current.children[containerImgs.current.children.length - 1];

            if (containerImgs.current.style.transform === "translateX(-200%)") {
                containerImgs.current.appendChild(firstElement);
            } else {
                containerImgs.current.prepend(lastElement);
            }

            containerImgs.current.style.transform = "translateX(-100%)";
            setIsTransitioning(false);
        }
    };

    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        changeCircle(refPosition.current);

        intervalRef.current = setInterval(() => {
            startTransition("next");
            refPosition.current = (refPosition.current + 1) % allImgs.length;
            changeCircle(refPosition.current);
        }, 4000);

    };

    const nextImage = () => {
        if (!isTransitioning) {
            startTransition("next");
            refPosition.current = (refPosition.current + 1) % allImgs.length;
            resetInterval();
        }
    };

    const prevImage = () => {
        if (!isTransitioning) {
            startTransition("prev");
            refPosition.current = (refPosition.current - 1 + allImgs.length ) % allImgs.length;
            resetInterval();
        }
    };

    useEffect(() => {
        if (containerImgs.current) {
            containerImgs.current.style.transform = `translateX(-100%)`;
            containerImgs.current.addEventListener("transitionend", handleTransitionEnd);
        }

        resetInterval(); // Inicia el ciclo automático al montar el componente

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            containerImgs.current?.removeEventListener("transitionend", handleTransitionEnd);
        };
    }, []);

    return (
        <div className={"relative overflow-hidden"}>
            <div
                ref={containerImgs}
                className={"w-full h-[600px] flex"}
            >
                {allImgs.map((imgUrl, key) => (
                    <img key={key} className={"min-w-full aspect-[16/9] object-cover"} src={imgUrl} />
                ))}
            </div>

            <div className={"absolute top-1/2 -translate-y-1/2 w-full flex justify-between"}>
                <ArrowLeft onClick={prevImage}/>
                <ArrowRight onClick={nextImage}/>
            </div>

            <div className={"absolute top-[95%] left-1/2 -translate-x-1/2 flex gap-[5px] px-[25px]"}>
                {allImgs.map((_, key) => (
                    <div
                        key={key}
                        ref={(el) => (refs.current[key] = el)}
                        className={"size-[12.5px] rounded-full bg-[lightblue] transition-all duration-300"}
                    ></div>
                ))}
            </div>
        </div>
    );
}


function Introduction() {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-active");
                } else {
                    entry.target.classList.remove("is-active");
                }
            });
        });

        sectionRefs.current.forEach((ref) => {
            ref && observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section className="border-[5px] border-[green] h-full w-full mx-auto bg-[gray]">
            <div className="w-[95%] h-[1000px] mx-auto border-[5px] border-[purple] flex flex-col items-center justify-center gap-[25px] py-[25px]">
                <h1 className="clampTitleIntro border-[5px] border-[orange] w-[50%] font leading-[0.8] bg-[url('https://www.fundacionaquae.org/wp-content/uploads/2016/05/amazonia-1-1024x576.jpg')] bg-cover bg-center bg-clip-text text-transparent py-[10px] text-center">
                    Amazonia Peruana
                </h1>
                <h5 className="clampSubTitleIntro w-[50%] text-white text-center leading-[0.9] text-right whitespace-nowrap">
                    los mejores productos directo a tus manos
                </h5>
            </div>

            <div className="w-[80%] mx-auto">
                <div className="fade-in-section" ref={(el) => (sectionRefs.current[0] = el)}>
                    <Aguaje />
                </div>
                <div className="fade-in-section" ref={(el) => (sectionRefs.current[1] = el)}>
                    <Camu />
                </div>
                <div className="fade-in-section" ref={(el) => (sectionRefs.current[2] = el)}>
                    <Ungurahui />
                </div>
            </div>
        </section>
    );
}



function Aguaje() {
    const refImg = useRef<HTMLImageElement|null>(null)
    const navigate = useNavigate();

    const redirectProduct = ( e : MouseEvent) => {
        const nameProduct = refImg.current?.alt.toLowerCase()
        nameProduct && navigate(`/${nameProduct}`)
    }

    useEffect(()=>{



        return () => {

        }
    })

    return (
        <section
            className={` border-[5px] border-[blue] h-[800px] w-full flex flex-row-reverse items-center justify-center gap-[25px]`}>
            <img
                className="clampImagenIntro border-4 border-red-500 transition-all duration-300 rounded-[8px]"
                src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1745543768/logo-cuadrado_cuc5wh.webp"
                alt="Aguaje"
                ref={refImg}
                onClick={redirectProduct}
            />
            <div>
                <h1 className="clampTitleIntro border-[5px] border-[red] transition-opacity duration-300 opacity-100  self-start">
                    Aguaje
                </h1>
                <h5 className="clampSubTitleIntro opacity-100 transition-opacity duration-300 delay-500 whitespace-nowrap">la mayor fruta con fitoestrogeno</h5>
            </div>
        </section>
    );
}

export default Aguaje;


function Camu () {
    const containerCamu = useRef<HTMLElement | null>(null);
    const imgCamu = useRef<HTMLImageElement | null>(null); // img → HTMLImageElement
    const nameCamu = useRef<HTMLDivElement | null>(null);  // div → HTMLDivElement
    const descriptionCamu = useRef<HTMLHeadingElement | null>(null); // h5 → HTMLHeadingElement
    const refImg=useRef<HTMLImageElement|null>(null);
    const navigate = useNavigate();

    const redirectProduct = ( e : MouseEvent) => {
        const nameProduct = refImg.current?.alt.replace(/\s/,"-");
        nameProduct && navigate(`/${nameProduct}`)
    }

    const showInfoCamu = (): void => {
        if (imgCamu.current && nameCamu.current && descriptionCamu.current) {
            imgCamu.current.style.transform = `translateY(-200px)`;
            nameCamu.current.style.opacity = `1`;
            setTimeout(() => {
                descriptionCamu.current!.style.opacity = '1';
            }, 300);
        }
    };

    const hideInfoCamu = (): void => {
        if (imgCamu.current && nameCamu.current && descriptionCamu.current) {
            imgCamu.current.style.transform = `translateY(0)`;
            nameCamu.current.style.opacity = '0';
            descriptionCamu.current.style.opacity = '0';
        }
    };

    return (
        <section
            ref={containerCamu}
            // onMouseEnter={showInfoCamu}
            // onMouseLeave={hideInfoCamu}
            className={` border-[5px] border-[pink] h-[800px] w-full flex items-center justify-center gap-[25px] px-[25px]`}
        >
            <img
                ref={imgCamu}
                className="clampImagenIntro transition-all duration-300"
                src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1745543768/logo-cuadrado_cuc5wh.webp"
                alt="camu camu"
                ref={refImg}
                onClick={redirectProduct}
            />
            <div className="w-[800px] flex flex-col justify-center">
                <div ref={nameCamu} className="opacity-100 transition-opacity duration-300">
                    <h1 className="clampTitleIntro text-[200px] bg-[blue] leading-none ml-[50px]">Camu</h1>
                    <h1 className="clampTitleIntro text-[200px] bg-[green] text-right mr-[50px] leading-none">Camu</h1>
                </div>
                <h5
                    ref={descriptionCamu}
                    className="clampSubTitleIntro opacity-100 transition-opacity duration-300 text-right mr-[50px] whitespace-nowrap"
                >
                    La fruta con mayor vitamina C del mundo
                </h5>
            </div>
        </section>
    );
}


function Ungurahui () {

        const refUngurahui = useRef<HTMLImageElement|null>(null);
        const nameUngurahui = useRef<HTMLHeadingElement | null>(null);
        const descriptionUngurahui = useRef<HTMLHeadingElement | null>(null);
        const navigate = useNavigate();

        const redirectProduct = ( e : MouseEvent) => {
            const nameProduct = refUngurahui.current?.alt.toLowerCase();
            nameProduct && navigate(`/${nameProduct}`)
        }


    return (
        <section className={` border-[5px] border-[orange] h-[800px] w-full flex flex-row-reverse items-center justify-center gap-[25px]`}>
            <img ref={refUngurahui} onClick={redirectProduct} className={"clampImagenIntro transition-transform duration-300"} src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1745543768/logo-cuadrado_cuc5wh.webp" alt="ungurahui"/>
            <div className={"flex flex-col justify-center "}>
                <h1 ref={nameUngurahui} className={"clampTitleIntro opacity-100 transition-opacity duration-300"}>Ungurahui</h1>
                <h5 ref={descriptionUngurahui} className={"clampSubTitleIntro transition-opacity duration-300"} >Fruta con mayor calcio del mundo</h5>
            </div>
        </section>
    )

}
