import { imageMap } from "../../assets/imageMap";
import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore";

function ProductCard({ product }) {
    const resolvedImage = imageMap[product.image] ?? product.image;
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addItem(product);
    };

    return (
        <div className="relative rounded-lg break-words border bg-white border-gray-200 card-product h-[360px] flex flex-col justify-between group hover:shadow-lg transition-shadow duration-300">
            <div className="flex-auto p-4 flex flex-col h-full">
                <div className="text-center relative flex justify-center mb-4 h-32">
                    <Link to={`/product/${product.id}`} className="w-full h-full flex justify-center items-center">
                       <img src={resolvedImage} alt={product.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    </Link>
                </div>
                <div className="flex flex-col gap-3 flex-grow justify-end">
                    <div className="text-gray-400 uppercase tracking-wider"><small>{product.category || "General"}</small></div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-base font-semibold truncate text-gray-900" title={product.title}>
                            <Link to={`/product/${product.id}`} className="hover:text-gold-500 transition-colors">{product.title}</Link>
                        </h3>
                        <div className="flex items-center">
                            <div className="flex flex-row gap-2 items-center">
                                <small className="text-gold-400 text-xs">
                                    ★
                                </small>
                                <div className="flex flex-row gap-1">
                                    <span className="text-gray-500 text-sm">{product.rate?.rate || 4.5}</span>
                                    <span className="text-gray-500 text-sm">({product.rate?.count || 120})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                        <div>
                            <span className="text-gray-900 font-bold text-lg">${product.price}</span>
                        </div>
                        <div>
                            <button onClick={handleAddToCart} type="button" className="btn inline-flex items-center gap-x-1 bg-gray-950 text-white hover:bg-gold-500 hover:text-gray-950 active:bg-gold-600 btn-sm transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 5l0 14" />
                                    <path d="M5 12l14 0" />
                                </svg>
                                <span>Add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;