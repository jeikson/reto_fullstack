import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subscribeToAuthChanges } from '../../../firebase/auth';
import useCartStore from '../../../store/cartStore';

export default function NavBar() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setLoggedInUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const totalItems = useCartStore((state) => state.getTotalItems());
  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <div className="border-b">
        <div className="bg-gray-100 py-1 hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="md:w-1/2 w-full text-center md:text-left text-sm text-gray-500">
                <span>Super Value Deals - Save more with coupons</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-5 pb-5">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap w-full items-center justify-between">
              <div className="lg:w-1/6 md:w-1/2 w-2/5">
                <Link className="navbar-brand" to="/">
                  <img src="/assets/images/logo/freshcart-logo.svg" alt="FreshCart eCommerce" />
                </Link>
              </div>
              
              <div className="lg:w-2/5 hidden lg:block">
                <form action="#">
                  <div className="relative">
                    <input
                      className="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 w-full text-base"
                      type="search" placeholder="Search for products" />
                    <button className="absolute right-0 top-0 p-3" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search text-gray-400" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              <div className="lg:w-1/5 text-end md:w-1/2 w-3/5">
                <div className="flex gap-7 items-center justify-end">
                  <div>
                    {loggedInUser ? (
                      <Link to="/profile" className="text-gray-600 flex flex-col items-center hover:text-green-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                      </Link>
                    ) : (
                      <Link to="/login" className="text-gray-600 flex flex-col items-center hover:text-green-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-login" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                           <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                           <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                           <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                  <div>
                    <Link to="/cart" className="text-gray-600 relative hover:text-green-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-bag" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                        <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                      </svg>
                      {totalItems > 0 && (
                        <span className="absolute top-0 -mt-1 left-full rounded-full h-5 w-5 -ml-3 bg-green-600 text-white text-center font-semibold text-xs flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="navbar relative lg:flex lg:flex-wrap items-center content-between text-black hidden border-t border-gray-200 py-3">
          <div className="container mx-auto px-4">
               <ul className="flex gap-6 font-medium text-gray-700">
                  <li>
                    <Link to="/" className={`hover:text-green-600 transition-colors ${isActive('/') ? 'text-green-600' : ''}`}>Home</Link>
                  </li>
                  <li>
                    <Link to="/gallery" className={`hover:text-green-600 transition-colors ${isActive('/gallery') ? 'text-green-600' : ''}`}>Shop</Link>
                  </li>
                  <li>
                    <Link to="/checkout" className={`hover:text-green-600 transition-colors ${isActive('/checkout') ? 'text-green-600' : ''}`}>Checkout</Link>
                  </li>
               </ul>
          </div>
        </nav>

      </div>
    </header>
  );
}
