import {useState, useEffect, forwardRef, useRef, useImperativeHandle} from "react";
import {Link} from "react-router-dom";
import {FormCompras} from "../bodyComponents/formularioPago.tsx";
import {useGetCarrito} from "../../hooks/getCarritoMap.tsx"
import {useCarrito} from "../../contexts/carritoContext.tsx";
import {Products} from './searchIcon.tsx'
import {ButtonAdd} from '../buttonsComponent/buttonAdd.tsx'
import {DeleteGroup} from "../buttonsComponent/deleteGroupProducts.tsx";
import {LessProducts} from "../buttonsComponent/lessElementProductGroup.tsx";

type CarritoProps = {
    validate : boolean | null;
    closeWindow : () => void;
}
export type CarritoRefs = {
    carrito : HTMLDivElement | null;
    // access : () => void;
}


export const Carrito = forwardRef<CarritoRefs,CarritoProps>( ({validate, closeWindow}, ref)=> {
    const {count,carritoCompras, incrementCount,refetchCarrito} = useCarrito()
    const containerCarrito = useRef<HTMLDivElement|null>(null);
    const [total, setTotal] = useState<number|null>(null)
    const [mapProducts, setMapProducts] = useState<[string,Products[]][] | null>(null);



    useEffect(()=>{
        setTotal(carritoCompras?.length)

        const map = new Map<string, Products[]>();

        carritoCompras?.forEach((el, _) => {
                if(map.has(el.name_product)) {
                    map.get(el.name_product)?.push(el);
                } else {
                    map.set(el.name_product, [el])
                }
        })
        setMapProducts([...map])
    },[carritoCompras])

    useImperativeHandle(ref,()=>({
        carrito : containerCarrito.current,
    }))

    useEffect(()=>{
        refetchCarrito()
    },[ count])


    return(
        <>
        {total ? (
        <div ref={containerCarrito} className={`${ validate ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} rounded-[8px] p-[10px] gap-[10px] w-[300px] translate-x-[-50%] bg-red-400/50 backdrop-blur-[15px] absolute top-[200%] left-0 transition-all duration-500 ease-in-out flex flex-col justify-between shadow-[0px_0px_2.5px_1.5px_rgba(0,0,0,.6)]`}>
                <div className={"overflow-auto h-[400px] rounded-[8px] flex flex-col gap-[10px] p-[2.5px] "}>
                    {
                        mapProducts?.length && mapProducts?.map(( [_, value],indice)=>(
                            <div className={"min-h-[80px]  relative flex shadow-[0px_0px_2.5px_1.5px_rgba(0,0,0,.5)] rounded-[8px] gap-[7.5px] px-[7.5px] hover:bg-white items-center  transition-half"} key={indice}>

                                <div className={"min-h-[65px] flex flex-col w-[72.5%] gap-[10px] justify-between"}>
                                    <h1 className={"text-[14px] leading-[1.1]"}>{value?.[0]?.name_product}</h1>
                                    <div className={"flex w-full justify-between items-center pr-[7.5px]"}>
                                        <div className={"w-[100px] h-[25px] flex relative justify-between items-center"}>
                                            <LessProducts id={value?.[value.length-1].id_product} refetch={refetchCarrito}/>
                                            <ButtonAdd id={value?.[0].id_product} activeIcon={true} refetch={refetchCarrito}/>
                                            <DeleteGroup id={value?.[0].id_product} refetch={refetchCarrito} activePosition={false}/>
                                        </div>
                                        <b className={"text-[12.5px] font-semibold"}>S/. {value?.[0]?.price_product}</b>
                                    </div>

                                </div>

                                <div className={"relative"}>
                                    <img className={"size-[65px] shadow-[0px_0px_2.5px_1.25px_rgba(0,0,0,.5)] object-cover rounded-[8px]"} src={value?.[0]?.img_product[0]} alt=""/>
                                    <small className={"absolute right-[3.5px] top-[3.5px] rounded-full bg-white size-[17.5px] shadow-[0px_0px_2px_.5px_rgba(0,0,0,.9)] flex justify-center items-center text-[10px]"}>{value?.length}</small>
                                </div>


                            </div>

                        ))
                    }
                </div>

                <div className={"flex justify-between pr-[10px] items-center"}>
                    <b className={"text-[14px]"}>Total: S/. {carritoCompras?.reduce((total, product) => total + parseInt(String(product.price_product)) ,0)}</b>
                    <Link onClick={closeWindow} className={"flex gap-[5px]"} to={"/seccion-de-pagos"}>
                        <MasterCard/>
                        <DinersClub/>
                        <VisaPay/>
                        <ApplePay/>
                        <GooglePay/>
                    </Link>
                </div>

                </div>
                )
                :
                (
                <div ref={containerCarrito} className={`absolute ${ validate ? "opacity-100" : "opacity-0"} right-1/2 translate-x-1/2 top-[135%]  transition-half size-[25px] rounded-full`}>
                   <h1 className={"text-[12.5px] size-full flex items-center justify-center text-center bg-blue-300 rounded-full"}>{carritoCompras?.length ?? 0}</h1>
                </div>
                )

        }
        </>
    )
})

