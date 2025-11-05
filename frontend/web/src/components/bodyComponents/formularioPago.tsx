import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from "react";
import {b} from "vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";
import {useProceso} from "../../contexts/procesoDeCompraContext.tsx"
import {useCarrito} from "../../contexts/carritoContext.tsx"
import {useGetProducts} from "../../contexts/carritoContext.tsx";
import {useWaitUntil} from "../../zustand/useWaitUntil.tsx";
import {useCompleteForm} from "../../zustand/useCompleteForm.tsx"
import {FormToken} from "../../zustand/useFormToken.tsx";
import KRGlue from '@lyracom/embedded-form-glue';
import {products} from "prisma-client-31dbe9c101021983b522dcd6c0571e96b28b45ea83036d11b435b0030c41a9f6";
import {useNavigate} from 'react-router-dom'
import Decimal from 'decimal.js'

type PropsForm = {
    state: boolean;
}

export const FormCompras = ({state} : PropsForm) => {

    const navigate = useNavigate();
    const {updateValueFormToken, updatePublicKey} = FormToken();

    const {completeForm, toggleCompleteForm} = useCompleteForm()
    const {refProcess, setCheckFormulario} = useProceso()
    const {statusForm, changeStatusForm} = useCompleteForm();
    const {statusSpinner, changeStatusSpinner} = useWaitUntil();
    // const {count, incrementCoun, carritoCompras} = useCarrito();
    const {data,carritoCompras, refetchCarrito} = useGetProducts()

    const [indice, setIndice] = useState<number>(1);
    const [activeEnvio, setActiveEnvio] = useState<boolean>(true);
    const directionRef = useRef<HTMLInputElement|null>(null)

    const [validateInputs, setValidateInputs] = useState<boolean>(true)


    const [activeTextArea, setActiveTextArea] = useState<boolean>(false);
    const [validateName, setValidateName] = useState<boolean>(false);
    const [validateLastName, setValidateLastName] = useState<boolean>(false);
    const [validateEmail, setValidateEmail] = useState<boolean>(false);
    const [validatePhone, setValidatePhone] = useState<boolean>(false);
    const [validateDepartamento, setValidateDepartamento] = useState<boolean>(false);
    const [validateProvincia, setValidateProvincia] = useState<boolean>(false);
    const [validateDistrito, setValidateDistrito] = useState<boolean>(false);
    const [validateDireccion, setValidateDireccion] = useState<boolean>(false);
    const [validateCourier, setValidateCourier] = useState<boolean>(false);

    const [valueName, setValueName] = useState<string>('');
    const [valueLastName, setValueLastName] = useState<string>('');
    const [valueEmail, setValueEmail] = useState<string>('');
    const [valuePhone, setValuePhone] = useState<string>('');
    const [valuePhoneTwo, setValuePhoneTwo] = useState<string>('');
    const [valueDepartamento, setValueDepartamento] = useState<string>('');
    const [valueProvincia, setValueProvincia] = useState<string>('');
    const [valueDistrito, setValueDistrito] = useState<string>('');
    const [valueDireccion, setValueDireccion] = useState<string>('');
    const [valueCourier, setValueCourier] = useState<string>('');
    const [valueTextArea, setValueTextArea] = useState<string>("")



    const [allCheck, setAllCheck] = useState<boolean>(false);

    const allCheckTienda = useRef<boolean[]>([validateName, validateLastName, validateEmail, validatePhone]);
    const allCheckEnvio = useRef<boolean[]>([validateName, validateLastName, validateEmail, validatePhone, validateDepartamento, validateProvincia, validateDistrito, validateDireccion, validateCourier]);

    useEffect(()=>{

        // console.log('activeEnvio -> ', activeEnvio);
        // console.log('validateName -> ', validateName);
        // console.log('validateLastName -> ', validateLastName);
        // console.log('validateEmail -> ', validateEmail);
        // console.log('validatePhone -> ', validatePhone);
        // console.log('validateDepartamento -> ', validateDepartamento);
        // console.log('validateProvincia -> ', validateProvincia);
        // console.log('validateDistrito -> ', validateDistrito);
        // console.log('validateDireccion -> ', validateDireccion);
        // console.log('validateCourier -> ', validateCourier);

        if(activeEnvio) {
            if (validateName && validateLastName && validateEmail && validatePhone && validateDepartamento && validateProvincia && validateDistrito && validateDireccion && validateCourier) {
                setAllCheck(true);
            } else {
                setAllCheck(false)
            }
        } else {
            if(validateName && validateLastName && validateEmail && validatePhone) {
                setAllCheck(true);
            } else {
                setAllCheck(false)
            }
        }

    },[activeEnvio, validateName, validateLastName, validateEmail, validatePhone, validateDepartamento, validateProvincia, validateDistrito, validateDireccion, validateCourier])

    useEffect(()=>{

        if(!activeEnvio) {
            setValidateDepartamento(false);
            setValidateProvincia(false);
            setValidateDistrito(false);
            setValidateDireccion(false);
            setValidateCourier(false);
            setIndice(1);
            setActiveTextArea(false)
        }

    },[activeEnvio])

    const courier = () : string => {

        switch(indice) {
            case 2 : {
                return "olva courier" ;
            }
            case 3 : {
                return "shalom";
            }
            case 4 : {
                return "dino courier";
            }
            case 5 : {
                return "otros";
            }
            default : {
                return "";
            }

        }
    }

    const courierChaced = async (e: React.MouseEvent)  => {

        e.preventDefault()
        // await refetchCarrito();
        // console.log('vamos a pasar a mostrar que campos estan completos')
        // console.log('activeEnvio -> ', activeEnvio);
        // console.log('validateName -> ', validateName);
        // console.log('validateLastName -> ', validateLastName);
        // console.log('validateEmail -> ', validateEmail);
        // console.log('validatePhone -> ', validatePhone);
        // console.log('validateDepartamento -> ', validateDepartamento);
        // console.log('validateProvincia -> ', validateProvincia);
        // console.log('validateDistrito -> ', validateDistrito);
        // console.log('validateDireccion -> ', validateDireccion);
        // console.log('validateCourier -> ', validateCourier);

        allCheck ? setValidateInputs(true) : setValidateInputs(false);


        const fetchFormulario = async () => {

            const amount: Decimal = carritoCompras.reduce(
                (total: Decimal, el) => total.add(el.price_product),
                new Decimal(0)
            );

            console.log('el amount en el frontend es -> ', amount.toNumber())
            const usuario = activeEnvio ?
                {
                    nombre: valueName,
                    apellido: valueLastName,
                    email: valueEmail,
                    phone: valuePhone,
                    phoneTwo: valuePhoneTwo,
                    departamento: valueDepartamento,
                    provincia: valueProvincia,
                    distrito: valueDistrito,
                    direccion: valueDireccion,
                    courierDelivery: courier(),
                    textArea: valueTextArea,
                    amount,
                    activeEnvio
                } :
                {
                    nombre: valueName,
                    apellido: valueLastName,
                    email: valueEmail,
                    phone: valuePhone,
                    phoneTwo: valuePhoneTwo,
                    amount,
                    activeEnvio
                }

            const url = "http://localhost:4000/formulario"
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario),
            }
            try{
                changeStatusSpinner()
                const response = await fetch(url,options);
                if(!response.ok) throw new Error(`Error en la peticion - ${response.status} : ${response.statusText}`)
                const result = await response.json()

                console.log('aqui esta el result del formulario-> ',result)
                result.ok ? setCheckFormulario(true) : setCheckFormulario(false)
                result.ok && toggleCompleteForm();
                result.ok && changeStatusForm();
                result.ok && updateValueFormToken(result.formToken);
                result.ok && updatePublicKey(result.publicKey);
                changeStatusSpinner()
                navigate("/pagoProducts",{state:result})

            }catch(err){
                console.error(err.message)
            } finally {

            }
        }

        if(allCheck) {
            fetchFormulario();
            // setValidateInputs(true);
        }

    }
    return(
        <section className={`${ state ? "showItem" : "hidden"} transition-half min-h-[275px] w-[500px] relative border-4 border-gray-200 shadow-[0px_0px_2px_2px_rgba(0,0,0,.5)] p-[15px] rounded-[7.5px]`}>
            <form className={"flex flex-col gap-[15px]"}>

                <button onClick={(e : React.MouseEvent) => { e.preventDefault(); setActiveEnvio(prev=>!prev) } } className={`${ activeEnvio ? "bg-yellow-500" : "bg-blue-300"}  w-[250px] self-center rounded-[7.5px] h-[30px]`}>{`${activeEnvio ? "Envio del producto" : "Recojo en tienda"}`}</button>
                <div className={"flex flex-col gap-[15px]"}>

                    <div className={"flex items-center"}>
                        <div className={"h-[2px] w-[42.5%] bg-black"}/>
                        <small className={"block text-center leading-none"}>rellene todos los campos requeridos</small>
                        <div className={"h-[2px] w-[42.5%] bg-black"}/>
                    </div>

                    <div className={"flex justify-between"}>
                        <InputText indicador={"Ingrese sus nombres"} tipo={"text"} placeholderName={"Andre Julian"} requiredText={true} validate={setValidateName} setName={setValueName}/>
                        <InputText indicador={"Ingrese sus apellidos"} tipo={"text"} placeholderName={"Espinoza Rodriguez"} requiredText={true} validate={setValidateLastName} setName={setValueLastName}/>
                    </div>

                    <InputEmail indicador={"Ingrese un correo electronico"} tipo={"email"} placeholderEmail={"tuscompras@tienda.com"} validate={setValidateEmail} setName={setValueEmail}/>

                    <div className={"flex justify-between gap-[10px]"}>
                        <InputPhone indicador={"Ingrese su numero de telefono"} tipo={"tel"} activeRequired={true} placeholderPhone={"+51 999 999 999"} validate={setValidatePhone} setName={setValuePhone}/>
                        <InputPhone indicador={"Ingrese un numero de respaldo"} tipo={"tel"} activeRequired={false} placeholderPhone={"+51 988 888 888"} validate={null} setName={setValuePhoneTwo}/>
                    </div>
                </div>
                {
                    activeEnvio &&
                    <div className={"showItem flex flex-col gap-[15px]"}>
                        <div className={"flex items-center justify-around"}>
                            <div className={"h-[2px] w-[37.5%] bg-black"}/>
                            <small className={"leading-none h-[20px] flex items-center text-center"}>datos de envio</small>
                            <div className={"h-[2px] w-[37.5%] bg-black"}/>
                        </div>
                        <div className={"flex flex-col gap-[15px]"}>
                                <div className={"flex justify-between"}>
                                    <InputText indicador={"Departamento"} tipo={"text"} requiredText={true} placeholderName={"departamento"} validate={setValidateDepartamento} setName={setValueDepartamento}/>
                                    <InputText indicador={"Provincia"} tipo={"text"} requiredText={true} placeholderName={"provincia"} validate={setValidateProvincia} setName={setValueProvincia}/>
                                </div>
                                <InputText indicador={"Distrito"} tipo={"text"} requiredText={true} placeholderName={"distrito"} validate={setValidateDistrito} setName={setValueDistrito}/>
                                <InputDirection validate={setValidateDireccion} setDireccion={setValueDireccion}/>
                        </div>
                        {
                            indice &&
                            <div className={"flex gap-[10px]"}>
                                <div onClick={() => { setValidateCourier(true); setIndice(2); setActiveTextArea(true)}}
                                     className={`${indice === 2 ? "bg-yellow-400" : ""} transition-half border-2 w-[125px] rounded-[7.5px] px-[5px] text-center`}>olva
                                    courier
                                </div>
                                <div onClick={() => { setValidateCourier(true); setIndice(3); setActiveTextArea(true)}}
                                     className={`${indice === 3 ? "bg-red-600" : ""} transition-half border-2 w-[125px] rounded-[7.5px] px-[5px] text-center`}>shalom
                                </div>
                                <div onClick={() => { setValidateCourier(true); setIndice(4); setActiveTextArea(true)}}
                                     className={`${indice === 4 ? "bg-green-400" : ""} transition-half border-2 w-[125px] rounded-[7.5px] px-[5px] text-center`}>dino
                                    courier
                                </div>
                                <div onClick={() => { setValidateCourier(true); setIndice(5); setActiveTextArea(true)}}
                                     className={`${indice === 5 ? "bg-gray-500" : ""} transition-half border-2 w-[125px] rounded-[7.5px] px-[5px] text-center`}>otros
                                </div>
                            </div>
                        }
                        {
                            activeTextArea &&
                            <div>
                                <textarea className={"w-full rounded-[7.5px] p-[5px] border-2 border-gray-500"} onBlur={(e)=> {setValueTextArea(e.currentTarget.value)}} name="infoEnvio" id="" cols="30" rows="10" placeholder={"ingrese sede y lugar de recojo "}/>
                            </div>
                        }
                    </div>
                }
                <button  onClick={courierChaced} className={`${ allCheck ? "bg-blue-300" : "bg-red-600 " }  rounded-[7.5px] h-[30px] p-[5px]"}`}>Enviar</button>
            </form>
            <b className={` ${ validateInputs ? "hidden" : "showItem"} ${allCheck ? "hidden" : ""} text-red-600 font-medium text-[12.5px] w-[300px] text-center absolute bottom-[5%] left-1/2 -translate-x-1/2`}>*campos imcompletos, rellene todos los campos*</b>
        </section>
    )
}

