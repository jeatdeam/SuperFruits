import {useNavigate, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import KRGlue from "@lyracom/embedded-form-glue";
import axios from 'axios';
import {useCompleteForm} from '../zustand/useCompleteForm.tsx';
import {useCarrito} from "../contexts/carritoContext.tsx";
import {useFetchDeleteAll} from "../hooks/fetchDeleteAll.tsx";
import {useValidateCompra} from "../zustand/useValidateCompra.tsx"


export const IziPayForm = () => {
        const location = useLocation();
        const clientAnswer = location.state || {message: 'no hay datos mi rey'};
        const navigate = useNavigate();
        const {carritoCompras} = useCarrito();
        const {completeForm} = useCompleteForm();
        const {toggleCompra} = useValidateCompra();

        useEffect(()=>{
            console.log('aqui esta el clientAnswer -> ',clientAnswer);
            let endpoint = "https://static.micuentaweb.pe";

            //Configurar libreria con los datos recibidos de su servidor
            KRGlue.loadLibrary(endpoint, clientAnswer.publicKey).then(({ KR }) => {
                KR.setFormConfig({
                    formToken: clientAnswer.formToken,
                    'kr-language': 'es-ES',
                    'kr-payment-methods': 'CARD, YAPE, BIM, TUNKI, PAGOEFECTIVO',
                    'kr-theme': 'material',
                });

                KR.renderElements('#micuentawebstd_rest_wrapper')
                //Incrustar la pasarela
                // KR.attachForm('#micuentawebstd_rest_wrapper').then(({ KR, result }) => {
                //     KR.showForm(result.formId);
                // });

                //Al recibir la respuesta enviar a su servidor a validar los datos
                // Agregar más logging en el onSubmit
                KR.onSubmit(paymentData => {
                    console.log('=== DATOS DE PAGO RECIBIDOS ===');
                    console.log('PaymentData completo:', paymentData);
                    console.log('ClientAnswer:', paymentData.clientAnswer);
                    console.log('Hash:', paymentData.hash);

                    axios.post('http://localhost:4000/datosPago', {
                        'kr-answer': paymentData.rawClientAnswer,
                        'kr-hash': paymentData.hash,
                        carritoCompras,
                    })
                        .then(response => {
                            console.log('Respuesta del servidor de validación:', response.data);
                            if (response.data === true) {
                                console.log('Pago validado exitosamente, redirigiendo...');
                                toggleCompra()
                                navigate('/successPage', { state: paymentData.clientAnswer });
                                // useFetchDeleteAll();
                            } else {
                                console.log('Pago no válido o fallido');
                                alert('El pago no pudo ser procesado');
                                navigate('/errorPage', {state: paymentData.clientAnswer });
                            }
                        })
                        .catch(error => {
                            console.error('Error en la validación:', error);
                            alert('Error al validar el pago');
                        });

                    return false; // Importante: evita el envío automático
                });
            })
        },[])



    return(
        <main className={"mx-auto gap-[30px] w-fit rounded-[8px]  p-[30px] pb-[60px] shadow-[0px_0px_3.5px_1.5px_rgba(0,0,0,1)] mt-[30px] mb-[60px] flex flex-col justify-center items-center"}>
            {
                completeForm ?
                    <>
                        <h1 className={"text-[50px]"}>Izipay tarjeta</h1>
                        <div className={" p-[20px] border-2 border-gray-500 rounded-[8px]"} id="micuentawebstd_rest_wrapper">
                            <div className={"kr-embedded"}/>
                        </div>
                    </>
                :
                    <h1 className={"text-[50px] w-3/5 text-center"}>Se requiere agregar productos al carrito y rellenar el formulario</h1>
            }

        </main>
    )
}