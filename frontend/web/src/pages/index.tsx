import gsap from "gsap";
import {ScrollSmoother} from "gsap/ScrollSmoother"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {TextPlugin} from 'gsap/TextPlugin'
import {MotionPathPlugin} from "gsap/MotionPathPlugin"
// import {ScrollSmoother} from "gsap/ScrollSmoother";
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {Header} from "../components/headerComponents/header.tsx";
import {useBlurMenu} from "../zustand/useBlurMenu.tsx"
import {useBlurSearch} from "../zustand/useBlurSearch.tsx";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother, TextPlugin, MotionPathPlugin )


export function Index() {

    const toggleBlur = useBlurMenu((state) => state.activeBlur)
    const toggleBlurSearch = useBlurSearch(state=>state.switchBlur)

    useEffect(()=>{
        // console.log(toggleBlur,"-+")
    },[toggleBlur])

    return (
            <section className={`w-full ${ toggleBlurSearch ? "blur-[20px]" : "" } ${ toggleBlur ? "blur-[10px]" : "" }`}>
                <Introduction/>
            </section>
    )
}



function Introduction() {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const triggerRefTwo = useRef<HTMLDivElement | null>(null);
    const groupCircle = useRef<(HTMLDivElement | null)[]>([])
    const categoryRef = useRef<HTMLDivElement | null>(null)
    const [activeTitleAguaje, setActiveTitleAguaje] = useState<boolean>(false)


    const aguajeTitleContainer = useRef<HTMLHeadingElement | null>(null);
    const aguajeTitleJson = useRef<HTMLDivElement|null>(null)

    const containerTitleCamu = useRef<HTMLDivElement | null>(null)
    const titleCamuTwo = useRef<HTMLDivElement|null>(null)

    const aguajeImg = useRef<HTMLImageElement | null>(null);
    const aguajeTwoImg = useRef<HTMLImageElement | null>(null);
    const aguajeThreeImg = useRef<HTMLImageElement | null>(null);
    const aguajeFourImg = useRef<HTMLImageElement | null>(null);
    const aguajeDescriptionOne = useRef<HTMLDivElement | null>(null)
    const aguajeDescriptionTwo = useRef<HTMLDivElement | null>(null)
    const aguajeDescriptionThree = useRef<HTMLDivElement | null>(null)
    const aguajeInfoOne = useRef<HTMLDivElement | null>(null);
    const aguajeInfoTwo = useRef<HTMLDivElement | null>(null);
    const aguajeInfoThree = useRef<HTMLDivElement | null>(null);

    const svgRef = useRef<SVGSVGElement | null>(null)
    const cilindro = useRef<HTMLDivElement|null>(null)



    useEffect(() => {

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {

            const ctx = gsap.context(() => {
                ScrollTrigger.refresh();

                const allSpan = aguajeTitleContainer.current.querySelectorAll("span");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: "+=3000",
                        scrub: true,
                        pin: true,
                    }
                });

                tl
                    .fromTo(aguajeTitleContainer.current, {opacity: 1},
                        {scale: 1.25, opacity: 1, ease: "power2.inOut", duration: 2}, 0)
                    .fromTo(aguajeImg.current, {scale: 1, opacity: 1}, {
                        scale: .75,
                        opacity: 0,
                        rotate: -360,
                        ease: "power2.inOut",
                        duration: 2
                    }, 2)
                    .fromTo(aguajeTwoImg.current, {opacity: 0, x: -800},
                        {opacity: 1, x: -175, y: 60 ,duration: 2}, "-=.25")
                    .to(allSpan, {
                        y: () => gsap.utils.random(-200, 200),
                        rotate: () => gsap.utils.random(-90, 90),
                        opacity: 0,
                        stagger: {each: .1, from: "center"},
                        duration: 2,
                        onComplete: () => {
                            console.log('ya termino de animarse')
                        }
                    }, 2)
                    .fromTo(aguajeDescriptionOne.current, {opacity: 0, x: -300, rotate: 360},
                        {opacity: 1, x: 0, rotate: 0, ease: "power2.inOut", duration: 3}, 7)
                    .fromTo(aguajeTitleJson.current, {opacity:0}, //segundo title de aguaje
                        {opacity: 1,duration: 3},  7)
                    .fromTo(aguajeInfoOne.current, {opacity: 0},
                        {opacity: 1,duration: 3}, 10)
                    .fromTo(aguajeDescriptionTwo.current, {opacity: 0, y: 300, rotate: 360},
                        {opacity: 1, y: 0, rotate: 0, ease: "power2.inOut", duration: 3}, 13)
                    .fromTo(aguajeInfoTwo.current, {opacity: 0},
                        {opacity: 1, duration: 3}, 16)
                    .fromTo(aguajeDescriptionThree.current, {opacity: 0, x: 300, rotate: 360},
                        {opacity: 1, x: 0,rotate: 0, ease: "power2.inOut", duration: 3}, 19)
                    .fromTo(aguajeInfoThree.current, {opacity: 0},
                        {opacity: 1, duration: 3}, 22)

                const tlTwo = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerRefTwo.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                        pin: true
                    }
                })

                const allSpanCamu = containerTitleCamu.current.querySelectorAll("span");

                tlTwo
                    .fromTo(aguajeFourImg.current, {x: -400, opacity: 0},
                        {x: 0, opacity: 1, duration: 1}, 1)
                    .fromTo(allSpanCamu, {opacity: 1, x : 0, y : 0 },
                        {x: () => gsap.utils.random(-300, 300), y : () => gsap.utils.random(-200, -100), rotate: () => gsap.utils.random(-60,60) ,opacity: 0,stagger: {each: .2, from: "end"} },"<")
                    .fromTo(titleCamuTwo.current, {opacity: 0},
                        {opacity: 1, duration: 2}, 3)
            }, triggerRef);

            gsap.to(cilindro.current, {rotationY: "+=360", duration:8, ease: "none",repeat: -1})


            return () => {
                ctx.revert();
                ScrollTrigger.killAll();
            };
        })

        mm.add('(max-width: 767px)', () => {
            console.log('version movil: gsap desactivado o animaciones simples')
            const ctx = gsap.context(() => {

            const allSpans = aguajeTitleContainer.current!.querySelectorAll('span');


                gsap.fromTo( allSpans, {
                    x: () => gsap.utils.random(-300,200),
                    opacity:0,
                } ,{
                        scrollTrigger : {
                            trigger: triggerRef.current,
                            start: 'top 90%',
                            end: 'bottom bottom',
                            toggleActions: 'play none none none',
                            scrub: true,
                            // markers: true,
                        },
                        x: 0,
                        opacity: 1,
                        duration: 1,
                })

                gsap.fromTo(aguajeImg.current, {
                    opacity: 1 },{
                        scrollTrigger: {
                            trigger: triggerRef.current,
                            start: 'top 50%',
                            end: 'bottom 95%',
                            scrub: true,
                            markers: true,
                        },
                    opacity: 0,
                    rotate: 360,
                })

                gsap.fromTo(aguajeTwoImg.current, {
                    opacity: 0,
                }, {
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: 'top 7.5%',
                        end: 'bottom bottom',
                        toggleActions: 'play none none none',
                        scrub: true,
                        markers: true,
                    },
                    opacity:1,
                })

                gsap.fromTo(aguajeDescriptionOne.current, {
                    opacity: 0,
                },{
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: 'top 5%',
                        end: 'bottom bottom',
                        toggleActions: 'play none none none',
                        scrub: true,
                        markers: true,
                    },
                    opacity: 1,
                })

                gsap.fromTo(aguajeDescriptionTwo.current, {
                    opacity: 0,
                }, {
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: 'top 2.5%',
                        end: 'bottom bottom',
                        toggleActions: 'play none none none',
                        scrub: true,
                        markers: true,
                    },
                    opacity: 1,
                })

                gsap.fromTo(aguajeDescriptionThree.current, {
                    opacity: 0,
                }, {
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: 'top 0%',
                        end: 'bottom bottom',
                        toggleActions: 'play none none none',
                        scrub: true,
                        markers: true,
                    },
                    opacity: 1,
                })





            })
            return () => ctx.revert()




        })

        return () => mm.revert();
    }, []);



    const refInterval = useRef<number|null>(null);
    const containerSlider = useRef<HTMLDivElement | null>(null)


    const [autoSlide, setAutoSlide] = useState<boolean>(false)
    const [activeCircle, setActiveCircle] = useState<number>(1)
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [distanceOne, setDistanceOne] = useState<"left" | "right" | null>(null);
    const [sliderElements, setSliderElements] = useState<React.FC[]>([AguajeSvg, CamuCamuSvg, DesayunosSvg, SnacksSvg]);

    const handleClick = (dir: "left" | "right") => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setDistanceOne(dir);

    };

    const handleTransitionEnd = () => {
        if (distanceOne === "right") {
            setActiveCircle(prev=> (prev + 1) % (sliderElements.length))
            const first = sliderElements[0];
            setSliderElements([...sliderElements.slice(1), first]);
        } else if (distanceOne === "left") {
            const last = sliderElements[sliderElements.length - 1];
            setSliderElements([last, ...sliderElements.slice(0, -1)]);
            setActiveCircle(prev=> (prev - 1 + sliderElements.length) % (sliderElements.length))
        }

        setIsTransitioning(false);
        setDistanceOne(null);
    };

    useEffect(()=>{

        refInterval.current = setInterval(()=>{
            // !isTransitioning && handleClick('right');
            if(!isTransitioning) handleClick('right')
        },5000)

        return () => clearInterval(refInterval.current)

    },[autoSlide, isTransitioning])

    const onUserClick = (dir: "left" | "right") => {
        setAutoSlide(false);
        handleClick(dir)
    }

    // const horizontalRef = useRef<HTMLDivElement|null>(null)

    const containerRefCamu = useRef<HTMLDivElement|null>(null);
    const horizontalRef = useRef<HTMLDivElement|null>(null);
    const horizontalTitleCamu = useRef<HTMLDivElement|null>(null)
    const containerSlide = useRef<HTMLDivElement|null>(null)
    const imgCamuOne = useRef<HTMLImageElement|null>(null)
    const imgCamuTwo = useRef<HTMLImageElement|null>(null)
    const imgCamuThree = useRef<HTMLImageElement|null>(null)
    const boxOne = useRef<HTMLDivElement|null>(null)
    const cuackCamu = useRef<HTMLDivElement|null>(null)

    const allCamuBoxOne = useRef<(HTMLSpanElement|null)[]>([])
    const allCamuBoxTwo = useRef<(HTMLSpanElement|null)[]>([])
    const allCamuBoxThree = useRef<(HTMLSpanElement|null)[]>([])

    const circle3D = useRef<HTMLDivElement|null>(null)

    // const widthContainer = useRef<number>(b)

    const containerOneDescription = useRef<HTMLDivElement|null>(null)
    const containerTwoDescription = useRef<HTMLDivElement|null>(null)
    const containerThreeDescription = useRef<HTMLDivElement|null>(null)

    const dropBorderOne = useRef<HTMLDivElement|null>(null)
    const dropBorderTwo = useRef<HTMLDivElement|null>(null)

    useEffect(()=>{

        console.log(allCamuBoxOne.current)

    },[])

    useEffect(()=>{

        const sections = gsap.utils.toArray(".section");
        const allSpan = boxOne.current.querySelectorAll('div span')
        const allCamu = cuackCamu.current.querySelectorAll('h1')

        const titleContainerOne = Array(containerOneDescription.current.querySelectorAll('h1'))
        const titleContainerTwo = Array(containerTwoDescription.current.querySelectorAll('h1'))
        const titleContainerThree = Array(containerThreeDescription.current.querySelectorAll('h1'))

        const spansContainerOne = Array(containerOneDescription.current.querySelectorAll('p'))
        const spansContainerTwo = Array(containerTwoDescription.current.querySelectorAll('p'))
        const spansContainerThree = Array(containerThreeDescription.current.querySelectorAll('p'))

        const imgContainerOne = containerOneDescription.current.querySelector('img')
        const imgContainerTwo = containerTwoDescription.current.querySelector('img')
        const imgContainerThree = containerThreeDescription.current.querySelector('img')


        const boxOneCenter = boxOne.scrollWidth/2;

        let hasAnimated = false;

        const totalItems = allCamuBoxTwo.current.length;
        const staggerEach = 0.1;
        const durationTotal = staggerEach * (totalItems - 1) + 0.25;

        let flagContinue = false;

        const tlCamu = gsap.timeline({
            scrollTrigger: {
                trigger: containerRefCamu.current, // Usa el contenedor grande
                scrub: 1,
                pin: true,
                // ease: "none",
                end: () => "+=9000",
                onUpdate: (self) => {

                    const total = tlCamu.duration();
                    // console.log('total ->',total)

                    if((self.progress)*100 > 69) {
                        // console.log('cuackkk')
                    }
                    console.log(self.progress)
                    self.progress >= 0.41 && gsap.to(allCamuBoxOne.current,{opacity : 0, duration: .05})
                    self.progress >= 0.679 && gsap.to(allCamuBoxTwo.current, {opacity: 0, duration: .05})
                    self.progress >= 0.8446 && gsap.to(allCamuBoxThree.current, {opacity: 0, duration: .05})

                }

            }
        });

        gsap.to(containerRefCamu.current,{background: "#F50000"})
        gsap.to(allSpan, {opacity: 0})
        gsap.to(imgContainerOne,{opacity: 0})
        gsap.to(imgContainerTwo,{opacity: 0})
        gsap.to(imgContainerThree,{opacity: 0})
        gsap.to(spansContainerOne,{opacity: 0})
        gsap.to(spansContainerTwo,{opacity: 0})
        gsap.to(spansContainerThree,{opacity: 0})

        tlCamu
            .fromTo(allCamu, {
                opacity: 0,
                y: () => gsap.utils.random(-200, 200)
            }, {
                opacity: 1,
                y: 0,
                x:0,
                stagger: { each: 0.1, amount: .25, from: "edges" },
            }, 0)

            .fromTo(imgCamuOne.current, { y : -200, scale: 2.5},
                {
                    y : 0,
                    scale: 1,
                    onUpdate: function () {
                       if(this.progress() >= 1) {
                           imgCamuOne.current.classList.add('bounce-node')
                       }
                    }
                },0)

            .fromTo(imgCamuTwo.current, { y : 200, scale: .75},
                {
                    y : 0,
                    scale: 1,
                },0)


            .fromTo(imgCamuOne.current,{opacity: 0},
        {opacity: 1}, "0.2")
            .fromTo(imgCamuTwo.current, {opacity: 0},
                {opacity: 1}, "0.2")


            .to(sections, {
                xPercent: -100 * (sections.length - 1),
                duration: 1,
                onStart : () => {

                    gsap.to(allCamu, {
                        yPercent : () => gsap.utils.random(-350,350),
                        xPercent : () => gsap.utils.random(100,400),
                        opacity : 0,
                        onUpdate : function () {
                            this.progress() >= 1 && gsap.to(allCamu,{yPercent: 0, xPercent:0})

                            if(this.progress() >= 1 && !hasAnimated) {
                                gsap.fromTo(allSpan,{ opacity: 0, yPercent : () => gsap.utils.random(-250,250) },{ opacity: 1, yPercent: 0 })
                                hasAnimated = true
                            }

                        }
                    })

                    dropBorderOne.current.classList.add('drop-water')
                    dropBorderTwo.current.classList.add('drop-water')
                },


            }, 1)


            .fromTo(imgCamuThree.current, {opacity: 0 },
            {
                // delay: 1,
                opacity: 1,
                onStart: function () {
                    gsap.delayedCall(0.05, () => {
                        gsap.set(allSpan, { opacity: 1 });
                    });

                }

            },2)

            .to(allCamuBoxOne.current, {
                x: (indice,el)=>{
                    const xCenterContainer = containerOneDescription.current.getBoundingClientRect().left + containerOneDescription.current.getBoundingClientRect().width/2;

                    const xCenterElement = el.getBoundingClientRect().left + el.getBoundingClientRect().width/2;

                    return xCenterContainer - xCenterElement;
                },
                opacity: 0,
                rotate: ()=> gsap.utils.random(-120,120),
                // delay: 1,
                y : (indice, el) => {
                    const yCenterContainer = containerOneDescription.current.getBoundingClientRect().top + containerOneDescription.current.getBoundingClientRect().height/2;
                    const yCenterElement= el.getBoundingClientRect().top + el.getBoundingClientRect().width/2;

                    return yCenterContainer - yCenterElement;
                },
                stagger : {
                    from: "end",
                    each: .10
                },
                onUpdate : function () {
                    if(this.progress() < 1) {
                        gsap.to(spansContainerOne,{opacity:0})
                    }
                },
                duration: .25,
            }, 3)

            .fromTo(titleContainerOne,{opacity: 0},
                {
                    opacity: 1,
                    onUpdate: function () {

                        if(this.progress() >= 1) {
                            gsap.to(spansContainerOne,
                                {
                                    opacity: 1,
                                    stagger : {
                                        from : "start",
                                        each: .10
                                    }
                                })
                            gsap.to(imgContainerOne,{opacity:.85})
                            gsap.to(containerRefCamu.current, {background: "#EB0000"})
                        } else {
                            gsap.to(imgContainerOne, {opacity: 0})
                        }
                    },
                    duration: .25
                }, ">")

            .to(allCamuBoxTwo.current, {
                x: (indice,el)=>{
                    const xCenterContainer = containerThreeDescription.current.getBoundingClientRect().left + containerThreeDescription.current.getBoundingClientRect().width/2;
                    const xCenterElement = el.getBoundingClientRect().left + el.getBoundingClientRect().width/2;

                    return xCenterContainer - xCenterElement;
                },
                rotate: ()=> gsap.utils.random(-120,120),
                opacity: 0,
                // delay: 1,
                y : (indice, el) => {
                    const yCenterContainer = containerThreeDescription.current.getBoundingClientRect().top + containerThreeDescription.current.getBoundingClientRect().height/2;
                    const yCenterElement= el.getBoundingClientRect().top + el.getBoundingClientRect().width/2;

                    return yCenterContainer - yCenterElement;
                },
                stagger : {
                    from: "center",
                    each: .10
                },
                onUpdate : function () {
                    if(this.progress() < 1) {
                        gsap.to(spansContainerThree,{opacity : 0})
                    }
                },
                duration: .25,
            }, 5)

            .fromTo(titleContainerThree,{opacity: 0},
                {
                    opacity: 1,
                    onUpdate: function () {
                        if(this.progress() >= 1) {
                            gsap.to(spansContainerThree,
                                {
                                    opacity: 1,
                                    stagger : {
                                        from : "start",
                                        each: .10
                                    }
                                })
                            gsap.to(imgContainerThree,{opacity:.85})

                            gsap.to(containerRefCamu.current,{background: "#E00000"} )
                        } else {
                            gsap.to(imgContainerThree, {opacity: 0})
                        }
                    },
                }, ">")

            .to(allCamuBoxThree.current, {
                x: (indice,el)=>{
                    const xCenterContainer = containerTwoDescription.current.getBoundingClientRect().left + containerTwoDescription.current.getBoundingClientRect().width/2;
                    const xCenterElement = el.getBoundingClientRect().left + el.getBoundingClientRect().width/2;

                    return xCenterContainer - xCenterElement;
                },
                rotate: ()=> gsap.utils.random(-120,120),
                opacity: 0,
                y : (indice, el) => {
                    const yCenterContainer = containerTwoDescription.current.getBoundingClientRect().top + containerTwoDescription.current.getBoundingClientRect().height/2;
                    const yCenterElement= el.getBoundingClientRect().top + el.getBoundingClientRect().width/2;

                    return yCenterContainer - yCenterElement;
                },
                stagger : {
                    from: "start",
                    each: .10
                },
                onUpdate : function () {
                    if(this.progress() < 1) {
                        gsap.to(spansContainerTwo, {opacity: 0},)
                    }
                },
                duration: .25,
            }, 7)

            .fromTo(titleContainerTwo,{opacity: 0},
                {
                    opacity: 1,
                    onUpdate: function () {

                        if(this.progress() >= 1) {
                            gsap.fromTo(spansContainerTwo, {opacity: 0},
                                {
                                    opacity: 1,
                                    stagger : {
                                        from : "start",
                                        each: .10
                                    }
                                })
                            gsap.to(imgContainerTwo,{opacity:.85})

                            gsap.to(containerRefCamu.current,{background:"#D60000"})
                        } else {
                            gsap.to(imgContainerTwo, {opacity: 0})
                        }

                    },
                }, ">")

            .fromTo(circle3D.current, {
                    scale: .75,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: durationTotal,
                    onComplete : () => {

                    }
                }, 9)
            .to(containerRefCamu.current,
                {
                    background: "#CC0000",
                    duration: durationTotal,
                    onUpdate : function () {
                        if(this.progress() >= 1) {
                            dropBorderOne.current.classList.remove('drop-water')
                            dropBorderTwo.current.classList.remove('drop-water')

                            // dropBorderOne.current.classList.add('drop-water')
                            // dropBorderTwo.current.classList.add('drop-water')
                        }
                    }
                }, "<")

    },[])

    return (
        <div id={"smooth-wrapper"}>
            <div id={"smooth-content"}>

                <div className="text-white font-sans relative overflow-hidden ">
                    <div ref={categoryRef} className={`border-8 border-red-500 relative w-full h-[1050px] mx-auto flex flex-col justify-center`}>

                        <div ref={containerSlider}
                             className={`    flex w-full  ${isTransitioning ? "transition-transform duration-500" : ""} translate-x-[-100%]  ${distanceOne === "right" ? "translate-x-[-200%]" : ""}    ${distanceOne === "left" ? "translate-x-[0] " : ""}`}
                             onTransitionEnd={handleTransitionEnd}>
                            {
                                sliderElements.map((Component, index) => (
                                    <div className="min-w-full bg-gray-500" key={index}>
                                        <Component isActive={index === 1}/>
                                    </div>
                                ))
                            }
                        </div>

                        <div
                            className={"absolute flex gap-[5px] justify-center h-[30px] top-[92.5%] left-1/2 -translate-x-1/2 transition-half"}>
                            {
                                sliderElements.map((circle, index) => (
                                    <div ref={el => groupCircle.current[index] = el} key={index}
                                         className={`border-2 rounded-full h-[15px] min-w-[15px] ${activeCircle === index ? "bg-white circleSlide" : ""} `}/>
                                ))
                            }
                        </div>
                        <div className="absolute w-full flex justify-between items-center top-1/2 -translate-y-1/2">
                            <svg
                                onClick={() => onUserClick("left")}
                                className="w-[50px] translate-x-[25%] aspect-square rounded flex items-center justify-center"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                fill="#e3e3e3"
                            >
                                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                            </svg>

                            <svg
                                onClick={() => onUserClick("right")}
                                className="w-[50px] rounded flex items-center justify-center"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                fill="#e3e3e3"
                            >
                                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                            </svg>
                        </div>



                    </div>

                    <div ref={triggerRef} className={"bg-gradient-to-r from-yellow-400  to-yellow-400 w-5/5 mx-auto items-center h-screen flex flex-col justify-evenly"}>

                        <div className={"relative w-full h-[300px]"}>
                            <div ref={aguajeTitleContainer}
                                 className={"w-full h-[300px] flex justify-center items-center"}>
                                {
                                    ("Aguaje").split('').map((char, index) => (
                                        <span className={"text-[135px] md:text-[150px] lg:text-[175px] inline-block"} key={index}>{char}</span>
                                    ))
                                }
                            </div>
                            <div ref={aguajeTitleJson}
                                 className={"opacity-0 text-[250px] md:text-[200px] md:leading-[1.5] lg:text-[250px] lg:leading-none absolute top-0 left-1/2 -translate-x-1/2"}>
                                Aguaje
                            </div>
                        </div>
                        <div className={" relative  w-full h-[700px]"}>

                            <div className={"w-full flex justify-center h-[700px]  mx-auto relative"}>
                                <img ref={aguajeImg}
                                     className={"bg-transparent absolute w-[1024px] h-[700px] object-contain"}
                                     src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1750643317/DeWatermark.ai_1750642722000-Photoroom_zenofw.webp"
                                     alt=""/>
                                <img ref={aguajeTwoImg}
                                     className={"w-[350px] left-[-25px] transition-half md:w-[400px] lg:w-[450px] lg:left-[200px] bg-transparent absolute xl:w-[550px] xl:left-[250px] 2xl:w-[600px] 2xl:left-[300px] h-[700px] origin-left object-contain"}
                                     src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1750646066/plato_echado-Photoroom_xndrsi.webp"
                                     alt=""/>

                                <div ref={aguajeDescriptionOne} className={"top-[0%] xl:left-[45%] absolute left-[40%] md:top-[5%] "}>
                                    <div className={"relative"}>
                                        <img className={" size-[150px] md:size-[175px] lg:size-[200px] xl:size-[225px] object-contain"}
                                             src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1750642021/aguaje-pelado-transparente_gfs3jv.webp"
                                             alt=""/>
                                        <div ref={aguajeInfoOne}
                                             className={"absolute left-1/2 translate-x-[-50%] flex flex-col items-center bottom-[80%]"}>
                                            <h1 className={"text-white text-[20px]"}>Fitoestrogenos</h1>
                                            <div className={"h-[100px] bg-white w-[2px]"}></div>
                                            <div className={"size-[15px] rounded-full bg-white"}/>
                                        </div>
                                    </div>
                                </div>

                                <div ref={aguajeDescriptionTwo}
                                     className={"absolute left-[57.5%] md:bottom-[10%] bottom-[2.5%]"}>
                                    <div className={"relative"}>
                                        <img className={"size-[175px] md:size-[200px] lg:size-[225px] xl:size-[250px] object-contain"}
                                             src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1750642074/pote-invisible_kuuyuf.webp"
                                             alt=""/>
                                        <div ref={aguajeInfoTwo}
                                             className={"absolute flex flex-col-reverse items-center top-[80%] left-1/2 translate-x-[-50%]"}>
                                            <h1 className={"text-white text-[20px]"}>Fitoestrogenos</h1>
                                            <div className={"h-[100px] bg-white w-[2px]"}></div>
                                            <div className={"size-[15px] rounded-full bg-white"}/>
                                        </div>
                                    </div>
                                </div>

                                <div ref={aguajeDescriptionThree}
                                     className={"absolute left-[75%] md:top-[17.5%] top-[30%]"}>
                                    <div className={"relative"}>
                                        <img className={"size-[175px] md:size-[200px] lg:size-[225px] xl:size-[300px] object-contain"}
                                             src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1750642021/aguajina-invisible_oaj3qf.webp"
                                             alt=""/>
                                        <div ref={aguajeInfoThree}
                                             className={"absolute flex flex-col items-center bottom-[80%] left-1/2 translate-x-[-50%]"}>
                                            <h1 className={"text-white text-[20px]"}>Fitoestrogenos</h1>
                                            <div className={"h-[100px] bg-white w-[2.5px]"}></div>
                                            <div className={"size-[15px] rounded-full bg-white"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div ref={triggerRefTwo} className={"h-[100vh] w-full bg-red-600 flex flex-col items-center"}>

                        <div className={"relative h-[475px] text-[175px] flex items-center justify-center"}>
                            <div className={"border-8"} ref={containerTitleCamu}>
                                {
                                    "Camu-Camu".split('').map((char, indice) => (
                                        <span className={"leading-none inline-block"} key={indice}>{char}</span>
                                    ))
                                }
                            </div>
                            <div ref={titleCamuTwo} className={"absolute top-1/2 -translate-y-1/2 leading-none"}>
                                Camu Camu
                            </div>
                        </div>

                        <div ref={cilindro} className={"relative bg-blue-300 size-[400px]"}>
                            <img ref={aguajeFourImg}
                                 className={"bg-white absolute border-4 border-red-500  origin-left size-[350px] left-full top-1/2 -translate-y-1/2 object-contain"}
                                 src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1750642022/cuackssito_fino_lqinny.webp"
                                 alt=""/>
                        </div>
                    </div>

                    <div className={"overflow-hidden bg-red-400 border-8"} ref={containerRefCamu}>
                        <div className={"relative flex h-screen items-center"} ref={horizontalTitleCamu}>

                            <div ref={horizontalTitleCamu} className={"z-10 relative section min-w-full h-full  items-center justify-center flex text-center text-black"}>
                                <img ref={imgCamuOne} className={"md:h-[800px] md:w-[900px] md:top-[54%] md:right-[-75px] 2xl:w-[1100px] 2xl:h-[900px]  border-4 border-yellow-400 drop-shadow-[0px_0px_15px_rgba(0,0,0,.90)] absolute right-0 top-[40%] 2xl:top-[42.5%] 2xl:right-[-125px] z-[-1] md:rotate-180"} src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1752414254/camu_camu-Photoroom_dm1ahl.webp" alt=""/>
                                <img ref={imgCamuTwo} className={"md:w-[900px] md:h-[700px] 2xl:w-[1100px] 2xl:h-[900px] md:left-[-250px] md:top-[25px] border-4 drop-shadow-[0px_0px_15px_rgba(0,0,0,.90)] absolute left-[0] top-[10%] z-[-1] rotate-[90deg]"} src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1752414254/camu_camu-Photoroom_dm1ahl.webp" alt=""/>

                            </div>
                            <div ref={cuackCamu} className={"absolute whitespace-nowrap top-1/2 -translate-y-1/2 left-1/2 md:text-[125px] 2xl:text-[200px] text-[150px] font-bold -translate-x-1/2 z-[20]"}>
                                {
                                    "Camu Camu".split('').map((char, indice) => (
                                        <h1 key={indice} className={"inline-block"}>{char === " " ? '\u00A0' : char}</h1>
                                    ))
                                }
                            </div>
                            {/*<div ref={containerSlide} className={"flex w-full h-full"}>*/}
                            <div ref={boxOne} className={"flex items-center justify-center relative section  h-full min-w-full"}>
                                <div className={"w-full h-[100px] relative text-center"}>
                                    {
                                        "la fruta con ".split('').map((char,indice)=>(
                                            <span key={indice} ref={ el => allCamuBoxOne.current[indice] = el} className={"transition-half inline-block  text-[75px] leading-none z-[10]"}>{char === " "? "\u00A0" : char }</span>
                                        ))
                                    }
                                    {
                                        "mayor vitamina c ".split('').map((char, indice) =>(
                                            <span key={indice} className={"z-[10] transition-half text-[75px] inline-block  leading-none"} ref={el=>allCamuBoxTwo.current[indice] = el}>{char === " " ? "\u00A0": char}</span>
                                        ))
                                    }
                                    {
                                        "en el mundo".split('').map((char, indice) =>(
                                            <span key={indice} className={"z-[10] transition-half text-[75px] inline-block  leading-none"} ref={el=>allCamuBoxThree.current[indice] = el}>{char === " " ? "\u00A0": char}</span>
                                        ))
                                    }
                                    <img src={"https://res.cloudinary.com/dfwtyxxba/image/upload/v1752811244/cuack_camu_4_kqwlso.webp"} ref={circle3D} className={" absolute object-contain drop-shadow-[0px_0px_40px_rgba(0,0,0,.75)] size-[1024px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]"}/>
                                </div>

                                <img ref={imgCamuThree} className={"absolute left-0 bottom-0 z-[-1] size-[.1px] object-contain"} src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1752415446/DeWatermark.ai_1752415343588-Photoroom_syppam.webp" alt=""/>

                                {/*<img src={"https://res.cloudinary.com/dfwtyxxba/image/upload/v1752415446/DeWatermark.ai_1752415343588-Photoroom_syppam.webp"} ref={containerOneDescription} className={"absolute top-[0] left-0 size-[400px]  z-[-1] object-contain"}/>*/}
                                {/*<img src={"https://res.cloudinary.com/dfwtyxxba/image/upload/v1752811230/cuack_camu_2_nmx790.webp"} ref={containerTwoDescription} className={"absolute top-[0] right-[0] size-[450px]  z-[-1] object-contain"}/>*/}
                                {/*<img src={"https://res.cloudinary.com/dfwtyxxba/image/upload/v1752811230/cuack_camu_3_exd229.webp"} ref={containerThreeDescription} className={"absolute bottom-0 left-1/2 -translate-x-1/2 size-[450px]  z-[-1] object-contain "}/>*/}
                                <div ref={containerOneDescription} className={"absolute top-[12.5%] left-[15%] w-[300px] leading-none z-[-1] object-contain flex flex-col gap-[25px]"}>
                                    <div className={"relative flex flex-col gap-[17.5px]"}>
                                        <h1 className={"text-[35px]"}>retrasa el envejecimiento prematuro</h1>
                                        <div className={"flex flex-col gap-[5px]"}>
                                            <p>Gracias a su alto contenido en antioxidantes</p>
                                            <p>Reduce la oxidacion celular y el estres oxidativo</p>
                                            <p>Favorece la elasticidad de la piel y reduce arrugas</p>
                                            <p>Reduce los transtornos del animo(estres, ansiedad leve)</p>
                                        </div>
                                        <img className={"drop-shadow-[0px_0px_15px_rgba(0,0,0,.85)] object-cover absolute top-1/2 left-1/2 -translate-y-1/2 z-[-1]"} src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1752415446/DeWatermark.ai_1752415343588-Photoroom_syppam.webp" alt=""/>
                                    </div>
                                </div>
                                <div ref={containerTwoDescription} className={"absolute top-[35%]  right-[20%] w-[300px] leading-none z-[-1] object-contain flex flex-col gap-[25px]"}>
                                    <div className={"relative flex flex-col gap-[17.5px]"}>
                                        <h1 className={"text-[35px] w-[250px]"}>refuerza el sistema inmune</h1>
                                        <div className={"flex flex-col gap-[5px]"}>
                                            <p>Estimula la produccion de globulos blancos, fundamentales en la defensa contra
                                                virus y bacterias</p>
                                            <p>Esencial para el correcto funcionamiento de las celulas inmunes</p>
                                            <p>Promueve la produccion de anticuerpos y la respuesta inflamatoria regulada</p>
                                            <p>Alivia las infecciones respiratorias(gripe, resfriados, bronquitis)</p>
                                        </div>
                                        <img className={"drop-shadow-[0px_0px_15px_rgba(0,0,0,.85)] object-cover absolute top-1/2 -translate-y-1/2 left-[40%] z-[-1] min-w-[450px]"} src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1752811230/cuack_camu_3_exd229.webp" alt=""/>
                                    </div>
                                </div>
                                <div ref={containerThreeDescription} className={"absolute bottom-[2.5%]  left-[32.5%] w-[300px] -translate-x-1/2 leading-none  z-[-1] object-contain flex flex-col gap-[25px]"}>
                                    <div className={"relative flex flex-col gap-[17.5px]"}>
                                        <h1 className={"text-[35px] w-[250px]"}>20 veces mas vitamina C que el limon</h1>
                                        <div className={"flex flex-col gap-[5px]"}>
                                            <p>Mejora la presion arterial alta y enfermedades cardiovasculares</p>
                                            <p>Reduce el colesterol</p>
                                            <p>Controla la diabetes tipo 2, mejora la sensibilidad a la insulina y reduce el azucar en la sangre</p>
                                            <p>Ayuda con la inflamacion cronica(artritis, colitis, etc)</p>
                                            <p>Previene los problemas hepaticos(higado graso, detoxificacion)</p>
                                        </div>
                                        <img className={"drop-shadow-[0px_0px_15px_rgba(0,0,0,.85)] object-cover absolute top-1/2 -translate-y-1/3 left-1/4 z-[-1] min-w-[450px]"} src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1752811230/cuack_camu_2_nmx790.webp" alt=""/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div ref={dropBorderOne} className={"origin-center opacity-0 absolute top-0 right-0 translate-y-[-50%] translate-x-[50%] size-[200px] rounded-full border-2"}/>
                        <div ref={dropBorderTwo} className={"origin-center opacity-0 absolute bottom-0 translate-y-[50%] left-0 translate-x-[-50%] size-[200px] rounded-full border-2"}/>

                    </div>

                </div>

            </div>
        </div>
    )
}