type InputProps = {
    indicador: string;
    tipo: string
    placeholderName : string
    requiredText: boolean
    validate: (prev: boolean) => void
    setName: (prev: string) => void
}

const InputText = ({indicador, tipo, placeholderName, requiredText, validate, setName }: InputProps) => {

    const [activeError, setActiveError] = useState<boolean>(false);
    const [activeCheck, setActiveCheck] = useState<boolean>(false);
    const [textInput, setTextInput] = useState<string>("");

    const filterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredText = e.currentTarget.value;
        const cleanText = enteredText.replace(/\s+/g," ").replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,"")

        const verifyText = /[^\s@]/.test(cleanText)
        setTextInput(cleanText)

        if(verifyText) {
            validate(true)
            setActiveCheck(true)
            setActiveError(false)
            setName(cleanText)
        } else {
            validate(false)
            setActiveCheck(false)
            setActiveError(true)
            setName("");
        }
        // verifyText ? validate(true) : validate(false)


    }

    const filterBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredText = e.currentTarget.value;
        const cleanText = /[^\s@]/.test(enteredText);

        // cleanText && setActiveCheck(true)
        if(cleanText) {
            setActiveCheck(true)
            validate(true)
        }

    }

    return (
        <div className={"relative flex flex-col w-[225px] "}>
            <label htmlFor="">{indicador}</label>
            <div className={"relative w-[230px]"}>
                <input type={tipo} className={"w-[230px] border-2 border-gray-500 rounded-[7.5px] px-[5px]"} onChange={filterChange} onBlur={filterBlur} value={textInput} placeholder={placeholderName} required={requiredText}/>
                {
                    activeError &&
                    <svg className={"showItem absolute size-[25px] rounded-full  top-1/2 -translate-y-1/2 leading-none left-[87.5%] "} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                }
                {
                    activeCheck &&
                    <svg className={"showItem rounded-full shadow-[0px_0px_0px_2px_rgba(255,255,255,1)] size-[20px] border-[2px] border-gray-500 absolute top-1/2 leading-nine left-[87.5%] -translate-y-1/2"} xmlns="http://www.w3.org/2000/svg" height="17.5px" viewBox="0 -960 960 960" width="17.5px"
                         fill="lightgreen">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                }
            </div>

        </div>
    )
}

