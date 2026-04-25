import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from "./components/templates/Layout"
import Home from "./components/organisms/home/Home"
import Gallery from "./components/organisms/gallery/Gallery"
import Login from "./components/organisms/login/Login"
import Register from "./components/organisms/register/Register"
import Profile from "./components/organisms/profile/Profile"
import ProductDetail from "./components/organisms/productDetail/ProductDetail"
import Cart from "./components/organisms/cart/Cart"
import Checkout from "./components/organisms/checkout/Checkout"
import About from "./components/organisms/about/About"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
