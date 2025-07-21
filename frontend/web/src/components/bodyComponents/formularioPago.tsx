import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from "react";
import {b} from "vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";
import {useProceso} from "../../contexts/procesoDeCompraContext.tsx"

type PropsForm = {
    state: boolean;
    setState: (prev : boolean) => void;
}

export const FormCompras = ({state, setState}:PropsForm) => {

    const {refProcess, setCheckFormulario} = useProceso()

    const [indice, setIndice] = useState<number>(1);
    const [activeEnvio, setActiveEnvio] = useState<boolean>(true);

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

        if(activeEnvio) {
            if (validateName, validateLastName, validateEmail, validatePhone, validateDepartamento, validateProvincia, validateDistrito, validateDireccion, validateCourier) {
                setAllCheck(true);
            } else {
                setAllCheck(false)
            }
        } else {
            if(validateName, validateLastName, validateEmail, validatePhone) {
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

    const courierChaced = (e: MouseEvent)  => {

        e.preventDefault()

        const fetchFormulario = async () => {


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
                } :
                {
                    nombre: valueName,
                    apellido: valueLastName,
                    email: valueEmail,
                    phone: valuePhone,
                    phoneTwo: valuePhoneTwo
                }

            const url = "http://localhost:3000/formulario"
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario),
            }
            try{
                const response = await fetch(url,options);
                if(!response.ok) throw new Error(`Error en la peticion - ${response.status} : ${response.statusText}`)
                const result = await response.json()

                result.ok ? setCheckFormulario(true) : setCheckFormulario(false)
                result.ok && setState(false);

                console.log(result.messageBackend)

            }catch(err){
                console.error(err.message)
            } finally {


            }


        }
        allCheck && fetchFormulario();

    }

    return(
        <section className={`${ state ? "opacity-100 pointer-events-auto showItem" : "opacity-0 pointer-events-none"} transition-half w-[500px] h-[750px] border-2 border-gray-200`}>
            <form className={"flex flex-col"}>

                <button onClick={(e : MouseEvent) => { e.preventDefault(); setActiveEnvio(prev=>!prev) } } className={`${ activeEnvio ? "bg-white" : "bg-blue-300"}  w-[250px] self-center`}>{`${activeEnvio ? "envio del producto" : "recojo en tienda"}`}</button>
                <div>

                    <div className={"flex items-center"}>
                        <div className={"h-[2px] w-[50%] bg-black"}/>
                        <small>rellene todos los campos requeridos</small>
                        <div className={"h-[2px] w-1/2 bg-black"}/>
                    </div>

                    <div className={"flex justify-between gap-[10px]"}>
                        <InputText indicador={"ingrese sus nombres"} tipo={"text"} placeholderName={"Andre Julian"} requiredText={true} validate={setValidateName} setName={setValueName}/>
                        <InputText indicador={"ingrese sus apellidos"} tipo={"text"} placeholderName={"Espinoza Rodriguez"} requiredText={true} validate={setValidateLastName} setName={setValueLastName}/>
                    </div>

                    <InputEmail indicador={"ingrese un correo electronico"} tipo={"email"} placeholderEmail={"tuscompras@tienda.com"} validate={setValidateEmail} setName={setValueEmail}/>

                    <div className={"flex justify-between gap-[10px]"}>
                        <InputPhone indicador={"ingrese su numero de telefono"} tipo={"tel"} activeRequired={true} placeholderPhone={"+51 999 999 999"} validate={setValidatePhone} setName={setValuePhone}/>
                        <InputPhone indicador={"ingrese un numero de respaldo"} tipo={"tel"} activeRequired={false} placeholderPhone={"+51 988 888 888"} validate={null} setName={setValuePhoneTwo}/>
                    </div>
                </div>
                {
                    activeEnvio &&
                    <div className={"showItem"}>
                        <div className={"flex items-center"}>
                            <div className={"h-[2px] w-[50%] bg-black"}/>
                            <small>datos de envio</small>
                            <div className={"h-[2px] w-1/2 bg-black"}/>
                        </div>
                            <div>
                                <div className={"flex justify-between"}>
                                    <InputText indicador={"departamento"} tipo={"text"} requiredText={true} placeholderName={"departamento"} validate={setValidateDepartamento} setName={setValueDepartamento}/>
                                    <InputText indicador={"provincia"} tipo={"text"} requiredText={true} placeholderName={"provincia"} validate={setValidateProvincia} setName={setValueProvincia}/>
                                </div>
                                <InputText indicador={"distrito"} tipo={"text"} requiredText={true} placeholderName={"distrito"} validate={setValidateDistrito} setName={setValueDistrito}/>
                                <div>
                                    <h1>direccion</h1>
                                    <input  onBlur={ (e) => { setValidateDireccion(true); setAllCheck(true); setValueDireccion(e.currentTarget.value) } } onChange={ (e) => { setValidateDireccion(true);  setValueDireccion(e.currentTarget.value); setAllCheck(true);  } } type="text" required placeholder={"ingrese una direccion valida"} name={"direccion"} />
                                </div>
                            </div>
                        {
                            indice &&
                            <div className={"flex gap-[10px]"}>
                                <div onClick={() => { setValidateCourier(true); setIndice(2); setActiveTextArea(true)}}
                                     className={`${indice === 2 ? "bg-yellow-400" : ""} transition-half border-2 w-[125px]`}>olva
                                    courier
                                </div>
                                <div onClick={() => { setValidateCourier(true); setIndice(3); setActiveTextArea(true)}}
                                     className={`${indice === 3 ? "bg-red-600" : ""} transition-half border-2 w-[125px]`}>shalom
                                </div>
                                <div onClick={() => { setValidateCourier(true); setIndice(4); setActiveTextArea(true)}}
                                     className={`${indice === 4 ? "bg-green-400" : ""} transition-half border-2 w-[125px]`}>dino
                                    courier
                                </div>
                                <div onClick={() => { setValidateCourier(true); setIndice(5); setActiveTextArea(true)}}
                                     className={`${indice === 5 ? "bg-gray-500" : ""} transition-half border-2 w-[125px]`}>otros
                                </div>
                            </div>
                        }
                        {
                            activeTextArea &&
                            <div>
                                <textarea onBlur={(e)=>setValueTextArea(e.currentTarget.value)} name="infoEnvio" id="" cols="30" rows="10" placeholder={"ingrese sede y lugar de recojo "}></textarea>
                            </div>
                        }
                    </div>
                }
                <button  onClick={courierChaced} className={`${ allCheck ? "bg-blue-300" : "bg-red-600"}`}>Enviar</button>
            </form>
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
        <div className={"relative flex flex-col w-[225px]"}>
            <label htmlFor="">{indicador}</label>
            <div className={"relative"}>
                <input type={tipo} className={"w-full"} onChange={filterChange} onBlur={filterBlur} value={textInput} placeholder={placeholderName} required={requiredText}/>
                {
                    activeError &&
                    <small className={"showItem absolute bg-red-600 top-1/2 -translate-y-1/2 leading-none left-full"}>patron invalido</small>
                }
                {
                    activeCheck &&
                    <svg className={"showItem rounded-full shadow-[0px_0px_0px_2px_rgba(255,255,255,1)] absolute top-1/2 leading-nine left-full -translate-y-1/2"} xmlns="http://www.w3.org/2000/svg" height="17.5px" viewBox="0 -960 960 960" width="17.5px"
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
    const filterBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredText = e.currentTarget.value;
        const cleanText = /^[a-zA-Z0-9._%+\-áéíóúÁÉÍÓÚñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    }

    return(
        <div className={"flex flex-col gap-[10px] w-1/2"}>
            <label htmlFor="">{indicador}</label>
            <div className={"relative"}>
                <input type={tipo} value={textEmail} className={`${activeError ? "border-2 border-red-500":""} w-full`} onChange={filterChange} onBlur={filterBlur} onKeyDown={handleKeyDown} placeholder={placeholderEmail} required/>
                {
                    activeError &&
                    <small className={"showItem absolute bg-red-600 top-[90%] leading-none left-1/2"}>patron invalido</small>
                }
                {
                    activeCheck &&
                    <svg className={"showItem rounded-full shadow-[0px_0px_0px_2px_rgba(255,255,255,1)] absolute top-1/2 leading-nine left-full -translate-y-1/2"} xmlns="http://www.w3.org/2000/svg" height="17.5px" viewBox="0 -960 960 960" width="17.5px"
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
            <div className={"relative"}>
                <input type={tipo} className={"w-full"} value={phoneText} required={activeRequired} onChange={filterChange} onBlur={filterBlur} placeholder={placeholderPhone}/>
                {
                    activeError &&
                    <small className={"showItem absolute bg-red-600 top-[90%] leading-none left-1/2"}>{messageError}</small>
                }
                {
                    activeCheck &&
                    <svg className={"showItem rounded-full shadow-[0px_0px_0px_2px_rgba(255,255,255,1)] absolute top-1/2 leading-nine left-full -translate-y-1/2"} xmlns="http://www.w3.org/2000/svg" height="17.5px" viewBox="0 -960 960 960" width="17.5px"
                         fill="lightgreen">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                }
            </div>
        </div>
    )
}