type EmailProps = {
    indicador: string;
    tipo: string;
    placeholderEmail: string;
    validate: (prev: boolean) => void;
    setName: (prev: string) => void;
}

const InputEmail = ({indicador, tipo, placeholderEmail, validate, setName} : EmailProps) => {

    const [textEmail, setTextEmail] = useState<string>("");
    const [activeError, setActiveError] = useState<boolean>(false);
    const [activeCheck, setActiveCheck] = useState<boolean>(false);


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " ") {
            e.preventDefault(); // Bloquea espacios
        }
    };

    const filterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredText = e.currentTarget.value;
        const cleanText = enteredText.replace(/\s+/g,"");

        setTextEmail(cleanText)
        // setActiveCheck(false)

        const verifyText = /^[a-zA-Z0-9._%+\-áéíóúÁÉÍÓÚñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cleanText)

        if(verifyText) {
            validate(true)  ;
            setActiveCheck(true);
            setActiveError(false)
            setName(cleanText)
        } else {
            validate(false);
            setActiveCheck(false);
            setActiveError(true)
            setName("")
        }

    }

    return(
        <div className={"flex flex-col w-[230px]"}>
            <label htmlFor="">{indicador}</label>
            <div className={"relative w-[230px]"}>
                <input type={tipo} value={textEmail} className={`${activeError ? "border-2 border-red-500":""} w-full border-2 border-gray-500 rounded-[7.5px] px-[10px]`} onChange={filterChange} onKeyDown={handleKeyDown} placeholder={placeholderEmail} required/>
                {
                    activeError &&
                    <svg className={"showItem absolute size-[25px] rounded-full  top-1/2 -translate-y-1/2 leading-none left-[87.5%] "} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                }
                {
                    activeCheck &&
                    <svg className={"showItem rounded-full border-2 border-gray-500 shadow-[0px_0px_0px_2px_rgba(255,255,255,1)] absolute size-[20px] top-1/2 leading-nine left-[87.5%]  -translate-y-1/2"} xmlns="http://www.w3.org/2000/svg" height="17.5px" viewBox="0 -960 960 960" width="17.5px"
                         fill="lightgreen">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                }
            </div>

        </div>
    )
}

