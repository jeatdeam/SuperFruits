import type { TransportOptions } from 'nodemailer';
import {Products, carritoCompras} from '../controllers/taskControllers'
import puppeteer from "puppeteer";
const nodemailer = require('nodemailer');
import {Request, Response} from "express";
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
    // html: null,
} as TransportOptions)

async function generatePDF(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });

    const pdfBuffer = await page.pdf({
        path: 'output.pdf',
        format: 'A4',
        margin: {
            top: '0cm',
            bottom: '0cm',
            left: '0cm',
            right: '0cm'
        },
        printBackground: true
    });


    await browser.close();
    return Buffer.from(pdfBuffer);
}

export const formulario = async (req: Request, res: Response) => {
    const mapProducts = new Map<number, Products[]>();
    const { nombre, apellido, email, phone, phoneTwo,carritoCompras } = req.body;

    console.log('aqui esta el carritoCompras ->', carritoCompras);

    carritoCompras.forEach((product : Products) => {
        if (mapProducts.has(product.id)) {
            mapProducts.get(product.id)!.push(product);
        } else {
            mapProducts.set(product.id, [product]);
        }
    });

    try {


        if (!email) {
            return res.status(400).json({
                ok: false,
                messageBackend: "Email es requerido"
            });
        }

        const datos = {
            carritoCompras: [...mapProducts],
            nombre,
            apellido
        };

        res.render('comprasPDF', datos, async (errPDF: Error | null, htmlPDF: string) => {
            if (errPDF) {
                console.error('Error al renderizar comprasPDF:', errPDF);
                return res.status(500).json({
                    ok: false,
                    messageBackend: 'Error al generar PDF'
                });
            }

            const pdfBuffer = await generatePDF(htmlPDF);

            res.render('email', datos, async (errMail: Error | null, htmlMail: string) => {
                if (errMail) {
                    console.error('Error al renderizar email:', errMail);
                    return res.status(500).json({
                        ok: false,
                        messageBackend: 'Error al renderizar plantilla de correo'
                    });
                }

                const optionsMail = {
                    from: process.env.USER_EMAIL,
                    to: email,
                    subject: `Proceso de compra en SuperFruits-store`,
                    html: htmlMail,
                    attachments: [
                        {
                            filename: "detalle_compra.pdf",
                            content: pdfBuffer,
                            contentType: 'application/pdf'
                        }
                    ]
                };

                try {
                    const info = await transporter.sendMail(optionsMail);

                    return res.status(200).json({
                        ok: true,
                        messageBackend: "Email enviado correctamente",
                        response: info
                    });
                } catch (sendError) {
                    console.error('Error al enviar correo:', sendError);
                    return res.status(500).json({
                        ok: false,
                        messageBackend: "Error al enviar el email",
                        error: sendError instanceof Error ? sendError.message : 'Error desconocido'
                    });
                }
            });
        });

    } catch (error) {
        console.error('Error en formulario:', error);
        return res.status(500).json({
            ok: false,
            messageBackend: "Error general del servidor",
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};


