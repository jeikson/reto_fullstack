import { Link } from "react-router-dom";

export default function About() {
    return (
        <div>
            {/* ═══════════════ HERO ═══════════════ */}
            <section className="relative w-full h-[50vh] min-h-[350px] overflow-hidden bg-gray-950 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 opacity-90" />
                <div className="relative text-center px-6">
                    <span className="inline-block text-gold-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
                        Conócenos
                    </span>
                    <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">NOSOTROS</h1>
                    <p className="text-gray-400 text-lg max-w-lg mx-auto">
                        Sobre Lumière Shopping
                    </p>
                </div>
            </section>

            {/* ═══════════════ NUESTRA PROPUESTA ═══════════════ */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <span className="text-gold-400 text-sm font-semibold tracking-[0.25em] uppercase">Lo que nos define</span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mt-3">Nuestra Propuesta</h2>
                    <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Card 1 */}
                    <div className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 bg-gray-950 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold-400 transition-colors">
                            <svg className="w-7 h-7 text-gold-400 group-hover:text-gray-950 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Selección Especializada</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Cada pieza pasa por un riguroso proceso de curaduría. Buscamos tendencias que destaquen tu personalidad, sin caer en modas pasajeras.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 bg-gray-950 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold-400 transition-colors">
                            <svg className="w-7 h-7 text-gold-400 group-hover:text-gray-950 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Actitud Positiva</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Creemos que vestir bien es un acto de confianza. Aquí encontrarás opciones que te impulsan a enfrentar el día con determinación y una sonrisa discreta.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 bg-gray-950 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold-400 transition-colors">
                            <svg className="w-7 h-7 text-gold-400 group-hover:text-gray-950 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Compromiso Local</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Apoyamos y colaboramos con diseñadoras y marcas de Medellín. Nuestro compromiso es realzar el talento local y ofrecer productos auténticos.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════ MODA CON PROPÓSITO ═══════════════ */}
            <section className="bg-gray-950">
                <div className="container mx-auto px-6 py-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-gold-400 text-sm font-semibold tracking-[0.25em] uppercase">Por qué elegimos este camino</span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-8">Moda con Propósito</h2>
                        <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-10"></div>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            En un mercado saturado de promesas vacías y superlativos exagerados, en <span className="text-gold-400 font-semibold">Lumière</span> adoptamos la honestidad como principio.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Queremos que tu experiencia —tanto en tienda como en línea— sea directa, clara y eficiente. Sin complicaciones innecesarias, sin letras pequeñas; solo moda con propósito.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════ ÚNETE A LUMIÈRE ═══════════════ */}
            <section className="bg-white">
                <div className="container mx-auto px-6 py-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-8">Únete a Lumière</h2>
                        <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-10"></div>
                        <p className="text-gray-600 text-lg leading-relaxed mb-10">
                            Si buscas renovar tu guardarropa con piezas que resisten el paso del tiempo y el desgaste de las modas efímeras, aquí tienes un espacio pensado para ti. Sé parte de nuestra comunidad y descubre cómo un acierto de estilo puede transformar no solo tu look, sino tu actitud. <span className="text-gold-500 font-semibold">¡Bienvenida!</span>
                        </p>
                        <Link
                            to="/gallery"
                            className="inline-flex items-center gap-3 bg-gray-950 text-white px-10 py-4 font-bold text-sm uppercase tracking-wider hover:bg-gold-400 hover:text-gray-950 transition-all duration-300 rounded-lg group"
                        >
                            Explorar Colección
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
