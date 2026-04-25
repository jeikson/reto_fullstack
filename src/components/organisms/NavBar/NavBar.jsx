import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subscribeToAuthChanges } from '../../../firebase/auth';
import useCartStore from '../../../store/cartStore';

export default function NavBar() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setLoggedInUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const totalItems = useCartStore((state) => state.getTotalItems());
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-gray-950 border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Left Nav Links (desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors ${isActive('/') ? 'text-gold-400' : 'text-white hover:text-gold-400'}`}>
              Inicio
            </Link>
            <Link to="/gallery" className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors ${isActive('/gallery') ? 'text-gold-400' : 'text-white hover:text-gold-400'}`}>
              Tienda
            </Link>
            <Link to="/about" className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors ${isActive('/about') ? 'text-gold-400' : 'text-white hover:text-gold-400'}`}>
              Nosotros
            </Link>
          </nav>

          {/* Logo (Center) */}
          <Link to="/" className="flex-shrink-0">
            <img src="/assets/images/logo/logo.png" alt="Lumière Store" className="h-14 w-auto brightness-125" />
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            {/* Search (Desktop) */}
            <button className="hidden lg:block text-gold-400 hover:text-gold-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
            </button>

            {/* User */}
            {loggedInUser ? (
              <Link to="/profile" className="text-gold-400 hover:text-gold-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </Link>
            ) : (
              <Link to="/login" className="text-gold-400 hover:text-gold-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="text-gold-400 hover:text-gold-300 transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-400 text-gray-950 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gold-400 hover:text-gold-300 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 py-4">
            <nav className="flex flex-col gap-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-bold uppercase tracking-wider ${isActive('/') ? 'text-gold-400' : 'text-white hover:text-gold-400'}`}>
                Inicio
              </Link>
              <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-bold uppercase tracking-wider ${isActive('/gallery') ? 'text-gold-400' : 'text-white hover:text-gold-400'}`}>
                Tienda
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-bold uppercase tracking-wider ${isActive('/about') ? 'text-gold-400' : 'text-white hover:text-gold-400'}`}>
                Nosotros
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