const ApplePay = () => {

    return (
        <svg className="size-[25px]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
            <path
                d="M 5.9902344 9.2011719 C 5.4892344 9.2251719 4.8715781 9.5441875 4.5175781 9.9921875 C 4.1935781 10.379187 3.9163281 11.006703 3.9863281 11.595703 C 4.5523281 11.644703 5.1196563 11.301234 5.4726562 10.865234 C 5.8206562 10.416234 6.0492344 9.8151719 5.9902344 9.2011719 z M 10.800781 10.400391 L 10.800781 19.400391 L 12.224609 19.400391 L 12.224609 16.400391 L 14.175781 16.400391 C 15.965781 16.400391 17.25 15.155391 17.25 13.400391 C 17.25 11.645391 15.988656 10.400391 14.222656 10.400391 L 10.800781 10.400391 z M 12.224609 11.599609 L 13.875 11.599609 C 15.103 11.599609 15.824219 12.263391 15.824219 13.400391 C 15.824219 14.537391 15.109 15.199219 13.875 15.199219 L 12.224609 15.199219 L 12.224609 11.599609 z M 5.9257812 11.900391 C 5.1007812 11.900391 4.51 12.349609 4.125 12.349609 C 3.734 12.349609 3.1496094 11.904297 2.4746094 11.904297 C 1.6496094 11.904297 0.84201563 12.422734 0.41601562 13.177734 C -0.45898438 14.686734 0.18915625 16.921391 1.0351562 18.150391 C 1.4501563 18.758391 1.95 19.400391 2.625 19.400391 C 3.244 19.377391 3.4522187 19.025391 4.1992188 19.025391 C 4.9512187 19.025391 5.1746094 19.400391 5.8496094 19.400391 C 6.5246094 19.400391 6.9336562 18.781828 7.3476562 18.173828 C 7.8206562 17.483828 8.0133906 16.810391 8.0253906 16.775391 C 8.0143906 16.764391 6.7170781 16.266531 6.7050781 14.769531 C 6.6940781 13.517531 7.7264375 12.920719 7.7734375 12.886719 C 7.1904375 12.020719 6.225 11.900391 6 11.900391 L 5.9257812 11.900391 z M 20.519531 12.800781 C 19.026531 12.800781 17.923813 13.638063 17.882812 14.789062 L 19.148438 14.789062 C 19.252437 14.242062 19.771469 13.882813 20.480469 13.882812 C 21.340469 13.882812 21.826172 14.276 21.826172 15 L 21.826172 15.5 L 20.068359 15.59375 C 18.435359 15.69075 17.552734 16.344375 17.552734 17.484375 C 17.552734 18.635375 18.464484 19.400391 19.771484 19.400391 C 20.654484 19.400391 21.474703 18.960625 21.845703 18.265625 L 21.875 18.265625 L 21.875 19.332031 L 23.175781 19.332031 L 23.175781 14.910156 C 23.174781 13.626156 22.128531 12.800781 20.519531 12.800781 z M 23.699219 12.800781 L 26.105469 19.369141 L 25.976562 19.769531 C 25.759563 20.446531 25.406297 20.707031 24.779297 20.707031 C 24.672297 20.707031 24.469953 20.696547 24.376953 20.685547 L 24.376953 21.767578 C 24.470953 21.788578 24.800344 21.800781 24.902344 21.800781 C 26.286344 21.800781 26.937812 21.279219 27.507812 19.699219 L 30 12.800781 L 28.556641 12.800781 L 26.884766 18.130859 L 26.855469 18.130859 L 25.183594 12.800781 L 23.699219 12.800781 z M 21.826172 16.400391 L 21.820312 16.921875 C 21.820312 17.753875 21.100438 18.345703 20.148438 18.345703 C 19.399438 18.345703 18.921875 17.993172 18.921875 17.451172 C 18.921875 16.892172 19.381766 16.567625 20.259766 16.515625 L 21.826172 16.400391 z"></path>
        </svg>
    )

}

