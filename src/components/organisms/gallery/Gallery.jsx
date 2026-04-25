import { useState, useEffect, useMemo } from "react";
import ProductCard from "../../molecules/ProductCard";
import { getProducts } from "../../../firebase/products";

/* REFERENCIA: lógica original con mockdata
import MOCK_PRODUCTS from "../../../mockdata/mock_products";
export function GalleryMock() {
    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold mb-6">Nuestros Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {MOCK_PRODUCTS.map((producto) => (
                    <ProductCard key={producto.id} product={producto} />
                ))}
            </div>
        </section>
    );
}
*/

export default function Gallery() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    // Derived states
    const categories = useMemo(() => {
        const uniqueCategories = new Set(products.map(p => p.category).filter(Boolean));
        return ["all", ...Array.from(uniqueCategories)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-bold text-gray-900">Encuentra lo que buscas</h2>
                
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none w-full sm:w-64 transition-all"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white min-w-[150px] capitalize"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category === "all" ? "Todas las categorías" : category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Grid Layout Responsivo */}
            {paginatedProducts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mb-10">
                        {paginatedProducts.map((producto) => (
                            <ProductCard key={producto.id} product={producto} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    currentPage === 1
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                }`}
                            >
                                Anterior
                            </button>
                            <span className="text-gray-600 font-medium">
                                Página {currentPage} de {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    currentPage === totalPages
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                }`}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">No se encontraron productos con esos filtros.</p>
                </div>
            )}
        </section>
    );
}