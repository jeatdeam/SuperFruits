import { useEffect, useState } from "react";
import {Form, useNavigate} from "react-router-dom";
import {FormToken} from "../../zustand/useFormToken.tsx";
import KRGlue from '@lyracom/embedded-form-glue';

export const ButtonPay = () => {
    const [ready, setReady] = useState(false);
    const navigate = useNavigate();
    const {formToken, publicKey} = FormToken();

    useEffect(() => {

    }, []);


    const payProducts = async () => {
        console.log('gaaaa')
        navigate('/pagoProducts', {state: {formToken, publicKey}});
    };

    return (
        <button className="border-2 font-medium border-gray-500  rounded-[8px] w-[150px] " onClick={payProducts}>
            pagar
        </button>
    );
};