type SvgProps = {
    isActive: boolean
}

const AguajeSvg = forwardRef<SVGSVGElement, SvgProps>(({isActive}, ref) => {


    return (
        <svg
            ref={ref}
            className={`${isActive ? "aguajeSvg" : ""}  slideElement aguaje w-full h-[500px]`}
            id="Capa_1"
            data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 431.23 177.39">
            <path
                d="m65.24,33.92c1.33-2.4,2.6-4.63,3.8-6.7,1.2-2.07,2.33-3.9,3.4-5.5,1.73-2.53,3.33-2.93,4.8-1.2,1.47,1.86,2.4,4.76,2.8,8.68.4,3.92-.6,8.41-3,13.46-1.07,2.26-2.47,4.82-4.2,7.68-1.73,2.86-3.5,5.85-5.3,8.98-1.8,3.12-3.57,6.22-5.3,9.28-1.73,3.06-3.2,5.92-4.4,8.58-1.2,2.79-2.13,5.39-2.8,7.78-.67,2.39-.93,4.46-.8,6.18.13,1.73.6,3.09,1.4,4.09.8,1,2.07,1.43,3.8,1.3,2-.13,4.17-1,6.5-2.6,2.33-1.6,4.67-3.7,7-6.3,2.33-2.6,4.6-5.53,6.8-8.8,2.2-3.27,4.17-6.63,5.9-10.1.53-.93,1.1-1.43,1.7-1.5.6-.07,1.1.37,1.5,1.3.4.93.53,2.53.4,4.8-.13,2.27-.87,4.8-2.2,7.6-1.33,2.8-3.07,5.5-5.2,8.1-2.13,2.6-4.5,4.92-7.1,6.94-2.6,2.03-5.3,3.66-8.1,4.9-2.8,1.24-5.6,1.79-8.4,1.66-5.47-.27-9.57-1.9-12.3-4.9-2.73-3-4.1-6.83-4.1-11.5-3.2,4.13-6.97,7.77-11.3,10.9-4.33,3.13-8.9,4.7-13.7,4.7s-8.37-1.43-11.1-4.3c-2.73-2.87-4.4-6.67-5-11.4-.6-4.73-.07-10.07,1.6-16,1.67-5.93,4.57-11.9,8.7-17.9,8.13-11.73,15.9-20.1,23.3-25.1s13.63-7.5,18.7-7.5c4.27,0,7.43,1.43,9.5,4.3,2.07,2.87,2.97,6.23,2.7,10.1Zm-17.4,31c6.4-11.07,10.17-19.6,11.3-25.6,1.13-6,.23-9.13-2.7-9.4-1.6-.13-3.67.53-6.2,2-2.53,1.47-5.23,3.53-8.1,6.2-2.87,2.67-5.83,5.9-8.9,9.7-3.07,3.8-6,7.9-8.8,12.3-2.67,4.27-4.8,8.5-6.4,12.7-1.6,4.2-2.67,7.93-3.2,11.2-.53,3.27-.47,5.93.2,8,.67,2.07,2,3.1,4,3.1s4.17-.73,6.5-2.2c2.33-1.47,4.73-3.53,7.2-6.2,2.47-2.67,4.97-5.87,7.5-9.6,2.53-3.73,5.07-7.8,7.6-12.2Z"
            />
            <path
                d="m164.84,80.92c-3.87,6.13-9.2,11.28-16,15.44-6.8,4.16-14.4,7.77-22.8,10.84-2.8,6.67-5.77,13.5-8.9,20.5-3.13,7-6.43,13.53-9.9,19.6-3.47,6.07-7.1,11.33-10.9,15.8-3.8,4.47-7.7,7.5-11.7,9.1-2,.8-3.97.97-5.9.5-1.93-.47-3.83-2.03-5.7-4.7-2.13-3.07-3.8-6.47-5-10.2-1.2-3.73-.87-8.6,1-14.6,1.47-4.53,3.6-8.7,6.4-12.5,2.8-3.8,6.07-7.23,9.8-10.3,3.73-3.07,7.87-5.87,12.4-8.4,4.53-2.53,9.27-4.73,14.2-6.6,1.07-2.27,2.03-4.58,2.9-6.92.87-2.35,1.83-4.67,2.9-6.96-2.93,2.93-6.1,5.33-9.5,7.2-3.4,1.87-6.97,2.8-10.7,2.8-4.67,0-8.33-1.43-11-4.3-2.67-2.87-4.3-6.6-4.9-11.2-.6-4.6-.07-9.83,1.6-15.7,1.67-5.87,4.5-11.8,8.5-17.8,3.87-5.73,7.77-10.67,11.7-14.8,3.93-4.13,7.7-7.47,11.3-10,3.6-2.53,7.03-4.4,10.3-5.6,3.27-1.2,6.17-1.8,8.7-1.8,4,0,7,1.33,9,4,2,2.67,2.93,5.73,2.8,9.2,1.2-2,2.33-3.9,3.4-5.7,1.07-1.8,2.13-3.57,3.2-5.3.8-1.47,1.67-2.27,2.6-2.4.93-.13,1.73.27,2.4,1.2,1.47,1.87,2.4,4.77,2.8,8.71s-.67,8.38-3.2,13.32c-1.47,3.07-3.3,6.78-5.5,11.11-2.2,4.34-4.57,9.01-7.1,14.02-2.53,5.01-5.03,10.14-7.5,15.42-2.47,5.27-4.77,10.31-6.9,15.12,8.4-4.31,15.47-9.07,21.2-14.28,5.73-5.2,10.6-10.47,14.6-15.81.67-.8,1.33-1.2,2-1.2s1.13.53,1.4,1.6c.27.93.1,2.43-.5,4.5-.6,2.07-1.77,4.43-3.5,7.1Zm-56.4,32.6c-6.53,3.87-12,8.27-16.4,13.2-4.4,4.93-7.83,9.73-10.3,14.4-2.47,4.67-4.07,8.83-4.8,12.5-.73,3.67-.7,6.1.1,7.3.67.93,2.07.43,4.2-1.5,2.13-1.93,4.67-5.03,7.6-9.3,2.93-4.27,6.13-9.53,9.6-15.8,3.47-6.27,6.8-13.2,10-20.8Zm19.6-48.09c6.4-11.1,10.17-19.62,11.3-25.58,1.13-5.95.23-9.06-2.7-9.33-1.6-.13-3.63.54-6.1,2.01-2.47,1.47-5.13,3.54-8,6.22-2.87,2.67-5.83,5.85-8.9,9.53-3.07,3.68-6,7.72-8.8,12.13-2.67,4.28-4.8,8.53-6.4,12.74-1.6,4.21-2.63,7.96-3.1,11.23-.47,3.28-.33,5.95.4,8.02.73,2.07,2.1,3.11,4.1,3.11s4.1-.73,6.3-2.21c2.2-1.47,4.5-3.54,6.9-6.22,2.4-2.67,4.87-5.85,7.4-9.53,2.53-3.68,5.07-7.73,7.6-12.14Z"
            />
            <path
                d="m201.24,82.72c-1.73,2.4-3.7,4.77-5.9,7.1-2.2,2.33-4.53,4.4-7,6.2-2.47,1.8-5.03,3.23-7.7,4.3-2.67,1.07-5.4,1.47-8.2,1.2-3.6-.27-6.33-1.3-8.2-3.1-1.87-1.8-3.13-4.07-3.8-6.8-.67-2.73-.8-5.77-.4-9.1.4-3.33,1.13-6.67,2.2-10,2.27-6.67,5.8-14.53,10.6-23.6,4.8-9.07,10.47-18.2,17-27.4.8-1.07,1.67-1.6,2.6-1.6s1.8.47,2.6,1.4c4.53,6.8,3.27,15.8-3.8,27-3.73,5.87-6.73,11.03-9,15.5-2.27,4.47-4.47,9.1-6.6,13.9-2.13,4.93-3.07,9-2.8,12.2.27,3.2,1.53,4.93,3.8,5.2,2,.13,4.13-.57,6.4-2.1,2.27-1.53,4.67-3.7,7.2-6.5,2.53-2.8,5.17-6.1,7.9-9.9,2.73-3.8,5.43-7.9,8.1-12.3,6.27-10.13,11.17-18.73,14.7-25.8,3.53-7.07,6.9-12.73,10.1-17,1.87-2.67,3.53-3.07,5-1.2,1.47,1.87,2.4,4.8,2.8,8.8.4,4-.6,8.53-3,13.6-1.07,2.27-2.47,4.83-4.2,7.7-1.73,2.87-3.5,5.83-5.3,8.9-1.8,3.07-3.53,6.13-5.2,9.2-1.67,3.07-3.1,5.87-4.3,8.4-2.67,5.73-3.77,10.47-3.3,14.2.47,3.73,2.5,5.47,6.1,5.2,2.13-.13,4.33-.97,6.6-2.5,2.27-1.53,4.53-3.6,6.8-6.2,2.27-2.6,4.5-5.53,6.7-8.8,2.2-3.27,4.3-6.63,6.3-10.1.53-.93,1.17-1.43,1.9-1.5.73-.07,1.3.37,1.7,1.3.4.8.57,2.4.5,4.8-.07,2.4-.83,5-2.3,7.8-1.47,2.8-3.3,5.5-5.5,8.1-2.2,2.6-4.63,4.87-7.3,6.8-2.67,1.93-5.47,3.5-8.4,4.7-2.93,1.2-5.87,1.8-8.8,1.8-6.53,0-11.13-1.83-13.8-5.5-2.67-3.67-3.6-8.43-2.8-14.3Z"
            />
            <path
                d="m307.63,33.92c1.33-2.4,2.6-4.63,3.8-6.7,1.2-2.07,2.33-3.9,3.4-5.5,1.73-2.53,3.33-2.93,4.8-1.2,1.47,1.86,2.4,4.76,2.8,8.68.4,3.92-.6,8.41-3,13.46-1.07,2.26-2.47,4.82-4.2,7.68-1.73,2.86-3.5,5.85-5.3,8.98-1.8,3.12-3.57,6.22-5.3,9.28-1.73,3.06-3.2,5.92-4.4,8.58-1.2,2.79-2.13,5.39-2.8,7.78-.67,2.39-.93,4.46-.8,6.18.13,1.73.6,3.09,1.4,4.09.8,1,2.07,1.43,3.8,1.3,2-.13,4.17-1,6.5-2.6,2.33-1.6,4.67-3.7,7-6.3,2.33-2.6,4.6-5.53,6.8-8.8,2.2-3.27,4.17-6.63,5.9-10.1.53-.93,1.1-1.43,1.7-1.5.6-.07,1.1.37,1.5,1.3.4.93.53,2.53.4,4.8-.13,2.27-.87,4.8-2.2,7.6-1.33,2.8-3.07,5.5-5.2,8.1-2.13,2.6-4.5,4.92-7.1,6.94-2.6,2.03-5.3,3.66-8.1,4.9-2.8,1.24-5.6,1.79-8.4,1.66-5.47-.27-9.57-1.9-12.3-4.9-2.73-3-4.1-6.83-4.1-11.5-3.2,4.13-6.97,7.77-11.3,10.9-4.33,3.13-8.9,4.7-13.7,4.7s-8.37-1.43-11.1-4.3c-2.73-2.87-4.4-6.67-5-11.4-.6-4.73-.07-10.07,1.6-16,1.67-5.93,4.57-11.9,8.7-17.9,8.13-11.73,15.9-20.1,23.3-25.1,7.4-5,13.63-7.5,18.7-7.5,4.27,0,7.43,1.43,9.5,4.3,2.07,2.87,2.97,6.23,2.7,10.1Zm-17.4,31c6.4-11.07,10.17-19.6,11.3-25.6,1.13-6,.23-9.13-2.7-9.4-1.6-.13-3.67.53-6.2,2-2.53,1.47-5.23,3.53-8.1,6.2-2.87,2.67-5.83,5.9-8.9,9.7-3.07,3.8-6,7.9-8.8,12.3-2.67,4.27-4.8,8.5-6.4,12.7-1.6,4.2-2.67,7.93-3.2,11.2-.54,3.27-.47,5.93.2,8,.67,2.07,2,3.1,4,3.1s4.17-.73,6.5-2.2c2.33-1.47,4.73-3.53,7.2-6.2,2.47-2.67,4.97-5.87,7.5-9.6,2.53-3.73,5.07-7.8,7.6-12.2Z"
            />
            <path
                d="m326.03,102.72c9.2-4.8,16.73-10.17,22.6-16.1,5.87-5.93,10.93-12.03,15.2-18.3.53-.8,1.13-1.23,1.8-1.3.67-.07,1.13.43,1.4,1.5.27,1.07.2,2.63-.2,4.7-.4,2.07-1.33,4.43-2.8,7.1-3.87,6.93-9.5,12.83-16.9,17.7-7.4,4.87-15.63,9.23-24.7,13.1-2.8,6.67-5.83,13.5-9.1,20.5-3.27,7-6.67,13.57-10.2,19.7-3.53,6.13-7.2,11.43-11,15.9-3.8,4.47-7.7,7.43-11.7,8.9-1.87.67-3.77.9-5.7.7-1.93-.2-3.83-1.7-5.7-4.5-1.07-1.47-2.07-3.04-3-4.7-.93-1.67-1.7-3.5-2.3-5.5s-.9-4.2-.9-6.6.54-5.07,1.6-8c1.6-4.53,3.8-8.7,6.6-12.5,2.8-3.8,6.1-7.27,9.9-10.4,3.8-3.13,8-5.97,12.6-8.5,4.6-2.53,9.37-4.73,14.3-6.6,3.33-8.13,6.93-16.43,10.8-24.9,3.87-8.47,7.67-16.53,11.4-24.2,3.73-7.67,7.33-14.73,10.8-21.2,3.47-6.47,6.53-11.7,9.2-15.7,1.6-2.53,3.2-2.93,4.8-1.2,1.47,1.73,2.3,4.57,2.5,8.5.2,3.93-.83,8.43-3.1,13.5-1.2,2.8-2.93,6.5-5.2,11.1-2.27,4.6-4.73,9.57-7.4,14.9-2.67,5.33-5.4,10.83-8.2,16.5-2.8,5.67-5.27,10.97-7.4,15.9Zm-21.6,15.2c-6.53,3.73-12,8.07-16.4,13-4.4,4.93-7.87,9.77-10.4,14.5-2.53,4.73-4.17,8.93-4.9,12.6-.73,3.67-.63,6.1.3,7.3.67.93,2.1.37,4.3-1.7,2.2-2.07,4.77-5.27,7.7-9.6,2.93-4.33,6.1-9.6,9.5-15.8,3.4-6.2,6.7-12.97,9.9-20.3ZM370.23,6.72c1.2,2.67,1.6,5.13,1.2,7.4-.4,2.27-1.2,4.13-2.4,5.6-1.33,1.47-3.17,2-5.5,1.6-2.33-.4-4.23-1.93-5.7-4.6-1.47-2.67-2.03-5.3-1.7-7.9.33-2.6,1.23-4.77,2.7-6.5,1.6-1.87,3.6-2.3,6-1.3,2.4,1,4.2,2.9,5.4,5.7Z"
            />
            <path
                d="m378.23,64.52c-3.2,9.2-3.83,16.7-1.9,22.5,1.93,5.8,5.57,8.83,10.9,9.1,4.13.27,8.13-.46,12-2.19,3.87-1.74,7.5-4.01,10.9-6.81,3.4-2.8,6.53-5.9,9.4-9.3,2.87-3.4,5.37-6.77,7.5-10.1.53-.8,1.13-1.2,1.8-1.2s1.2.47,1.6,1.4c.4.8.4,2.4,0,4.8-.4,2.4-1.53,4.93-3.4,7.6-4.27,6.13-9.93,11.27-17,15.4-7.07,4.13-14.47,6.27-22.2,6.4-6.4.13-11.7-1.27-15.9-4.2-4.2-2.93-7.23-6.73-9.1-11.4-1.87-4.67-2.5-10.07-1.9-16.2.6-6.13,2.5-12.4,5.7-18.8s6.8-11.87,10.8-16.4c4-4.53,8-8.07,12-10.6,4-2.53,7.8-4.1,11.4-4.7s6.67-.17,9.2,1.3c2.53,1.47,4.73,3,6.6,4.6,1.87,1.6,3.6,3.53,5.2,5.8.93,1.2,1.5,2.8,1.7,4.8s.07,4.23-.4,6.7c-.47,2.47-1.33,5.07-2.6,7.8-1.27,2.73-2.97,5.37-5.1,7.9-2.4,3.07-5.03,5.6-7.9,7.6-2.87,2-5.9,3.37-9.1,4.1-3.2.73-6.5.63-9.9-.3-3.4-.93-6.83-2.8-10.3-5.6Zm1.8-4.2c2.4,1.6,4.73,2.33,7,2.2,2.27-.13,4.4-.8,6.4-2,2-1.2,3.87-2.73,5.6-4.6,1.73-1.87,3.33-3.73,4.8-5.6,1.6-2.13,3.03-4.3,4.3-6.5,1.27-2.2,2.3-4.3,3.1-6.3.8-2,1.27-3.73,1.4-5.2.13-1.47-.13-2.47-.8-3-1.07-.8-2.8-.73-5.2.2-2.4.93-5.07,2.67-8,5.2-2.93,2.53-5.9,5.67-8.9,9.4-3,3.73-5.7,8-8.1,12.8-.27.67-.53,1.27-.8,1.8-.27.53-.53,1.07-.8,1.6Z"
            />
        </svg>
    )
})

