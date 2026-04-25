import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useCartStore from '../../../store/cartStore';
import { createOrder } from '../../../firebase/orders';
import { subscribeToAuthChanges } from '../../../firebase/auth';

export default function Checkout() {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (items.length === 0 && !isSuccess) {
            navigate('/gallery');
        }
    }, [items, navigate, isSuccess]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simular delay de procesamiento de pago
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Guardar pedido en Firebase
        if (user) {
            const result = await createOrder(
                user.uid,
                user.email,
                items,
                getTotalPrice()
            );
            if (result.success) {
                setOrderId(result.orderId);
            }
        }

        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 font-display">¡Pago Exitoso!</h1>
                <p className="text-lg text-gray-600 mb-2">
                    Tu pedido ha sido procesado correctamente.
                </p>
                {orderId && (
                    <p className="text-sm text-gray-400 mb-8">
                        Nº de Pedido: <span className="font-mono text-gold-500">{orderId.slice(0, 8).toUpperCase()}</span>
                    </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/profile"
                        className="inline-block px-8 py-3 bg-gold-400 text-gray-950 font-medium rounded-lg hover:bg-gold-500 transition-all"
                    >
                        Ver Mis Pedidos
                    </Link>
                    <Link
                        to="/gallery"
                        className="inline-block px-8 py-3 bg-gray-950 text-white font-medium rounded-lg hover:bg-gray-800 transition-all"
                    >
                        Seguir Comprando
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 font-display">FINALIZAR COMPRA</h1>

            {!user && (
                <div className="mb-6 p-4 bg-gold-50 border border-gold-200 rounded-lg text-sm text-gray-700">
                    <strong>Nota:</strong> <Link to="/login" className="text-gold-500 underline">Inicia sesión</Link> para guardar tu pedido y poder rastrearlo desde tu perfil.
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Formulario de envío y pago */}
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 font-display">Datos de Facturación y Envío</h2>
                        
                        <form onSubmit={handlePayment} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-400 outline-none" placeholder="Juan Pérez" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico *</label>
                                    <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-400 outline-none" placeholder="juan@ejemplo.com" defaultValue={user?.email || ''} />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección de envío *</label>
                                <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-400 outline-none" placeholder="Av. Principal 123" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad *</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-400 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">País *</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-400 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal *</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-400 outline-none" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 pt-6 font-display">Método de Pago</h2>
                            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 flex items-center gap-4">
                                <input type="radio" id="tarjeta" name="metodo_pago" className="w-5 h-5 text-gold-500 focus:ring-gold-400" defaultChecked />
                                <label htmlFor="tarjeta" className="font-medium text-gray-700">Tarjeta de Crédito / Débito (Simulado)</label>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full mt-8 py-4 font-bold text-lg rounded-xl transition-all ${
                                    isProcessing 
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : 'bg-gray-950 text-white hover:bg-gold-500 hover:text-gray-950 hover:shadow-lg hover:-translate-y-1'
                                }`}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                        Procesando pago...
                                    </span>
                                ) : `Pagar $${getTotalPrice().toFixed(2)}`}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Resumen del Pedido */}
                <div className="lg:w-1/3">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Resumen del Pedido</h2>
                        
                        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                            {items.map(item => (
                                <div key={item.product.id} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 truncate pr-4">{item.quantity}x {item.product.title}</span>
                                    <span className="font-medium text-gray-900">${(item.quantity * item.product.price).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-gray-200">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${getTotalPrice().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Envío</span>
                                <span>Gratis</span>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total a Pagar</span>
                                    <span className="text-2xl font-extrabold text-gold-500">
                                        ${getTotalPrice().toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
