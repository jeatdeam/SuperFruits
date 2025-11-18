import {useState, useEffect} from 'react'


export const ErrorPage = () => {





    return(
        <main className={"flex justify-center items-center flex-col"}>
            {/*<h1 className={"text-[45px] w-full text-center"}>*/}
            {/*    Ups...*/}
            {/*</h1>*/}
            <h1 className={"text-[75px]"}>No se encontro la pagina que buscas - estamos en error</h1>
            <img src="https://seocom.agency/wp-content/uploads/2024/05/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1.jpg.webp" alt=""/>
        </main>
    )
}