type PhoneProps = {
    indicador: string;
    tipo: string;
    activeRequired: boolean;
    placeholderPhone: string
    validate: (prev: boolean) => void | null;
    setName: (prev: string) => void
}

const InputPhone = ({indicador, tipo, activeRequired, placeholderPhone, validate, setName}: PhoneProps) => {
    const [activeError, setActiveError] = useState<boolean>(false);
    const [activeCheck, setActiveCheck] = useState<boolean>(false);
    const [phoneText, setPhoneText] = useState<string>("");
    const [messageError, setMessageError] = useState<string>("error")

    const filterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredText = e.currentTarget.value;
        const cleanText = enteredText.replace(/\D/g,"")

        setPhoneText(cleanText)

        const verifyText = /^[0-9]{9}$/.test(cleanText)
        // verifyText ? validate(true) : validate(false)
        if(verifyText) {

            typeof validate === 'function' && validate(true);
            setName(cleanText)
            setActiveError(false);
            setActiveCheck(true)
        } else {

            typeof validate === 'function' && validate(false);

            const numberLength = cleanText.length
            if(numberLength < 9) {
                numberLength > 6 ? setMessageError("no debe tener menos de 9 digitos") : setMessageError("")
            } else if ( numberLength > 9) {
                setMessageError("no debe tener mas de 9 digitos")
            }
            setName("")
            setActiveError(true)
            setActiveCheck(false)
        }

    }
    const filterBlur = (e: React.ChangeEvent<HTMLInputElement>) => {

        const enteredText = e.currentTarget.value;

        // if(enteredText.length === 9) {
        //     setActiveCheck(true);
        //     setActiveError(false);
        //     validate(true)
        // } else {
        //     setActiveError(true)
        //     setActiveCheck(false)
        //     validate(false)
        // }

    }

    return(
        <div className={"relative"}>
            <label htmlFor="">{indicador}</label>
            <div className={"relative w-[230px]"}>
                <input type={tipo} className={"w-[230px] border-2 border-gray-500 rounded-[7.5px] px-[5px]"} value={phoneText} required={activeRequired} onChange={filterChange} onBlur={filterBlur} placeholder={placeholderPhone}/>
                {
                    activeError &&
                    <svg className={"showItem absolute size-[25px] rounded-full  top-1/2 -translate-y-1/2 leading-none left-[87.5%] "} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                }
                {
                    activeCheck &&
                    <svg className={"showItem rounded-full size-[20px] border-2 border-gray-500 shadow-[0px_0px_0px_2px_rgba(255,255,255,1)] absolute top-1/2 leading-nine left-[87.5%] -translate-y-1/2"} xmlns="http://www.w3.org/2000/svg" height="17.5px" viewBox="0 -960 960 960" width="17.5px"
                         fill="lightgreen">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                }
            </div>
        </div>
    )
}