const CamuCamuSvg = ({isActive}: { active: boolean }) => {


    return (
        <svg className={`${isActive ? "aguajeSvg" : ""} slideElement camuCamu w-full h-[500px]`} id="Capa_1"
             data-name="Capa 1"
             viewBox="0 0 330.68 153.68">
            <path className="cls-1"
                  d="m36.94,2.16c3.8,2.3,6.55,5.05,8.25,8.25.8,1.6,1.07,3.28.83,5.02-.25,1.75-.75,3.58-1.5,5.48-.75,1.9-1.63,3.85-2.62,5.85-1,2-1.85,4-2.55,6-.3.9-.65,1.45-1.05,1.65-.4.2-1.1.05-2.1-.45-1.8-.9-3.13-2.45-3.97-4.65-.85-2.2-.73-5,.38-8.4.4-1.3.95-2.67,1.65-4.12.7-1.45,1.3-2.8,1.8-4.05.5-1.25.85-2.35,1.05-3.3.2-.95.05-1.62-.45-2.02-.6-.5-1.7-.32-3.3.52-1.6.85-3.4,2.23-5.4,4.12-2,1.9-4.05,4.27-6.15,7.12s-4,5.98-5.7,9.38c-2.1,4.2-3.5,8.1-4.2,11.7-.7,3.6-.83,6.73-.38,9.38.45,2.65,1.4,4.72,2.85,6.22,1.45,1.5,3.27,2.25,5.48,2.25,3.1,0,6.1-.65,9-1.95,2.9-1.3,5.62-3,8.17-5.1s4.88-4.4,6.98-6.9c2.1-2.5,3.9-4.95,5.4-7.35.4-.6.87-.92,1.42-.98.55-.05.98.33,1.28,1.12.2.6.12,1.75-.23,3.45-.35,1.7-1.18,3.55-2.48,5.55-1.4,2.2-3.18,4.27-5.33,6.23-2.15,1.95-4.5,3.67-7.05,5.17s-5.25,2.7-8.1,3.6-5.68,1.35-8.48,1.35c-4.8.1-8.77-.9-11.92-3s-5.4-4.92-6.75-8.48C.42,47.29-.03,43.24.42,38.69c.45-4.55,1.88-9.23,4.27-14.02,2.4-4.7,5.07-8.72,8.03-12.08,2.95-3.35,5.9-6,8.85-7.95,2.95-1.95,5.78-3.12,8.48-3.53,2.7-.4,5-.05,6.9,1.05Z"/>
            <path className="cls-1"
                  d="m95.14,11.31c1-1.8,1.95-3.47,2.85-5.02.9-1.55,1.75-2.93,2.55-4.12,1.3-1.9,2.5-2.2,3.6-.9,1.1,1.4,1.8,3.57,2.1,6.51.3,2.94-.45,6.31-2.25,10.1-.8,1.7-1.85,3.62-3.15,5.76-1.3,2.14-2.62,4.39-3.97,6.73-1.35,2.34-2.68,4.66-3.98,6.96-1.3,2.29-2.4,4.44-3.3,6.43-.9,2.1-1.6,4.04-2.1,5.84-.5,1.8-.7,3.34-.6,4.64.1,1.3.45,2.32,1.05,3.07.6.75,1.55,1.07,2.85.97,1.5-.1,3.12-.75,4.88-1.95,1.75-1.2,3.5-2.77,5.25-4.73,1.75-1.95,3.45-4.15,5.1-6.6,1.65-2.45,3.12-4.97,4.42-7.57.4-.7.83-1.07,1.27-1.12.45-.05.83.28,1.12.98.3.7.4,1.9.3,3.6-.1,1.7-.65,3.6-1.65,5.7-1,2.1-2.3,4.12-3.9,6.08-1.6,1.95-3.38,3.69-5.32,5.21-1.95,1.52-3.98,2.74-6.08,3.68-2.1.93-4.2,1.34-6.3,1.24-4.1-.2-7.18-1.43-9.23-3.68-2.05-2.25-3.08-5.12-3.08-8.62-2.4,3.1-5.23,5.83-8.47,8.18-3.25,2.35-6.68,3.52-10.28,3.52s-6.28-1.08-8.32-3.23c-2.05-2.15-3.3-5-3.75-8.55-.45-3.55-.05-7.55,1.2-12,1.25-4.45,3.42-8.93,6.53-13.43,6.1-8.8,11.92-15.07,17.47-18.82,5.55-3.75,10.22-5.62,14.03-5.62,3.2,0,5.57,1.08,7.12,3.22,1.55,2.15,2.22,4.68,2.02,7.58Zm-13.05,23.25c4.8-8.3,7.62-14.7,8.48-19.2.85-4.5.17-6.85-2.02-7.05-1.2-.1-2.75.4-4.65,1.5-1.9,1.1-3.93,2.65-6.08,4.65-2.15,2-4.38,4.43-6.67,7.27-2.3,2.85-4.5,5.93-6.6,9.23-2,3.2-3.6,6.38-4.8,9.52-1.2,3.15-2,5.95-2.4,8.4-.4,2.45-.35,4.45.15,6,.5,1.55,1.5,2.32,3,2.32s3.12-.55,4.88-1.65c1.75-1.1,3.55-2.65,5.4-4.65,1.85-2,3.72-4.4,5.62-7.2,1.9-2.8,3.8-5.85,5.7-9.15Z"/>
            <path className="cls-1"
                  d="m131.29,17.61c1.6-1.9,3.47-3.82,5.62-5.77,2.15-1.95,4.3-3.72,6.45-5.32,2.15-1.6,4.2-2.87,6.15-3.83,1.95-.95,3.62-1.42,5.03-1.42,1.3,0,2.42.48,3.38,1.42.95.95,1.67,2.13,2.17,3.52.5,1.4.8,2.98.9,4.73.1,1.75-.1,3.43-.6,5.02,1.8-1.8,3.72-3.52,5.78-5.17,2.05-1.65,4.1-3.15,6.15-4.5,2.05-1.35,3.97-2.4,5.77-3.15s3.3-1.12,4.5-1.12c1.3,0,2.37.52,3.23,1.57.85,1.05,1.42,2.35,1.72,3.9.3,1.55.32,3.3.08,5.25-.25,1.95-.73,3.88-1.42,5.78-.7,1.7-1.63,3.55-2.78,5.55-1.15,2-2.4,4.08-3.75,6.23-1.35,2.15-2.68,4.27-3.97,6.38-1.3,2.1-2.4,4.1-3.3,6-1.1,2.1-1.78,4.1-2.02,6-.25,1.9-.23,3.55.08,4.95.3,1.4.9,2.48,1.8,3.23.9.75,2.05,1.12,3.45,1.12,1.5,0,3.05-.6,4.65-1.8,1.6-1.2,3.2-2.75,4.8-4.65,1.6-1.9,3.17-4.07,4.73-6.53,1.55-2.45,3.08-4.97,4.58-7.57.4-.7.85-1.05,1.35-1.05s.95.25,1.35.75c.4.5.47,1.78.23,3.83-.25,2.05-.78,3.93-1.58,5.62-1.1,2.1-2.47,4.12-4.12,6.08-1.65,1.95-3.48,3.67-5.47,5.14-2,1.48-4.1,2.62-6.3,3.45-2.2.82-4.4,1.23-6.6,1.23-3.3,0-6.05-.6-8.25-1.8-2.2-1.2-3.83-2.82-4.88-4.88-1.05-2.05-1.53-4.45-1.43-7.2.1-2.75.85-5.67,2.25-8.77,1.4-3.1,3.15-6.38,5.25-9.83,2.1-3.45,4.1-6.62,6-9.52,1.9-2.9,3.42-5.35,4.58-7.35,1.15-2,1.42-3.1.82-3.3-.3-.1-.85-.05-1.65.15-.8.2-1.85.7-3.15,1.5-1.3.8-2.9,1.95-4.8,3.45-1.9,1.5-4.05,3.45-6.45,5.85-6.3,6.3-11.43,12.93-15.38,19.88-3.95,6.95-7.53,13.98-10.73,21.07-1,2-2.15,2.25-3.45.75-.6-.6-1.18-1.4-1.73-2.4-.55-1-.9-2.27-1.05-3.83-.15-1.55-.05-3.38.3-5.47.35-2.1,1.07-4.5,2.17-7.2,1.2-3.1,2.97-6.57,5.33-10.42,2.35-3.85,4.6-7.5,6.75-10.95,2.15-3.45,3.87-6.38,5.17-8.77,1.3-2.4,1.6-3.75.9-4.05-.9-.4-3.05.48-6.45,2.62-3.4,2.15-7.5,5.88-12.3,11.18-4.5,4.8-8.55,10.5-12.15,17.1-3.6,6.6-6.9,13.45-9.9,20.55-.7,1.6-1.65,1.85-2.85.75-1.7-1.35-2.7-3.28-3-5.81-.3-2.53.2-5.69,1.5-9.49.8-2.4,2.02-5.4,3.68-9,1.65-3.6,3.55-7.47,5.7-11.62,2.15-4.15,4.45-8.33,6.9-12.53,2.45-4.2,4.88-8.05,7.28-11.55,1.1-1.7,2.15-1.7,3.15,0,1.3,2.1,1.88,4.55,1.73,7.35-.15,2.8-.78,5.7-1.88,8.7Z"/>
            <path className="cls-1"
                  d="m221.74,47.91c-1.3,1.8-2.78,3.58-4.43,5.32-1.65,1.75-3.4,3.3-5.25,4.65-1.85,1.35-3.78,2.42-5.77,3.22-2,.8-4.05,1.1-6.15.9-2.7-.2-4.75-.98-6.15-2.33-1.4-1.35-2.35-3.05-2.85-5.1-.5-2.05-.6-4.32-.3-6.82.3-2.5.85-5,1.65-7.5,1.7-5,4.35-10.9,7.95-17.7,3.6-6.8,7.85-13.65,12.75-20.55.6-.8,1.25-1.2,1.95-1.2s1.35.35,1.95,1.05c3.4,5.1,2.45,11.85-2.85,20.25-2.8,4.4-5.05,8.28-6.75,11.62-1.7,3.35-3.35,6.83-4.95,10.43-1.6,3.7-2.3,6.75-2.1,9.15.2,2.4,1.15,3.7,2.85,3.9,1.5.1,3.1-.42,4.8-1.57,1.7-1.15,3.5-2.78,5.4-4.88,1.9-2.1,3.87-4.58,5.92-7.43,2.05-2.85,4.07-5.92,6.08-9.23,4.7-7.6,8.37-14.05,11.02-19.35,2.65-5.3,5.17-9.55,7.58-12.75,1.4-2,2.65-2.3,3.75-.9,1.1,1.4,1.8,3.6,2.1,6.6.3,3-.45,6.4-2.25,10.2-.8,1.7-1.85,3.63-3.15,5.77-1.3,2.15-2.62,4.38-3.98,6.67-1.35,2.3-2.65,4.6-3.9,6.9-1.25,2.3-2.33,4.4-3.23,6.3-2,4.3-2.83,7.85-2.47,10.65.35,2.8,1.88,4.1,4.58,3.9,1.6-.1,3.25-.72,4.95-1.88,1.7-1.15,3.4-2.7,5.1-4.65,1.7-1.95,3.38-4.15,5.03-6.6,1.65-2.45,3.22-4.97,4.72-7.57.4-.7.87-1.07,1.42-1.12.55-.05.98.28,1.28.98.3.6.42,1.8.38,3.6-.05,1.8-.63,3.75-1.73,5.85-1.1,2.1-2.47,4.12-4.12,6.08-1.65,1.95-3.48,3.65-5.47,5.1-2,1.45-4.1,2.62-6.3,3.52-2.2.9-4.4,1.35-6.6,1.35-4.9,0-8.35-1.38-10.35-4.12-2-2.75-2.7-6.32-2.1-10.73Z"/>
            <path className="cls-1"
                  d="m108.94,92.16c3.8,2.3,6.55,5.05,8.25,8.25.8,1.6,1.07,3.28.83,5.03-.25,1.75-.75,3.58-1.5,5.47-.75,1.9-1.63,3.85-2.62,5.85-1,2-1.85,4-2.55,6-.3.9-.65,1.45-1.05,1.65-.4.2-1.1.05-2.1-.45-1.8-.9-3.13-2.45-3.97-4.65-.85-2.2-.73-5,.38-8.4.4-1.3.95-2.67,1.65-4.12.7-1.45,1.3-2.8,1.8-4.05.5-1.25.85-2.35,1.05-3.3.2-.95.05-1.62-.45-2.02-.6-.5-1.7-.32-3.3.52-1.6.85-3.4,2.23-5.4,4.12-2,1.9-4.05,4.27-6.15,7.13-2.1,2.85-4,5.98-5.7,9.38-2.1,4.2-3.5,8.1-4.2,11.7-.7,3.6-.83,6.73-.38,9.38.45,2.65,1.4,4.72,2.85,6.22,1.45,1.5,3.27,2.25,5.48,2.25,3.1,0,6.1-.65,9-1.95,2.9-1.3,5.62-3,8.17-5.1,2.55-2.1,4.88-4.4,6.98-6.9,2.1-2.5,3.9-4.95,5.4-7.35.4-.6.87-.92,1.42-.98.55-.05.98.33,1.28,1.12.2.6.12,1.75-.23,3.45-.35,1.7-1.18,3.55-2.48,5.55-1.4,2.2-3.18,4.28-5.33,6.23-2.15,1.95-4.5,3.67-7.05,5.17s-5.25,2.7-8.1,3.6c-2.85.9-5.68,1.35-8.48,1.35-4.8.1-8.77-.9-11.92-3-3.15-2.1-5.4-4.92-6.75-8.48-1.35-3.55-1.8-7.6-1.35-12.15.45-4.55,1.88-9.23,4.27-14.03,2.4-4.7,5.07-8.72,8.03-12.08,2.95-3.35,5.9-6,8.85-7.95,2.95-1.95,5.78-3.12,8.48-3.53,2.7-.4,5-.05,6.9,1.05Z"/>
            <path className="cls-1"
                  d="m167.14,101.31c1-1.8,1.95-3.47,2.85-5.02.9-1.55,1.75-2.93,2.55-4.12,1.3-1.9,2.5-2.2,3.6-.9,1.1,1.4,1.8,3.57,2.1,6.51.3,2.94-.45,6.31-2.25,10.1-.8,1.7-1.85,3.62-3.15,5.76-1.3,2.14-2.62,4.39-3.97,6.73-1.35,2.34-2.68,4.66-3.98,6.96-1.3,2.29-2.4,4.44-3.3,6.43-.9,2.09-1.6,4.04-2.1,5.84-.5,1.79-.7,3.34-.6,4.64.1,1.3.45,2.32,1.05,3.07.6.75,1.55,1.07,2.85.97,1.5-.1,3.12-.75,4.88-1.95,1.75-1.2,3.5-2.78,5.25-4.73,1.75-1.95,3.45-4.15,5.1-6.6,1.65-2.45,3.12-4.97,4.42-7.58.4-.7.83-1.07,1.27-1.12.45-.05.83.28,1.12.98.3.7.4,1.9.3,3.6-.1,1.7-.65,3.6-1.65,5.7-1,2.1-2.3,4.12-3.9,6.08-1.6,1.95-3.38,3.69-5.32,5.21-1.95,1.52-3.98,2.74-6.08,3.67-2.1.93-4.2,1.34-6.3,1.25-4.1-.2-7.18-1.43-9.23-3.68-2.05-2.25-3.08-5.12-3.08-8.62-2.4,3.1-5.23,5.83-8.47,8.18-3.25,2.35-6.68,3.52-10.28,3.52s-6.28-1.08-8.32-3.22c-2.05-2.15-3.3-5-3.75-8.55-.45-3.55-.05-7.55,1.2-12,1.25-4.45,3.42-8.93,6.53-13.43,6.1-8.8,11.92-15.07,17.47-18.82,5.55-3.75,10.22-5.62,14.03-5.62,3.2,0,5.57,1.08,7.12,3.22,1.55,2.15,2.22,4.68,2.02,7.58Zm-13.05,23.25c4.8-8.3,7.62-14.7,8.48-19.2.85-4.5.17-6.85-2.02-7.05-1.2-.1-2.75.4-4.65,1.5-1.9,1.1-3.93,2.65-6.08,4.65-2.15,2-4.38,4.43-6.67,7.28-2.3,2.85-4.5,5.92-6.6,9.22-2,3.2-3.6,6.38-4.8,9.53-1.2,3.15-2,5.95-2.4,8.4-.4,2.45-.35,4.45.15,6,.5,1.55,1.5,2.32,3,2.32s3.12-.55,4.88-1.65c1.75-1.1,3.55-2.65,5.4-4.65,1.85-2,3.72-4.4,5.62-7.2,1.9-2.8,3.8-5.85,5.7-9.15Z"/>
            <path className="cls-1"
                  d="m203.29,107.61c1.6-1.9,3.47-3.83,5.62-5.78,2.15-1.95,4.3-3.72,6.45-5.32,2.15-1.6,4.2-2.87,6.15-3.83,1.95-.95,3.62-1.42,5.03-1.42,1.3,0,2.42.48,3.38,1.42.95.95,1.67,2.13,2.17,3.52.5,1.4.8,2.98.9,4.73.1,1.75-.1,3.43-.6,5.02,1.8-1.8,3.72-3.52,5.78-5.17,2.05-1.65,4.1-3.15,6.15-4.5,2.05-1.35,3.98-2.4,5.78-3.15s3.3-1.12,4.5-1.12c1.3,0,2.37.52,3.22,1.57.85,1.05,1.43,2.35,1.73,3.9.3,1.55.32,3.3.08,5.25-.25,1.95-.73,3.88-1.43,5.78-.7,1.7-1.63,3.55-2.77,5.55-1.15,2-2.4,4.08-3.75,6.22-1.35,2.15-2.68,4.28-3.98,6.38-1.3,2.1-2.4,4.1-3.3,6-1.1,2.1-1.78,4.1-2.02,6-.25,1.9-.23,3.55.07,4.95.3,1.4.9,2.47,1.8,3.22.9.75,2.05,1.12,3.45,1.12,1.5,0,3.05-.6,4.65-1.8,1.6-1.2,3.2-2.75,4.8-4.65,1.6-1.9,3.17-4.07,4.73-6.53,1.55-2.45,3.07-4.97,4.57-7.58.4-.7.85-1.05,1.35-1.05s.95.25,1.35.75c.4.5.47,1.78.23,3.83-.25,2.05-.78,3.93-1.58,5.62-1.1,2.1-2.48,4.12-4.12,6.08-1.65,1.95-3.48,3.67-5.48,5.14-2,1.48-4.1,2.62-6.3,3.45-2.2.82-4.4,1.23-6.6,1.23-3.3,0-6.05-.6-8.25-1.8-2.2-1.2-3.83-2.82-4.88-4.88-1.05-2.05-1.53-4.45-1.42-7.2.1-2.75.85-5.67,2.25-8.77,1.4-3.1,3.15-6.38,5.25-9.83,2.1-3.45,4.1-6.62,6-9.53,1.9-2.9,3.42-5.35,4.57-7.35,1.15-2,1.43-3.1.83-3.3-.3-.1-.85-.05-1.65.15-.8.2-1.85.7-3.15,1.5-1.3.8-2.9,1.95-4.8,3.45-1.9,1.5-4.05,3.45-6.45,5.85-6.3,6.3-11.43,12.93-15.38,19.88-3.95,6.95-7.53,13.98-10.72,21.07-1,2-2.15,2.25-3.45.75-.6-.6-1.18-1.4-1.72-2.4-.55-1-.9-2.27-1.05-3.83-.15-1.55-.05-3.38.3-5.47.35-2.1,1.07-4.5,2.17-7.2,1.2-3.1,2.97-6.57,5.32-10.42,2.35-3.85,4.6-7.5,6.75-10.95,2.15-3.45,3.88-6.38,5.18-8.78,1.3-2.4,1.6-3.75.9-4.05-.9-.4-3.05.48-6.45,2.62-3.4,2.15-7.5,5.88-12.3,11.18-4.5,4.8-8.55,10.5-12.15,17.1-3.6,6.6-6.9,13.45-9.9,20.55-.7,1.6-1.65,1.85-2.85.75-1.7-1.35-2.7-3.28-3-5.81-.3-2.53.2-5.69,1.5-9.49.8-2.4,2.02-5.4,3.67-9,1.65-3.6,3.55-7.47,5.7-11.62,2.15-4.15,4.45-8.33,6.9-12.53,2.45-4.2,4.88-8.05,7.28-11.55,1.1-1.7,2.15-1.7,3.15,0,1.3,2.1,1.88,4.55,1.73,7.35-.15,2.8-.78,5.7-1.88,8.7Z"/>
            <path className="cls-1"
                  d="m293.74,137.91c-1.3,1.8-2.78,3.58-4.43,5.33-1.65,1.75-3.4,3.3-5.25,4.65-1.85,1.35-3.78,2.42-5.77,3.22-2,.8-4.05,1.1-6.15.9-2.7-.2-4.75-.98-6.15-2.33-1.4-1.35-2.35-3.05-2.85-5.1-.5-2.05-.6-4.32-.3-6.82.3-2.5.85-5,1.65-7.5,1.7-5,4.35-10.9,7.95-17.7,3.6-6.8,7.85-13.65,12.75-20.55.6-.8,1.25-1.2,1.95-1.2s1.35.35,1.95,1.05c3.4,5.1,2.45,11.85-2.85,20.25-2.8,4.4-5.05,8.28-6.75,11.62-1.7,3.35-3.35,6.83-4.95,10.42-1.6,3.7-2.3,6.75-2.1,9.15.2,2.4,1.15,3.7,2.85,3.9,1.5.1,3.1-.42,4.8-1.57,1.7-1.15,3.5-2.78,5.4-4.88,1.9-2.1,3.87-4.58,5.92-7.43,2.05-2.85,4.07-5.92,6.08-9.22,4.7-7.6,8.37-14.05,11.02-19.35,2.65-5.3,5.17-9.55,7.58-12.75,1.4-2,2.65-2.3,3.75-.9,1.1,1.4,1.8,3.6,2.1,6.6.3,3-.45,6.4-2.25,10.2-.8,1.7-1.85,3.63-3.15,5.78-1.3,2.15-2.62,4.38-3.98,6.67-1.35,2.3-2.65,4.6-3.9,6.9-1.25,2.3-2.33,4.4-3.23,6.3-2,4.3-2.83,7.85-2.47,10.65.35,2.8,1.88,4.1,4.58,3.9,1.6-.1,3.25-.72,4.95-1.88,1.7-1.15,3.4-2.7,5.1-4.65,1.7-1.95,3.38-4.15,5.03-6.6,1.65-2.45,3.22-4.97,4.72-7.58.4-.7.87-1.07,1.42-1.12.55-.05.98.28,1.28.98.3.6.42,1.8.38,3.6-.05,1.8-.63,3.75-1.73,5.85-1.1,2.1-2.47,4.12-4.12,6.08-1.65,1.95-3.48,3.65-5.47,5.1-2,1.45-4.1,2.62-6.3,3.52-2.2.9-4.4,1.35-6.6,1.35-4.9,0-8.35-1.38-10.35-4.12-2-2.75-2.7-6.32-2.1-10.73Z"/>
        </svg>
    )
}