const GooglePay = () => {

    return (
        <svg className={"size-[25px]"} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
            <path
                d="M8.994 12.242H4.863v1.502h2.002c-.165.345-.402.646-.691.89l.001.001-.002 0c-.457.382-1.044.611-1.686.611-1.114 0-2.065-.692-2.448-1.67-.117-.298-.181-.621-.181-.959 0-.545.166-1.05.449-1.47l.049-.065c.476-.664 1.251-1.094 2.13-1.094.702 0 1.341.274 1.81.725l1.254-1.401C6.748 8.569 5.67 8.111 4.487 8.111c-1.555 0-2.926.789-3.737 1.987-.486.72-.77 1.587-.77 2.52 0 .74.178 1.438.494 2.054.747 1.456 2.263 2.453 4.012 2.453 1.201 0 2.292-.469 3.1-1.235l-.001-.001c.867-.818 1.408-1.983 1.408-3.27V12.242zM21.045 15.353l-1.773-4.658h1.077l1.211 3.545 1.485-3.545h.935c0 0-2.9 6.842-2.924 6.899l-.935.024C20.138 17.579 21.045 15.353 21.045 15.353zM18.012 13.552c0 .577-.508.988-1.18.988-.528 0-.865-.245-.865-.62 0-.387.324-.612.943-.648l1.105-.081L18.012 13.552zM17.095 10.695c-1.053 0-1.832.581-1.861 1.379h.894c.074-.38.438-.628.938-.628.606 0 .949.272.949.775l0 .347-1.24.064c-1.151.067-1.775.522-1.775 1.312 0 .798.643 1.328 1.565 1.328.623 0 1.201-.304 1.463-.786h.02l.003.786h.915v-3.114C18.967 11.268 18.229 10.695 17.095 10.695zM12.56 12.22h-1.221V9.78h1.221c.871 0 1.43.411 1.43 1.221S13.435 12.22 12.56 12.22zM12.852 8.865h-2.428v6.407h.915v-2.136h1.479C14.088 13.136 15 12.25 15 11S14.105 8.865 12.852 8.865z"></path>
        </svg>
    )
}

const VisaPay = () => {

    return (
        <svg className={"size-[25px]"} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
            <path
                d="M 5 7 C 2.25 7 0 9.25 0 12 L 0 38 C 0 40.75 2.25 43 5 43 L 45 43 C 47.75 43 50 40.75 50 38 L 50 12 C 50 9.25 47.75 7 45 7 Z M 5 9 L 45 9 C 46.667969 9 48 10.332031 48 12 L 48 38 C 48 39.667969 46.667969 41 45 41 L 5 41 C 3.332031 41 2 39.667969 2 38 L 2 12 C 2 10.332031 3.332031 9 5 9 Z M 29.6875 19.40625 C 26.585938 19.40625 25 20.933594 25 22.875 C 25 26.386719 29.0625 25.914063 29.0625 27.71875 C 29.0625 28.023438 28.828125 28.75 27.125 28.75 C 25.417969 28.75 24.3125 28.09375 24.3125 28.09375 L 23.78125 30.46875 C 23.78125 30.46875 24.886719 31.09375 27 31.09375 C 29.113281 31.09375 32.03125 29.476563 32.03125 27.125 C 32.03125 24.296875 27.96875 24.074219 27.96875 22.8125 C 27.96875 22.167969 28.46875 21.6875 29.9375 21.6875 C 30.890625 21.6875 31.96875 22.40625 31.96875 22.40625 L 32.46875 19.96875 C 32.46875 19.96875 31.050781 19.40625 29.6875 19.40625 Z M 16.46875 19.625 L 13.78125 27.5625 C 13.78125 27.5625 13.597656 26.886719 13.53125 26.46875 C 11.996094 23.023438 9.5 21.75 9.5 21.75 L 11.875 30.75 L 15.125 30.75 L 19.625 19.625 Z M 20.78125 19.625 L 19.03125 30.75 L 22 30.75 L 23.78125 19.625 Z M 36.8125 19.625 L 31.96875 30.75 L 34.90625 30.75 L 35.5 29.15625 L 39.1875 29.15625 L 39.5 30.75 L 42.1875 30.75 L 39.90625 19.625 Z M 6.25 19.65625 C 6.25 19.65625 12.054688 21.453125 13.40625 25.8125 L 12.40625 20.75 C 12.40625 20.75 11.976563 19.65625 10.8125 19.65625 Z M 37.9375 22.84375 L 38.75 27.03125 L 36.3125 27.03125 Z"></path>
        </svg>
    )

}

