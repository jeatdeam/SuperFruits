// import { useEffect, useRef } from "react";
//
// export function Water() {
//     const container = useRef<HTMLDivElement | null>(null);
//
//     useEffect(() => {
//         const options: IntersectionObserverInit = {
//             root: null,
//             rootMargin: "0px",
//             threshold: 0.1,
//         };
//
//         const callback = (entries: IntersectionObserverEntry[]) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     console.log("El elemento está visible");
//                     entry.target.style.opacity = "1";
//                     entry.target.style.transform = "translateY(0)"; // Cambia a gray cuando esté visible
//                 } else {
//                     // console.log("El elemento no está visible");
//                     // entry.target.style.transform = "translateY(50px)"; // Cambia a orange cuando no esté visible
//                 }
//             });
//         };
//
//         const observer = new IntersectionObserver(callback, {threshold:0.2});
//
//         // Verificamos si el contenedor está disponible y luego observamos todos los elementos dentro de él
//         if (container.current) {
//             const children = container.current.children;
//             for (let i = 0; i < children.length; i++) {
//                 observer.observe(children[i]);
//             }
//         }
//
//         // Cleanup: desobservamos cuando el componente se desmonta
//         return () => {
//             if (container.current) {
//                 const children = container.current.children;
//                 for (let i = 0; i < children.length; i++) {
//                     observer.unobserve(children[i]);
//                 }
//             }
//         };
//     }, []); // El efecto se ejecuta solo una vez al montar el componente
//
//     return (
//         <div ref={container} className={"bg-white"}>
//             {Array.from({ length: 10 }).map((_, index) => (
//                 <div
//                     key={index}
//                     className={`fade-in-section w-full h-[300px] ${
//                         index % 2 === 0 ? 'bg-[red]' : 'bg-[pink]'
//                     }`}
//                     style={{
//                         // transitionDelay: `${index * 200}ms`, // Aumenta el delay para crear el efecto cascada
//                     }}
//                 >
//                     {index + 1}
//                 </div>
//             ))}
//         </div>
//     );
// }