const DesayunosSvg = ({isActive}: { active: boolean }) => {

    return (
        <svg className={`${isActive ? "aguajeSvg" : ""} slideElement desayunos w-full h-[500px]`} id="Capa_1" data-name="Capa 1"
             viewBox="0 0 574.22 174.51">
            <path className="cls-1"
                  d="m50.42,91.07c-1.17,2.57-2.04,4.9-2.62,7-.59,2.1-.85,3.91-.79,5.42.06,1.52.44,2.69,1.14,3.5.7.82,1.81,1.17,3.32,1.05,1.75-.12,3.65-.88,5.69-2.28,2.04-1.4,4.05-3.21,6.04-5.42,1.98-2.21,3.94-4.75,5.86-7.61,1.93-2.86,3.65-5.8,5.16-8.84.46-.81.96-1.22,1.49-1.22s.96.35,1.31,1.05c.35.82.49,2.25.44,4.29-.06,2.04-.67,4.23-1.84,6.56-1.17,2.45-2.69,4.79-4.55,7-1.87,2.22-3.94,4.2-6.21,5.95s-4.64,3.12-7.09,4.11c-2.45.99-4.9,1.43-7.35,1.31-4.79-.24-8.34-1.6-10.68-4.11-2.33-2.51-3.5-5.8-3.5-9.89-2.8,3.5-6.1,6.62-9.89,9.36-3.79,2.74-7.73,4.11-11.81,4.11s-7.32-1.26-9.71-3.76c-2.39-2.51-3.85-5.83-4.38-9.98-.53-4.14-.06-8.78,1.4-13.91,1.46-5.13,3.99-10.32,7.61-15.57,3.5-5.02,6.94-9.33,10.33-12.95,3.38-3.61,6.65-6.53,9.8-8.75,3.15-2.21,6.12-3.85,8.93-4.9,2.8-1.05,5.31-1.58,7.52-1.58,3.61,0,6.3,1.17,8.05,3.5,1.75,2.34,2.56,5.14,2.45,8.4,2.33-4.55,4.87-9.33,7.61-14.35,2.74-5.02,5.43-9.83,8.05-14.44,2.62-4.61,5.1-8.86,7.44-12.77,2.33-3.91,4.31-6.97,5.95-9.19,1.86-2.56,3.27-2.56,4.2,0,.58,1.4.99,2.97,1.23,4.72.23,1.75.14,3.68-.26,5.78-.41,2.1-1.11,4.46-2.1,7.09-.99,2.62-2.42,5.57-4.29,8.84-2.1,3.74-4.64,8.23-7.61,13.48s-6.04,10.73-9.19,16.45c-3.15,5.72-6.24,11.41-9.27,17.06-3.04,5.66-5.66,10.82-7.88,15.49Zm-1.58-41.12c-1.4,0-3.18.64-5.34,1.92-2.16,1.29-4.49,3.09-7,5.43-2.51,2.33-5.1,5.1-7.79,8.31-2.69,3.21-5.25,6.74-7.7,10.59-2.34,3.73-4.2,7.41-5.6,11.02-1.4,3.62-2.31,6.85-2.71,9.71-.41,2.86-.32,5.19.26,7,.58,1.81,1.75,2.71,3.5,2.71,3.5.12,7.46-2.19,11.9-6.91,4.43-4.73,8.69-11.11,12.78-19.16,5.13-9.8,8.34-17.33,9.62-22.58,1.28-5.25.64-7.93-1.93-8.05Z"/>
            <path className="cls-1"
                  d="m88.22,79.87c-2.8,8.05-3.35,14.61-1.66,19.69,1.69,5.08,4.87,7.73,9.54,7.96,3.61.24,7.11-.4,10.5-1.92,3.38-1.52,6.56-3.5,9.54-5.96,2.97-2.45,5.71-5.16,8.22-8.14,2.51-2.98,4.7-5.92,6.56-8.84.46-.7.99-1.05,1.58-1.05s1.05.41,1.4,1.23c.35.7.35,2.1,0,4.2-.35,2.1-1.34,4.32-2.98,6.65-3.73,5.37-8.69,9.86-14.88,13.47-6.19,3.61-12.66,5.48-19.42,5.6-5.6.12-10.24-1.11-13.91-3.67-3.67-2.57-6.33-5.89-7.96-9.98-1.64-4.08-2.19-8.81-1.66-14.17.52-5.36,2.19-10.85,4.99-16.45,2.8-5.6,5.95-10.38,9.45-14.35,3.5-3.96,7-7.06,10.5-9.27,3.5-2.21,6.83-3.59,9.98-4.11s5.83-.15,8.05,1.14c2.21,1.29,4.14,2.62,5.78,4.03,1.63,1.4,3.15,3.09,4.55,5.07.81,1.05,1.31,2.45,1.49,4.2.18,1.75.06,3.71-.35,5.86-.41,2.16-1.17,4.44-2.28,6.83-1.11,2.39-2.6,4.7-4.46,6.91-2.1,2.69-4.4,4.9-6.91,6.65-2.51,1.75-5.16,2.95-7.96,3.59-2.8.64-5.69.56-8.66-.26-2.97-.81-5.98-2.45-9.01-4.9Zm1.57-3.67c2.1,1.4,4.14,2.04,6.12,1.92,1.98-.11,3.85-.7,5.6-1.75,1.75-1.05,3.38-2.39,4.9-4.02,1.52-1.63,2.92-3.26,4.2-4.9,1.4-1.86,2.65-3.76,3.76-5.69,1.11-1.93,2.01-3.76,2.71-5.51.7-1.75,1.11-3.26,1.23-4.55.11-1.28-.12-2.16-.7-2.62-.94-.7-2.45-.64-4.55.17-2.1.82-4.44,2.34-7,4.55-2.57,2.22-5.16,4.96-7.79,8.22-2.62,3.27-4.99,7-7.09,11.2-.24.58-.47,1.11-.7,1.58-.24.47-.47.94-.7,1.4Z"/>
            <path className="cls-1"
                  d="m134.94,81.27c3.61-4.9,7.23-10.03,10.85-15.4,3.62-5.36,6.71-10.26,9.28-14.7.46-3.38,1.16-6.06,2.1-8.05.93-1.98,2.33-3.79,4.2-5.42,1.98-1.75,3.85-2.83,5.6-3.24,1.75-.41,3.03-.2,3.85.61.93.94,1.22,1.96.88,3.06-.35,1.11-1.11,2.65-2.28,4.64-.35.59-.67,1.14-.96,1.66-.29.52-.61,1.08-.96,1.66-.35,4.08-.44,7.96-.26,11.64.18,3.67.44,7.26.79,10.76s.64,6.85.88,10.06c.23,3.21.29,6.33.18,9.36-.24,3.38-.82,6.77-1.75,10.15-.94,3.39-2.98,6.12-6.12,8.23,5.83-2.21,10.64-5.63,14.44-10.24,3.79-4.61,6.79-9.3,9.01-14.09.46-.93,1.05-1.34,1.75-1.23.7.12,1.23.52,1.58,1.23.35.82.41,2.27.17,4.38-.23,2.1-1.11,4.49-2.62,7.17-3.39,6.07-7.82,10.74-13.3,14-5.49,3.26-11.38,5.01-17.68,5.25-2.57.12-5.07,0-7.52-.35-2.45-.35-4.79-1.02-7-2.01-2.22-.99-4.29-2.36-6.21-4.11s-3.65-3.96-5.16-6.65c-1.05-1.98-1.81-4.14-2.27-6.47-.46-2.33-.61-4.61-.44-6.83.17-2.21.67-4.29,1.49-6.21.81-1.93,1.98-3.53,3.5-4.81,2.21-1.86,3.44-1.28,3.68,1.75.11.7.17,1.4.17,2.1s.06,1.4.18,2.1Zm19.77-18.9c-2.57,4.67-5.4,9.36-8.49,14.09-3.09,4.73-6.33,9.48-9.71,14.26.7,2.57,1.52,4.9,2.45,7,.93,2.1,1.98,3.85,3.15,5.25,1.17,1.4,2.42,2.42,3.76,3.06,1.34.64,2.71.73,4.11.26,1.98-.58,3.38-2.54,4.2-5.86.81-3.32,1.28-7.23,1.4-11.72.11-4.49.03-9.13-.26-13.91-.29-4.78-.5-8.93-.61-12.43Z"/>
            <path className="cls-1"
                  d="m237.66,53.1c1.16-2.1,2.27-4.05,3.32-5.86,1.05-1.81,2.04-3.41,2.98-4.81,1.51-2.21,2.92-2.56,4.2-1.05,1.28,1.63,2.1,4.16,2.45,7.59.35,3.43-.52,7.36-2.62,11.78-.94,1.98-2.16,4.22-3.67,6.72-1.52,2.5-3.06,5.12-4.64,7.85-1.57,2.73-3.12,5.44-4.64,8.12-1.52,2.68-2.8,5.18-3.85,7.5-1.05,2.44-1.87,4.71-2.45,6.81-.58,2.09-.82,3.9-.7,5.41.11,1.51.52,2.7,1.22,3.58.7.88,1.81,1.25,3.33,1.13,1.75-.11,3.65-.88,5.69-2.27,2.04-1.4,4.08-3.24,6.12-5.51,2.04-2.28,4.02-4.84,5.95-7.7,1.92-2.86,3.64-5.8,5.16-8.84.46-.81.96-1.25,1.49-1.31.52-.06.96.32,1.31,1.14.35.82.46,2.22.35,4.2-.12,1.98-.76,4.2-1.93,6.65-1.17,2.45-2.69,4.81-4.55,7.09-1.87,2.28-3.94,4.3-6.21,6.07-2.28,1.77-4.64,3.2-7.09,4.29-2.45,1.08-4.9,1.57-7.35,1.45-4.79-.23-8.37-1.66-10.76-4.29-2.39-2.62-3.59-5.98-3.59-10.06-2.8,3.62-6.1,6.8-9.89,9.54-3.79,2.74-7.79,4.11-11.99,4.11s-7.32-1.26-9.71-3.76c-2.39-2.51-3.85-5.83-4.38-9.98-.53-4.14-.06-8.81,1.4-14,1.46-5.19,3.99-10.41,7.61-15.66,7.11-10.26,13.91-17.59,20.39-21.96s11.93-6.56,16.36-6.56c3.73,0,6.5,1.26,8.31,3.76,1.81,2.51,2.6,5.46,2.36,8.84Zm-15.23,27.12c5.6-9.68,8.9-17.15,9.89-22.4.99-5.25.2-7.99-2.36-8.23-1.4-.11-3.21.47-5.42,1.75-2.22,1.29-4.58,3.09-7.09,5.42-2.51,2.34-5.1,5.16-7.79,8.49-2.69,3.32-5.25,6.91-7.7,10.76-2.33,3.74-4.2,7.44-5.6,11.11-1.4,3.67-2.33,6.94-2.8,9.8-.47,2.86-.41,5.19.17,7,.58,1.81,1.75,2.71,3.5,2.71s3.65-.64,5.69-1.92c2.04-1.28,4.14-3.09,6.3-5.42,2.16-2.33,4.34-5.13,6.56-8.4,2.21-3.26,4.43-6.82,6.65-10.67Z"/>
            <path className="cls-1"
                  d="m319.74,93c-3.38,5.48-7.99,10.01-13.82,13.56-5.84,3.56-12.43,6.85-19.77,9.89-2.45,5.83-5.08,11.84-7.88,18.03-2.8,6.18-5.72,11.96-8.75,17.33-3.04,5.36-6.24,10-9.62,13.91-3.39,3.91-6.89,6.56-10.5,7.96-1.63.58-3.29.73-4.99.44-1.69-.29-3.35-1.66-4.99-4.11-1.75-2.57-3.21-5.54-4.38-8.92-1.17-3.38-.88-7.64.88-12.77,2.69-7.94,7.41-14.59,14.17-19.95,6.77-5.37,14.52-9.74,23.27-13.12.93-1.99,1.84-4.06,2.71-6.21s1.78-4.29,2.71-6.39c-2.69,2.8-5.66,5.16-8.93,7.09-3.27,1.92-6.65,2.77-10.15,2.54-3.15-.23-5.57-1.17-7.26-2.8-1.69-1.63-2.83-3.61-3.41-5.95-.58-2.33-.7-4.96-.35-7.88.35-2.91,1.05-5.83,2.1-8.75.94-2.8,2.19-5.95,3.76-9.45,1.58-3.5,3.35-7.18,5.34-11.03,1.98-3.85,4.23-7.79,6.74-11.81,2.51-4.02,5.16-8.02,7.96-11.99.7-.93,1.46-1.4,2.27-1.4s1.52.47,2.1,1.4c2.1,2.8,2.89,6.07,2.36,9.8-.53,3.74-2.42,8.23-5.69,13.48-3.15,5.14-5.78,9.66-7.88,13.56-2.1,3.91-3.97,7.91-5.6,11.99-1.75,4.32-2.54,7.85-2.36,10.59.18,2.74,1.25,4.23,3.24,4.46,1.75.12,3.59-.44,5.51-1.66,1.93-1.22,3.91-3,5.95-5.34,2.04-2.33,4.17-5.1,6.39-8.31,2.21-3.21,4.43-6.74,6.65-10.59,1.86-3.27,3.73-6.65,5.6-10.15,1.86-3.5,3.7-6.91,5.51-10.24,1.81-3.32,3.56-6.48,5.25-9.45,1.69-2.98,3.29-5.57,4.81-7.79,1.51-2.1,2.97-2.51,4.38-1.23,1.17,1.64,1.89,4.2,2.19,7.7.29,3.5-.67,7.47-2.89,11.9-1.29,2.57-2.89,5.72-4.81,9.45-1.92,3.74-3.94,7.76-6.04,12.08-2.1,4.32-4.23,8.78-6.39,13.39-2.16,4.61-4.17,9.01-6.04,13.21,6.88-3.73,12.89-7.93,18.02-12.6,5.13-4.67,9.45-9.45,12.95-14.35.46-.58.99-.9,1.58-.96.58-.06.99.38,1.22,1.31.23.82.14,2.13-.26,3.94-.41,1.81-1.37,3.88-2.89,6.21Zm-49.35,29.57c-5.72,3.26-10.5,7.06-14.35,11.38-3.85,4.32-6.88,8.51-9.1,12.6-2.21,4.08-3.65,7.76-4.29,11.02-.64,3.26-.55,5.42.26,6.48.58.81,1.84.32,3.76-1.49,1.93-1.81,4.2-4.61,6.83-8.4,2.62-3.79,5.42-8.4,8.4-13.83s5.8-11.35,8.49-17.76Z"/>
            <path className="cls-1"
                  d="m352.11,95.8c-1.52,2.1-3.24,4.17-5.16,6.21-1.92,2.04-3.97,3.85-6.12,5.42-2.16,1.58-4.41,2.83-6.74,3.76-2.33.93-4.73,1.28-7.17,1.05-3.15-.23-5.54-1.14-7.18-2.71-1.63-1.58-2.74-3.56-3.32-5.95-.58-2.39-.7-5.04-.35-7.96.35-2.91.99-5.83,1.92-8.75,1.98-5.83,5.08-12.71,9.28-20.65,4.2-7.93,9.16-15.92,14.88-23.98.7-.93,1.46-1.4,2.28-1.4s1.57.41,2.27,1.23c3.96,5.95,2.86,13.82-3.33,23.62-3.27,5.14-5.89,9.65-7.88,13.56-1.98,3.91-3.91,7.96-5.77,12.16-1.87,4.32-2.69,7.88-2.45,10.67.23,2.8,1.34,4.32,3.33,4.55,1.75.12,3.61-.5,5.6-1.84,1.98-1.34,4.08-3.24,6.3-5.69,2.21-2.45,4.52-5.34,6.91-8.66,2.39-3.32,4.75-6.91,7.09-10.76,5.48-8.86,9.77-16.39,12.86-22.58,3.09-6.18,6.04-11.14,8.84-14.88,1.63-2.33,3.09-2.68,4.38-1.05,1.28,1.64,2.1,4.2,2.45,7.7s-.53,7.47-2.62,11.9c-.94,1.98-2.16,4.23-3.67,6.74-1.52,2.51-3.06,5.1-4.64,7.79-1.58,2.69-3.09,5.37-4.55,8.05-1.46,2.69-2.71,5.14-3.76,7.35-2.33,5.02-3.3,9.16-2.89,12.42.41,3.27,2.19,4.79,5.34,4.55,1.86-.11,3.79-.84,5.77-2.19,1.98-1.34,3.96-3.15,5.95-5.42,1.98-2.28,3.94-4.84,5.86-7.7,1.93-2.86,3.76-5.8,5.51-8.84.46-.81,1.02-1.25,1.66-1.31.64-.06,1.14.32,1.49,1.14.35.7.5,2.1.44,4.2-.06,2.1-.73,4.38-2.01,6.82-1.29,2.45-2.89,4.81-4.81,7.09-1.92,2.27-4.05,4.26-6.39,5.95-2.33,1.69-4.79,3.06-7.35,4.11-2.57,1.05-5.14,1.57-7.7,1.57-5.72,0-9.74-1.6-12.08-4.81-2.33-3.21-3.15-7.38-2.45-12.51Z"/>
            <path className="cls-1"
                  d="m416.51,58.7c1.98-2.1,4.14-4.23,6.47-6.39,2.33-2.16,4.7-4.05,7.09-5.69,2.39-1.63,4.64-2.94,6.74-3.94,2.1-.99,3.85-1.37,5.25-1.14,1.4.23,2.77.9,4.11,2.01,1.34,1.11,2.39,2.51,3.15,4.2.76,1.69,1.14,3.62,1.14,5.77s-.53,4.35-1.58,6.56c-.94,1.99-2.1,4.2-3.5,6.65-1.4,2.45-2.89,5.02-4.46,7.7-1.57,2.69-3.09,5.37-4.55,8.05-1.46,2.69-2.71,5.14-3.76,7.35-1.17,2.57-1.96,4.96-2.36,7.17-.41,2.22-.5,4.14-.26,5.78.23,1.63.79,2.92,1.66,3.85.88.93,2.13,1.34,3.76,1.23,1.75-.11,3.61-.84,5.6-2.19,1.98-1.34,3.94-3.15,5.86-5.42,1.92-2.27,3.82-4.84,5.69-7.7,1.87-2.86,3.62-5.8,5.25-8.84.93-1.75,1.92-1.81,2.98-.17.58.94.79,2.36.61,4.29-.17,1.93-.91,4.17-2.19,6.74-1.17,2.45-2.71,4.81-4.64,7.09-1.92,2.27-4.03,4.25-6.3,5.91-2.28,1.67-4.7,3-7.26,4.03-2.57,1.01-5.13,1.52-7.7,1.52-7.47,0-12.19-2.42-14.17-7.26-1.99-4.84-1.69-11.05.88-18.64,1.4-4.31,3.29-8.6,5.69-12.86,2.39-4.26,4.64-8.14,6.74-11.64,2.1-3.5,3.76-6.39,4.99-8.66,1.23-2.27,1.43-3.59.61-3.94-.47-.11-1.4.09-2.8.61-1.4.52-3.15,1.46-5.25,2.8-2.1,1.34-4.43,3.09-7,5.25-2.57,2.16-5.25,4.75-8.05,7.79-2.57,2.8-4.99,5.92-7.26,9.36-2.27,3.44-4.46,7.09-6.56,10.94-2.1,3.85-4.11,7.82-6.04,11.9-1.92,4.08-3.82,8.13-5.69,12.15-.82,1.82-1.92,2.04-3.33.68-1.75-1.69-2.83-3.99-3.24-6.9-.41-2.9.09-6.57,1.49-11.01.82-2.8,2.25-6.3,4.29-10.5,2.04-4.2,4.35-8.66,6.91-13.39,2.56-4.73,5.31-9.51,8.22-14.35,2.92-4.84,5.78-9.3,8.58-13.39,1.28-1.98,2.51-1.98,3.67,0,1.28,2.22,1.93,4.75,1.93,7.61s-.47,5.86-1.4,9.01Z"/>
            <path className="cls-1"
                  d="m515.56,72.35c-1.17,1.29-2.74,2.04-4.72,2.27-.94,3.74-2.28,7.56-4.03,11.46-1.75,3.91-3.85,7.56-6.3,10.94-2.45,3.38-5.13,6.39-8.05,9.01-2.92,2.62-6.01,4.46-9.28,5.51-3.15,1.05-6.74,1.16-10.76.35-4.03-.82-7.79-3.5-11.29-8.05-1.99-2.57-3.3-5.4-3.94-8.49-.64-3.09-.79-6.33-.44-9.71.35-3.38,1.14-6.88,2.36-10.5,1.23-3.61,2.83-7.17,4.81-10.67,3.38-5.95,7.55-11.11,12.51-15.49,4.96-4.38,10.06-6.79,15.31-7.26,2.68-.11,4.9.26,6.65,1.14s3.5,2.48,5.25,4.81c1.05,1.4,2.1,2.6,3.15,3.59,1.05.99,2.01,2.13,2.89,3.41.88,1.29,1.51,2.86,1.92,4.72.41,1.87.5,4.38.26,7.53-.12.7-.17,1.37-.17,2.01s-.06,1.31-.17,2.01c.58,0,1.14-.06,1.66-.18.53-.11,1.14-.17,1.84-.17.58,0,.9.17.96.52.06.35-.09.76-.44,1.23Zm-16.27,0c-1.05-.46-2.16-1.17-3.33-2.1-1.87-1.4-3.65-3.5-5.34-6.3-1.69-2.8-2.6-5.83-2.71-9.1-2.33,1.99-4.7,4.38-7.09,7.17-2.39,2.8-4.52,5.89-6.39,9.28-1.87,3.38-3.41,6.82-4.64,10.32-1.23,3.5-2.07,6.8-2.54,9.89-.47,3.09-.58,5.81-.35,8.14.23,2.33.93,3.97,2.1,4.9,1.17,1.05,2.68,1.43,4.55,1.14,1.87-.29,3.91-1.19,6.12-2.71,2.21-1.51,4.49-3.65,6.83-6.39,2.33-2.74,4.55-6.15,6.65-10.24,1.28-2.45,2.45-4.87,3.5-7.26,1.05-2.39,1.92-4.64,2.62-6.74Zm1.22-4.73c1.4-5.6,1.87-9.91,1.4-12.95-.47-2.8-1.34-4.05-2.62-3.76-1.29.29-2.16,1.72-2.62,4.29-.47,2.33-.29,4.67.52,7,.82,2.33,1.93,4.14,3.33,5.42Z"/>
            <path className="cls-1"
                  d="m520.63,81.27c3.61-4.9,7.23-10.03,10.85-15.4,3.62-5.36,6.71-10.26,9.28-14.7.46-3.38,1.17-6.06,2.1-8.05.93-1.98,2.33-3.79,4.2-5.42,1.98-1.75,3.85-2.83,5.6-3.24,1.75-.41,3.03-.2,3.85.61.93.94,1.22,1.96.88,3.06-.35,1.11-1.11,2.65-2.28,4.64-.35.59-.67,1.14-.96,1.66-.29.52-.61,1.08-.96,1.66-.35,4.08-.44,7.96-.26,11.64.17,3.67.44,7.26.79,10.76.35,3.5.64,6.85.88,10.06.23,3.21.29,6.33.17,9.36-.24,3.38-.82,6.77-1.75,10.15-.94,3.39-2.98,6.12-6.12,8.23,5.83-2.21,10.64-5.63,14.44-10.24,3.79-4.61,6.79-9.3,9.01-14.09.46-.93,1.05-1.34,1.75-1.23.7.12,1.22.52,1.57,1.23.35.82.41,2.27.18,4.38-.24,2.1-1.11,4.49-2.62,7.17-3.39,6.07-7.82,10.74-13.3,14-5.48,3.26-11.38,5.01-17.67,5.25-2.57.12-5.08,0-7.52-.35-2.45-.35-4.79-1.02-7-2.01-2.22-.99-4.29-2.36-6.21-4.11s-3.65-3.96-5.16-6.65c-1.05-1.98-1.81-4.14-2.28-6.47-.46-2.33-.61-4.61-.44-6.83.17-2.21.67-4.29,1.49-6.21.82-1.93,1.98-3.53,3.5-4.81,2.21-1.86,3.44-1.28,3.67,1.75.12.7.18,1.4.18,2.1s.06,1.4.17,2.1Zm19.77-18.9c-2.57,4.67-5.4,9.36-8.49,14.09-3.09,4.73-6.33,9.48-9.71,14.26.7,2.57,1.51,4.9,2.45,7,.93,2.1,1.98,3.85,3.15,5.25,1.17,1.4,2.42,2.42,3.76,3.06,1.34.64,2.71.73,4.11.26,1.98-.58,3.38-2.54,4.2-5.86.81-3.32,1.28-7.23,1.4-11.72.12-4.49.03-9.13-.26-13.91-.29-4.78-.5-8.93-.61-12.43Z"/>
        </svg>
    )
}