const MasterCard = () => {
    return (
        <svg className={"size-[25px]"} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
            <path
                d="M 5 7 C 2.25 7 0 9.25 0 12 L 0 38 C 0 40.75 2.25 43 5 43 L 45 43 C 47.75 43 50 40.75 50 38 L 50 12 C 50 9.25 47.75 7 45 7 Z M 5 9 L 45 9 C 46.667969 9 48 10.332031 48 12 L 48 38 C 48 39.667969 46.667969 41 45 41 L 5 41 C 3.332031 41 2 39.667969 2 38 L 2 12 C 2 10.332031 3.332031 9 5 9 Z M 17 13 C 10.382813 13 5 18.382813 5 25 C 5 31.617188 10.382813 37 17 37 C 20.078125 37 22.875 35.816406 25 33.90625 C 27.125 35.816406 29.925781 37 33 37 C 39.617188 37 45 31.617188 45 25 C 45 18.382813 39.617188 13 33 13 C 29.925781 13 27.125 14.183594 25 16.09375 C 22.875 14.183594 20.078125 13 17 13 Z M 33 15 C 38.535156 15 43 19.464844 43 25 C 43 30.535156 38.535156 35 33 35 C 30.449219 35 28.109375 34.066406 26.34375 32.5 C 27.996094 30.441406 29 27.839844 29 25 C 29 22.160156 27.996094 19.558594 26.34375 17.5 C 28.109375 15.933594 30.449219 15 33 15 Z"></path>
        </svg>
    )
}

const DinersClub = () => {

    return (
        <svg className={"size-[25px]"} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
            <path
                d="M 5 7 C 2.25 7 0 9.25 0 12 L 0 38 C 0 40.75 2.25 43 5 43 L 45 43 C 47.75 43 50 40.75 50 38 L 50 12 C 50 9.25 47.75 7 45 7 Z M 5 9 L 45 9 C 46.667969 9 48 10.332031 48 12 L 48 38 C 48 39.667969 46.667969 41 45 41 L 5 41 C 3.332031 41 2 39.667969 2 38 L 2 12 C 2 10.332031 3.332031 9 5 9 Z M 23 15 C 17.488281 15 13 19.488281 13 25 C 13 30.511719 17.488281 35 23 35 L 26 35 C 31.523438 35 36 30.523438 36 25 C 36 19.476563 31.523438 15 26 15 Z M 23 17 C 27.429688 17 31 20.570313 31 25 C 31 29.429688 27.429688 33 23 33 C 18.570313 33 15 29.429688 15 25 C 15 20.570313 18.570313 17 23 17 Z M 21.34375 20.3125 C 19.398438 20.996094 18 22.820313 18 25 C 18 27.179688 19.398438 29.003906 21.34375 29.6875 Z M 24.65625 20.3125 L 24.65625 29.6875 C 26.601563 29.003906 28 27.179688 28 25 C 28 22.820313 26.601563 20.996094 24.65625 20.3125 Z"></path>
        </svg>
    )
}