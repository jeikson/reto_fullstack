import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../../../store/cartStore';
import { imageMap } from '../../../assets/imageMap';

export default function Cart() {
    const { items, addItem, removeItem, getTotalPrice, clearCart } = useCartStore();
    const navigate = useNavigate();

    const handleQuantityChange = (product, newQuantity) => {
        if (newQuantity < 1) return;
        const currentItem = items.find(item => item.product.id === product.id);
        if (currentItem) {
            const difference = newQuantity - currentItem.quantity;
            addItem(product, difference);
        }
    };

    if (items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
                <p className="text-gray-600 mb-8">Parece que aún no has agregado productos a tu carrito.</p>
                <Link
                    to="/gallery"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                    Explorar productos
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Lista de productos */}
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                            {items.map((item) => {
                                const resolvedImage = imageMap[item.product.image] ?? item.product.image;
                                return (
                                    <li key={item.product.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center">
                                        <img
                                            src={resolvedImage}
                                            alt={item.product.title}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="text-lg font-semibold text-gray-800">{item.product.title}</h3>
                                            <p className="text-purple-600 font-bold">${item.product.price}</p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => handleQuantityChange(item.product, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors bg-white font-bold"
                                                >
                                                    −
                                                </button>
                                                <span className="w-10 text-center font-semibold text-gray-900 bg-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors bg-white font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors p-2"
                                                title="Eliminar producto"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={clearCart}
                            className="text-gray-500 hover:text-red-600 font-medium transition-colors"
                        >
                            Vaciar carrito
                        </button>
                        <Link to="/gallery" className="text-purple-600 font-medium hover:text-purple-800 transition-colors">
                            Continuar comprando
                        </Link>
                    </div>
                </div>

                {/* Resumen */}
                <div className="lg:w-1/3">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen de compra</h2>
                        
                        <div className="space-y-4 mb-6">
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
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                                        ${getTotalPrice().toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all active:scale-95"
                        >
                            Proceder al Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