type PropsDirection = {
    validate : (prev: boolean) => void;
    setDireccion : (prev: string) => void;
}

const InputDirection = ({validate, setDireccion} : PropsDirection) => {
    const directionRef = useRef<HTMLInputElement|null>(null)
    const [activeError, setActiveError] = useState<boolean>(false);
    const [activeCheck, setActiveCheck] = useState<boolean>(false);



   const filterText = (e : React.ChangeEvent<HTMLInputElement>) => {
        const txt = e.currentTarget.value

        console.log('aqui ta el text -> ', txt)


        if(txt === "") {
            setActiveError(true);
            setActiveCheck(false);
            validate(false);
        } else {
            setActiveError(false);
            setActiveCheck(true);
            validate(true);
            setDireccion(txt)
        }

   }

    return(
            <div className={"relative"}>
                <h1>Direccion</h1>
                <div className={"relative w-[230px]"}>
                    <input onChange={filterText} ref={directionRef} className={"border-2 border-gray-500 rounded-[7.5px] px-[5px] w-[230px]"} type="text" required placeholder={"Ingrese una direccion valida"} name={"direccion"} />
                    {
                        activeError &&
                        <svg className={"showItem absolute size-[25px] rounded-full  top-1/2 -translate-y-1/2 leading-none left-[87.5%] "} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54
                        127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    }
                    {
                        activeCheck &&
                        <svg className={"showItem rounded-full border-2 border-gray-500 size-[20px] shadow-[0px_0px_0px_2px_rgba(255,255,255,1)] absolute top-1/2 leading-nine left-[87.5%] -translate-y-1/2"} xmlns="http://www.w3.org/2000/svg" height="17.5px" viewBox="0 -960 960 960" width="17.5px" fill="lightgreen"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                        </svg>
                    }
                </div>
            </div>
    )
}