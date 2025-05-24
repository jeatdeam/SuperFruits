import {useState, useEffect, useRef} from 'react';



export function Footer() {



    return (
        <footer className={"w-full flex flex-col gap-[30px] bg-gradient-to-br from-purple-700 via-black to-gray-900 pb-[20px] px-[20px]"}>
            <div className={"w-[90%] mx-auto flex flex-col gap-[50px]"}>

                <div className={"lg:w-[80%] xl:w-[70%] w-[90%] flex flex-col gap-[50px] justify-evenly bg-white/20 mx-auto rounded-b-[35px] p-[25px] backdrop-blur-[20px] border border-white/30 shadow-md"}>
                    <div>
                        <h1 className={"w-1/2 text-[75px] leading-[1]"}>Lo mejor de la amazonia peruana con</h1>
                        <h1 className={"text-[75px] leading-[1] bg-blue-300 w-fit"}>Super Fruits</h1>
                    </div>
                    <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum delectus ex expedita ipsa
                        praesentium
                        quam qui sequi. Aspernatur dolore ea enim eveniet</h1>

                    <div className={"w-full flex gap-[25px] mx-auto flex-wrap  bg-amber-500"}>

                        <div className={"flex w-[200px]  flex-col gap-[7.5px] border-4 border-violet-600"}>
                            <h1 className={"text-[20px] bg-blue-300 flex items-center leading-[1.1] text-gray-200 text-center flex-1"}>quienes
                                somos</h1>
                            <ul className={"flex flex-col gap-[7.5px] pl-[7.5px]"}>
                                <li>quienes somos</li>
                                <li>quienes somos</li>
                                <li>quienes somos</li>
                                <li>quienes somos</li>
                                <li>quienes somos</li>
                            </ul>
                        </div>

                        <div className={"flex w-[200px] flex-col gap-[7.5px] border-4 border-violet-600"}>
                            <h1 className={"text-[20px] flex items-center leading-[1.1] text-gray-200 text-center flex-1"}>certificados</h1>
                            <ul className={"flex flex-col gap-[7.5px] pl-[7.5px]"}>
                                <li>certificados</li>
                                <li>certificados</li>
                                <li>certificados</li>
                                <li>certificados</li>
                                <li>certificados</li>
                            </ul>
                        </div>

                        <div className={"flex w-[200px] flex-col gap-[7.5px] border-4 border-violet-600"}>
                            <h1 className={"text-[20px] flex items-center leading-[1.1] text-gray-200 text-center flex-1"}>registro
                                sanitario</h1>
                            <ul className={"flex flex-col gap-[7.5px] pl-[7.5px]"}>
                                <li>sanitario</li>
                                <li>sanitario</li>
                                <li>sanitario</li>
                                <li>sanitario</li>
                                <li>sanitario</li>
                            </ul>
                        </div>

                        <div className={"flex w-[200px] flex-col gap-[7.5px]  border-4 border-violet-600"}>
                            <h1 className={"text-[20px] flex items-center leading-[1.1] text-gray-200 text-center flex-1"}>insumos de
                                preparacion</h1>
                            <ul className={"flex flex-col gap-[7.5px] pl-[7.5px]"}>
                                <li>preparacion</li>
                                <li>preparacion</li>
                                <li>preparacion</li>
                                <li>preparacion</li>
                                <li>preparacion</li>
                            </ul>
                        </div>

                        <div className={"flex w-[200px] flex-col gap-[7.5px] border-4 border-violet-600"}>
                            <h1 className={"text-[20px] flex items-center leading-[1.1] text-gray-200 text-center flex-1"}>preparacion</h1>
                            <ul className={"flex flex-col gap-[7.5px] pl-[7.5px]"}>
                                <li>recomendacion</li>
                                <li>recomendacion</li>
                                <li>recomendacion</li>
                                <li>recomendacion</li>
                                <li>recomendacion</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className={"md:flex-row md:w-[60%]  w-[95%] flex mx-auto flex-col items-center justify-between gap-[10px]"}>
                    <div className={"md:w-1/2 w-4/5 flex flex-col gap-[5px]"}>
                        <h1 className={"w-[50%] rounded-[5px] text-white text-[50px]"}>Contactanos</h1>
                        <input className={"h-[30px] px-[5px] rounded-[5px]"} type="email" placeholder="Contactanos"/>
                        <textarea className={"p-[5px] rounded-[5px] border border-violet-600 h-[150px]"}
                                  placeholder={"compras mayoristas - informacion de productos"}/>
                        <button className={"bg-white rounded-[5px] h-[30px] w-[75px] self-end"}>Enviar</button>
                    </div>

                    <div className={"md:w-1/2 w-4/5 flex items-center gap-[10px]"}>
                        <div className={"bg-white h-[150px]  p-[10px] size-[150px] ml-auto"}>
                            Designed for Jeatdeam / Realizado
                        </div>
                        <img className={"aspect-[16/9] w-[160px] h-[90px] ml-auto"}
                             src="https://res.cloudinary.com/dfwtyxxba/image/upload/v1747957241/icons8-open-book-64_vexqn0.png"
                             alt=""/>
                    </div>

                </div>
                <div className={"flex h-[50px] mx-auto justify-evenly items-center border-2 border-violet-600 w-1/2 bg-white/20 rounded-full backdrop-blur-[20px] "}>
                    <Facebook/>
                    <Instagram/>
                    <Twitter/>
                    <Tiktok/>
                </div>

            </div>
        </footer>
    )

}

const Instagram = () => {

    return (
        <svg className={"size-[30px] transition-bg duration-500 ease-in-out rounded-[8px] hover:bg-white"}
             xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
             viewBox="0 0 50 50">
            <path
                d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
        </svg>
    )
}
const Facebook = () => {

    return (
        <svg className={"size-[30px] transition-bg duration-500 ease-in-out hover:bg-white rounded-[8px]"}
             xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
            <path
                d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
        </svg>
    )
}
const Twitter = () => {

    return (
        <svg className={"size-[30px] transition-bg duration-500 ease-in-out hover:bg-white rounded-[8px]"}
             xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
             viewBox="0 0 50 50">
            <path
                d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
        </svg>
    )
}
const Tiktok = () => {

    return (
        <svg className={"size-[30px] transition-bg duration-500 ease-in-out hover:bg-white rounded-[8px]"}
             xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
            <path
                d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
        </svg>
    )
}
