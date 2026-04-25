import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useCartStore from '../../../store/cartStore';

export default function Checkout() {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (items.length === 0 && !isSuccess) {
            navigate('/gallery');
        }
    }, [items, navigate, isSuccess]);

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simular un procesamiento de pago de 2 segundos
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Pago Exitoso!</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Tu pedido ha sido procesado correctamente. Recibirás un correo con los detalles en breve.
                </p>
                <Link
                    to="/gallery"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Formulario de envío y pago */}
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Datos de Facturación y Envío</h2>
                        
                        <form onSubmit={handlePayment} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Juan Pérez" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico *</label>
                                    <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="juan@ejemplo.com" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección de envío *</label>
                                <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Av. Principal 123" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad *</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">País *</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal *</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 pt-6">Método de Pago</h2>
                            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 flex items-center gap-4">
                                <input type="radio" id="tarjeta" name="metodo_pago" className="w-5 h-5 text-purple-600 focus:ring-purple-500" defaultChecked />
                                <label htmlFor="tarjeta" className="font-medium text-gray-700">Tarjeta de Crédito / Débito (Simulado)</label>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full mt-8 py-4 font-bold text-lg text-white rounded-xl transition-all ${
                                    isProcessing 
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:shadow-lg hover:-translate-y-1'
                                }`}
                            >
                                {isProcessing ? 'Procesando pago...' : `Pagar $${getTotalPrice().toFixed(2)}`}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Resumen del Pedido */}
                <div className="lg:w-1/3">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
                        
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
                                    <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
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
