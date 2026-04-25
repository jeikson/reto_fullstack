import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../molecules/ProductCard";
import { getProducts } from "../../../firebase/products";

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts().then((data) => {
            // Take first 4 products as "featured"
            setFeaturedProducts(data.slice(0, 4));
            setLoading(false);
        });
    }, []);

    return (
        <div>
            {/* ═══════════════ HERO BANNER ═══════════════ */}
            <section className="relative w-full h-[100svh] md:h-[90vh] min-h-[500px] overflow-hidden bg-gray-950">
                <img
                    src={`${import.meta.env.BASE_URL}assets/images/banner/banner_prinicpal-modelo-bolso.webp`}
                    alt="Moda sin límites"
                    className="absolute inset-0 w-full h-full object-cover object-[75%_center] md:object-center opacity-85"
                />
                {/* Gradiente: de abajo a arriba en móvil, de izquierda a derecha en desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/40 to-transparent md:bg-gradient-to-r md:from-gray-950/90 md:via-gray-950/50 md:to-transparent" />
                <div className="relative container mx-auto px-6 h-full flex items-end pb-16 md:items-center md:pb-0">
                    <div className="max-w-xl">
                        <span className="inline-block text-gold-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
                            Nueva Colección 2026
                        </span>
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                            MODA SIN<br />LÍMITES
                        </h1>
                        <p className="text-gray-300 text-base md:text-lg mb-8 max-w-md">
                            La nueva colección redefine la estética urbana. Siluetas audaces, texturas crudas y actitud inquebrantable.
                        </p>
                        <Link
                            to="/gallery"
                            className="inline-flex items-center gap-3 bg-white text-gray-950 px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-gold-400 transition-all duration-300 group"
                        >
                            Explorar Colección
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════════ NUEVOS INGRESOS ═══════════════ */}
            <section className="container mx-auto px-6 py-16">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 font-display">NUEVOS INGRESOS</h2>
                    <Link to="/gallery" className="text-sm font-semibold text-gray-500 hover:text-gold-500 transition-colors uppercase tracking-wider flex items-center gap-1">
                        Ver todo
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400"></div>
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* ═══════════════ FEATURES / TRUST BADGES ═══════════════ */}
            <section className="border-y border-gray-200 bg-gray-50">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-950 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">ENVÍO GRATIS EN MEDELLÍN</h3>
                                <p className="text-sm text-gray-500">Entrega en el mismo día en zona metropolitana para pedidos antes de las 3PM.</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-950 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">PAGOS SEGUROS</h3>
                                <p className="text-sm text-gray-500">Aceptamos las principales tarjetas, transferencias bancarias y plataformas seleccionadas.</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-950 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">SIGUE TUS PEDIDOS</h3>
                                <p className="text-sm text-gray-500">Tracking en tiempo real desde el almacén hasta tu puerta con notificaciones vía SMS.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ TESTIMONIAL ═══════════════ */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6 text-center max-w-2xl">
                    <div className="text-gold-400 text-5xl font-display mb-6">"</div>
                    <blockquote className="text-xl md:text-2xl text-gray-800 font-display italic leading-relaxed mb-8">
                        Lumière Shopping es mi tienda online favorita! La selección es increíble y la calidad de las prendas supera siempre las expectativas. El empaque es una obra de arte en sí mismo.
                    </blockquote>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                        <span className="font-bold text-gray-900">Ana G.</span> — Cliente Frecuente
                    </div>
                </div>
            </section>
        </div>
    );
}