const SnacksSvg = ({isActive}: { active: boolean }) => {

    return (
        <svg className={`${isActive ? "aguajeSvg" : ""} slideElement snacks w-full h-[500px]`} id="Capa_1" data-name="Capa 1"
             viewBox="0 0 348.87 112.06">
            <path className="cls-1"
                  d="m9.33,79.94c3.61-4.9,7.23-10.03,10.85-15.4,3.62-5.36,6.71-10.26,9.28-14.7.46-3.38,1.16-6.06,2.1-8.05.93-1.98,2.33-3.79,4.2-5.42,1.98-1.75,3.85-2.83,5.6-3.24,1.75-.41,3.03-.2,3.85.61.93.94,1.22,1.96.88,3.06-.35,1.11-1.11,2.65-2.28,4.64-.35.59-.67,1.14-.96,1.66-.29.52-.61,1.08-.96,1.66-.35,4.08-.44,7.96-.26,11.64.18,3.67.44,7.26.79,10.76s.64,6.85.88,10.06c.23,3.21.29,6.33.18,9.36-.24,3.38-.82,6.77-1.75,10.15-.94,3.38-2.98,6.12-6.12,8.22,5.83-2.21,10.64-5.63,14.44-10.24,3.79-4.61,6.79-9.3,9.01-14.09.46-.93,1.05-1.34,1.75-1.23.7.12,1.23.52,1.58,1.23.35.82.41,2.27.17,4.38-.23,2.1-1.11,4.49-2.62,7.17-3.39,6.07-7.82,10.74-13.3,14-5.49,3.27-11.38,5.02-17.68,5.25-2.57.12-5.07,0-7.52-.35-2.45-.35-4.79-1.02-7-2.01-2.22-.99-4.29-2.36-6.21-4.11s-3.65-3.96-5.16-6.65c-1.05-1.98-1.81-4.14-2.27-6.47-.46-2.33-.61-4.61-.44-6.83.17-2.21.67-4.29,1.49-6.21.81-1.93,1.98-3.53,3.5-4.81,2.21-1.86,3.44-1.28,3.68,1.75.11.7.17,1.4.17,2.1s.06,1.4.18,2.1Zm19.77-18.9c-2.57,4.67-5.4,9.36-8.49,14.09-3.09,4.73-6.33,9.48-9.71,14.26.7,2.57,1.52,4.9,2.45,7,.93,2.1,1.98,3.85,3.15,5.25,1.17,1.4,2.42,2.42,3.76,3.06,1.34.64,2.71.73,4.11.26,1.98-.58,3.38-2.54,4.2-5.86.81-3.32,1.28-7.23,1.4-11.72.11-4.49.03-9.13-.26-13.91-.29-4.78-.5-8.93-.61-12.43Z"/>
            <path className="cls-1"
                  d="m83.36,57.37c1.98-2.1,4.14-4.23,6.48-6.39,2.33-2.16,4.69-4.05,7.09-5.69,2.39-1.63,4.64-2.94,6.74-3.94,2.1-.99,3.85-1.37,5.25-1.14,1.4.23,2.77.9,4.11,2.01,1.34,1.11,2.39,2.51,3.15,4.2.76,1.69,1.14,3.62,1.14,5.77s-.53,4.35-1.58,6.56c-.94,1.99-2.1,4.2-3.5,6.65-1.4,2.45-2.89,5.02-4.46,7.7-1.58,2.69-3.09,5.37-4.55,8.05-1.46,2.69-2.71,5.14-3.76,7.35-1.17,2.57-1.96,4.96-2.36,7.17-.41,2.22-.5,4.14-.26,5.78.23,1.63.79,2.92,1.66,3.85.88.93,2.13,1.34,3.76,1.23,1.75-.11,3.61-.84,5.6-2.19,1.98-1.34,3.94-3.15,5.86-5.42,1.93-2.28,3.82-4.84,5.69-7.7,1.87-2.86,3.62-5.8,5.25-8.84.93-1.75,1.93-1.81,2.98-.17.58.94.79,2.36.61,4.29-.18,1.93-.91,4.17-2.19,6.74-1.17,2.45-2.71,4.81-4.64,7.09s-4.02,4.25-6.3,5.92c-2.28,1.67-4.7,3-7.26,4.02-2.57,1.01-5.14,1.52-7.7,1.52-7.47,0-12.19-2.42-14.17-7.26-1.99-4.84-1.69-11.05.88-18.64,1.4-4.31,3.29-8.6,5.69-12.86,2.39-4.26,4.64-8.14,6.74-11.64,2.1-3.5,3.76-6.39,4.99-8.66s1.43-3.59.61-3.94c-.47-.11-1.4.09-2.8.61-1.4.52-3.15,1.46-5.25,2.8-2.1,1.34-4.44,3.09-7,5.25-2.57,2.16-5.25,4.75-8.05,7.79-2.57,2.8-4.99,5.92-7.26,9.36-2.27,3.44-4.46,7.09-6.56,10.94-2.1,3.85-4.11,7.82-6.04,11.9-1.92,4.09-3.82,8.13-5.69,12.15-.82,1.82-1.92,2.04-3.33.68-1.75-1.69-2.83-3.99-3.24-6.9-.41-2.9.09-6.57,1.49-11.01.82-2.8,2.25-6.3,4.29-10.5,2.04-4.2,4.35-8.66,6.91-13.39,2.56-4.73,5.31-9.51,8.23-14.35,2.91-4.84,5.77-9.3,8.57-13.39,1.28-1.98,2.51-1.98,3.68,0,1.28,2.22,1.92,4.75,1.92,7.61s-.47,5.86-1.4,9.01Z"/>
            <path className="cls-1"
                  d="m179.25,51.77c1.17-2.1,2.28-4.05,3.33-5.86,1.05-1.81,2.04-3.41,2.97-4.81,1.51-2.21,2.92-2.56,4.2-1.05,1.28,1.63,2.1,4.16,2.45,7.59.35,3.43-.53,7.36-2.62,11.78-.94,1.98-2.16,4.22-3.67,6.72-1.52,2.5-3.06,5.12-4.64,7.85s-3.12,5.44-4.64,8.12c-1.52,2.68-2.8,5.18-3.85,7.5-1.05,2.44-1.87,4.71-2.45,6.81-.58,2.09-.82,3.9-.7,5.41.11,1.51.52,2.71,1.22,3.58.7.88,1.81,1.25,3.33,1.13,1.75-.11,3.65-.88,5.69-2.27,2.04-1.4,4.08-3.24,6.12-5.51,2.04-2.28,4.03-4.84,5.95-7.7,1.92-2.86,3.64-5.8,5.16-8.84.46-.81.96-1.25,1.49-1.31.52-.06.96.32,1.31,1.14.35.82.46,2.22.35,4.2-.12,1.98-.76,4.2-1.92,6.65-1.17,2.45-2.69,4.81-4.55,7.09-1.87,2.28-3.94,4.3-6.21,6.07-2.28,1.77-4.64,3.2-7.09,4.29-2.45,1.08-4.9,1.57-7.35,1.45-4.79-.23-8.37-1.66-10.76-4.29-2.39-2.62-3.59-5.98-3.59-10.06-2.8,3.62-6.1,6.8-9.89,9.54-3.79,2.74-7.79,4.11-11.99,4.11s-7.32-1.26-9.71-3.76c-2.39-2.51-3.85-5.83-4.38-9.98-.53-4.14-.06-8.81,1.4-14,1.46-5.19,3.99-10.41,7.61-15.66,7.11-10.26,13.91-17.59,20.39-21.96s11.93-6.56,16.36-6.56c3.73,0,6.5,1.26,8.31,3.76,1.81,2.51,2.59,5.46,2.36,8.84Zm-15.22,27.12c5.6-9.68,8.9-17.15,9.89-22.4.99-5.25.2-7.99-2.36-8.23-1.4-.11-3.21.47-5.42,1.75-2.22,1.29-4.58,3.09-7.09,5.42-2.51,2.34-5.1,5.16-7.79,8.49-2.69,3.32-5.25,6.91-7.7,10.76-2.33,3.74-4.2,7.44-5.6,11.11-1.4,3.67-2.33,6.94-2.8,9.8-.47,2.86-.41,5.19.17,7,.58,1.81,1.75,2.71,3.5,2.71s3.65-.64,5.69-1.92c2.04-1.28,4.14-3.09,6.3-5.42,2.16-2.33,4.34-5.13,6.56-8.4,2.21-3.26,4.43-6.82,6.65-10.67Z"/>
            <path className="cls-1"
                  d="m237,41.09c4.43,2.69,7.64,5.89,9.62,9.62.93,1.87,1.25,3.82.96,5.86-.29,2.04-.88,4.17-1.75,6.39-.88,2.22-1.9,4.49-3.06,6.82-1.17,2.34-2.16,4.67-2.97,7-.35,1.05-.76,1.69-1.23,1.93-.47.23-1.29.06-2.45-.53-2.1-1.05-3.65-2.86-4.64-5.42-.99-2.56-.85-5.83.44-9.8.46-1.52,1.11-3.12,1.92-4.81.81-1.69,1.51-3.27,2.1-4.73.58-1.46.99-2.74,1.23-3.85.23-1.11.06-1.9-.53-2.36-.7-.58-1.99-.38-3.85.61-1.87.99-3.97,2.6-6.3,4.81-2.34,2.22-4.73,4.99-7.18,8.31-2.45,3.33-4.67,6.97-6.65,10.94-2.45,4.9-4.08,9.45-4.9,13.65-.82,4.2-.96,7.85-.44,10.94.53,3.09,1.63,5.51,3.33,7.26,1.69,1.75,3.82,2.62,6.39,2.62,3.61,0,7.11-.76,10.5-2.28,3.38-1.52,6.56-3.5,9.54-5.95,2.98-2.45,5.69-5.13,8.14-8.05,2.45-2.92,4.55-5.78,6.3-8.58.46-.7,1.02-1.08,1.66-1.14.64-.06,1.14.38,1.49,1.31.23.7.14,2.04-.26,4.03-.41,1.98-1.37,4.14-2.89,6.47-1.63,2.57-3.71,4.99-6.21,7.26-2.51,2.27-5.25,4.29-8.23,6.04-2.97,1.75-6.12,3.15-9.45,4.2-3.32,1.05-6.62,1.58-9.89,1.58-5.6.11-10.24-1.05-13.91-3.5s-6.3-5.75-7.88-9.89c-1.58-4.14-2.1-8.87-1.58-14.17.53-5.31,2.19-10.76,4.99-16.36,2.8-5.48,5.92-10.18,9.36-14.09,3.44-3.91,6.88-7,10.33-9.27,3.44-2.27,6.74-3.65,9.89-4.11,3.15-.46,5.83-.06,8.05,1.23Z"/>
            <path className="cls-1"
                  d="m265.35,73.64c-1.75,4.32-3.15,8.4-4.2,12.25-1.05,3.85-1.66,7.24-1.84,10.15-.17,2.92.12,5.28.88,7.09.76,1.81,2.13,2.77,4.11,2.89,2.1.24,4.4-.35,6.91-1.75,2.51-1.4,4.99-3.26,7.44-5.6,2.45-2.33,4.81-5.07,7.09-8.22,2.28-3.15,4.29-6.41,6.04-9.8.58-1.17,1.28-1.78,2.1-1.84.81-.06,1.4.56,1.75,1.84.81,2.8.23,6.42-1.75,10.85-.58,1.29-1.78,3.04-3.59,5.25-1.81,2.22-4.02,4.4-6.65,6.56-2.62,2.16-5.57,4-8.84,5.51-3.27,1.52-6.65,2.21-10.15,2.1-6.07-.23-10.5-2.54-13.3-6.91-2.8-4.38-3.21-11.29-1.22-20.74,1.63-7.58,4.03-15.19,7.17-22.84,3.15-7.64,6.74-14.96,10.76-21.96s8.31-13.56,12.86-19.69,9.04-11.52,13.48-16.19c2.68-2.8,5.19-3.09,7.52-.88,4.9,4.32,6.24,10.73,4.03,19.25-1.4,5.37-3.56,10.65-6.48,15.84-2.92,5.19-6.27,10.09-10.06,14.7-3.79,4.61-7.79,8.81-11.99,12.6-4.2,3.79-8.22,6.97-12.08,9.54Zm3.15-7.52c5.95-4.9,11.05-10.12,15.31-15.66,4.26-5.54,7.67-10.7,10.24-15.49,2.57-4.78,4.34-8.84,5.34-12.16.99-3.33,1.19-5.16.61-5.51-.58-.35-1.75.5-3.5,2.54-1.75,2.04-3.91,4.96-6.47,8.75-2.57,3.79-5.34,8.2-8.31,13.21-2.98,5.02-5.98,10.33-9.01,15.93-1.64,2.8-3.04,5.6-4.2,8.4Z"/>
            <path className="cls-1"
                  d="m295.28,79.94c3.61-4.9,7.23-10.03,10.85-15.4,3.62-5.36,6.71-10.26,9.28-14.7.46-3.38,1.16-6.06,2.1-8.05.93-1.98,2.33-3.79,4.2-5.42,1.98-1.75,3.85-2.83,5.6-3.24,1.75-.41,3.03-.2,3.85.61.93.94,1.22,1.96.88,3.06-.35,1.11-1.11,2.65-2.28,4.64-.35.59-.67,1.14-.96,1.66-.29.52-.61,1.08-.96,1.66-.35,4.08-.44,7.96-.26,11.64.17,3.67.44,7.26.79,10.76.35,3.5.64,6.85.88,10.06.23,3.21.29,6.33.18,9.36-.24,3.38-.82,6.77-1.75,10.15-.94,3.38-2.98,6.12-6.12,8.22,5.83-2.21,10.64-5.63,14.44-10.24,3.79-4.61,6.79-9.3,9.01-14.09.46-.93,1.05-1.34,1.75-1.23.7.12,1.23.52,1.58,1.23.35.82.41,2.27.17,4.38-.23,2.1-1.11,4.49-2.62,7.17-3.38,6.07-7.82,10.74-13.3,14-5.49,3.27-11.38,5.02-17.67,5.25-2.57.12-5.08,0-7.53-.35-2.45-.35-4.79-1.02-7-2.01-2.22-.99-4.29-2.36-6.21-4.11s-3.65-3.96-5.16-6.65c-1.05-1.98-1.81-4.14-2.27-6.47-.46-2.33-.61-4.61-.44-6.83.17-2.21.67-4.29,1.49-6.21.81-1.93,1.98-3.53,3.5-4.81,2.21-1.86,3.44-1.28,3.67,1.75.12.7.17,1.4.17,2.1s.06,1.4.18,2.1Zm19.77-18.9c-2.57,4.67-5.4,9.36-8.49,14.09-3.09,4.73-6.33,9.48-9.71,14.26.7,2.57,1.52,4.9,2.45,7,.93,2.1,1.98,3.85,3.15,5.25,1.17,1.4,2.42,2.42,3.76,3.06,1.34.64,2.71.73,4.11.26,1.98-.58,3.38-2.54,4.2-5.86.81-3.32,1.28-7.23,1.4-11.72.12-4.49.03-9.13-.26-13.91-.29-4.78-.5-8.93-.61-12.43Z"/>
        </svg>
    )
}