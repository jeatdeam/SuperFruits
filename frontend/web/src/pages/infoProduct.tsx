import {Header} from './header';
import {Footer} from "./footer";

import { useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom"



export const InfoProduct = () => {
    const {product, name} = useParams();


    useEffect(()=>{



    },[])

    return (
        <>
            <Header/>
            <section className={"bg-[green] size-[800px]"}>
                <h1>{name.replace(/-/g,' ')}</h1>
            </section>
            <Footer/>
        </>
    )
}