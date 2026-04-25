<p align="center">
  <img src="public/assets/images/logo/logo.png" alt="Lumière Store" width="120" />
</p>

<h1 align="center">Lumière — Concept Store</h1>

<p align="center">
  <strong>E-commerce de moda premium y lifestyle</strong><br/>
  Medellín, Colombia 🇨🇴
</p>

<p align="center">
  <a href="https://jeikson.github.io/reto_fullstack/">🌐 Ver Demo en Vivo</a> •
  <a href="#-stack-tecnológico">Stack</a> •
  <a href="#-instalación">Instalación</a> •
  <a href="#-arquitectura">Arquitectura</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Zustand-5-brown" />
  <img src="https://img.shields.io/badge/Deploy-GitHub_Pages-222?logo=github" />
</p>

---

## 📖 Descripción

**Lumière** es una tienda online de moda femenina premium desarrollada como proyecto fullstack. Presenta una estética de lujo minimalista con paleta **dorado y negro**, interfaz completamente en español y experiencia de compra completa desde la galería de productos hasta la gestión de pedidos.

> 🔗 **Demo:** [jeikson.github.io/reto_fullstack](https://jeikson.github.io/reto_fullstack/)

---

## ✨ Funcionalidades

| Módulo | Descripción |
|--------|-------------|
| 🏠 **Landing Page** | Hero banner con imagen de campaña, nuevos ingresos, badges de confianza y testimoniales |
| 🛍️ **Galería de Productos** | Grid responsivo con búsqueda en tiempo real |
| 📦 **Detalle de Producto** | Vista individual con selector de cantidad, rating con estrellas y botón de agregar al carrito |
| 🛒 **Carrito de Compras** | Gestión completa: agregar, modificar cantidad, eliminar. Persistencia con Zustand + localStorage |
| 💳 **Checkout** | Formulario de facturación, resumen del pedido y procesamiento simulado de pago |
| 📋 **Gestión de Pedidos** | Los pedidos se guardan en Firestore. El usuario puede verlos, expandirlos y cancelarlos desde su perfil |
| 👤 **Autenticación** | Registro y login con Firebase Auth. Perfil con tabs (Pedidos / Cuenta) |
| 📄 **Página Nosotros** | Propuesta de valor, misión y CTA |
| 🔍 **Búsqueda** | Filtrado de productos en tiempo real mientras el usuario escribe |
| 📱 **Diseño Responsivo** | Mobile-first con breakpoints para tablet y desktop |

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| [React](https://react.dev/) | 19 | Librería UI con componentes funcionales y hooks |
| [Vite](https://vite.dev/) | 8 | Build tool y dev server con HMR ultrarrápido |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first CSS con paleta personalizada `gold-*` |
| [React Router DOM](https://reactrouter.com/) | 7 | Enrutamiento SPA con HashRouter para GitHub Pages |
| [Zustand](https://zustand.docs.pmnd.rs/) | 5 | Gestión de estado ligera con persistencia en localStorage |
| [Axios](https://axios-http.com/) | 1.15 | Cliente HTTP |

### Backend / Servicios
| Tecnología | Uso |
|-----------|-----|
| [Firebase Auth](https://firebase.google.com/docs/auth) | Autenticación de usuarios (email/password) |
| [Cloud Firestore](https://firebase.google.com/docs/firestore) | Base de datos NoSQL para productos, usuarios y pedidos |

### Tipografía & Diseño
| Recurso | Uso |
|---------|-----|
| [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | Fuente display para títulos (serif elegante) |
| [Inter](https://fonts.google.com/specimen/Inter) | Fuente body para contenido (sans-serif moderna) |
| Paleta Gold `#D4AF37` | Identidad de marca: botones, iconos activos, acentos |

---

## 📐 Arquitectura

El proyecto sigue el patrón **Atomic Design** para la organización de componentes:

```
reto_fullstack/
├── public/
│   └── assets/images/           # Imágenes estáticas (logo, banners)
├── scripts/
│   └── seedFirestore.js         # Script para poblar Firestore
├── src/
│   ├── assets/                  # Imágenes de productos + imageMap
│   ├── components/
│   │   ├── atoms/               # Componentes básicos (Button, Input)
│   │   ├── molecules/           # ProductCard
│   │   ├── organisms/           # NavBar, Footer, Home, Gallery, Login,
│   │   │                        # Register, Profile, Cart, Checkout,
│   │   │                        # ProductDetail, About
│   │   └── templates/           # Layout (NavBar + Outlet + Footer)
│   ├── firebase/
│   │   ├── firebase.config.js   # Configuración de Firebase
│   │   ├── auth.js              # Servicios de autenticación
│   │   ├── products.js          # CRUD de productos
│   │   └── orders.js            # Gestión de pedidos
│   ├── mockdata/
│   │   ├── mock_products.js     # Datos de ejemplo (productos)
│   │   └── mock_users.js        # Datos de ejemplo (usuarios)
│   ├── store/
│   │   └── cartStore.js         # Zustand store con persistencia
│   ├── styles/
│   │   └── main.css             # Estilos globales + variables gold-*
│   └── main.jsx                 # Entry point con rutas
├── vite.config.js
└── package.json
```

### Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Home` | Landing page con hero banner y productos destacados |
| `/gallery` | `Gallery` | Catálogo completo con búsqueda |
| `/product/:id` | `ProductDetail` | Vista detallada del producto |
| `/cart` | `Cart` | Carrito de compras |
| `/checkout` | `Checkout` | Finalizar compra y pago |
| `/profile` | `Profile` | Perfil del usuario + gestión de pedidos |
| `/login` | `Login` | Inicio de sesión |
| `/register` | `Register` | Registro de nuevo usuario |
| `/about` | `About` | Página "Nosotros" |

---

## 🚀 Instalación

### Prerrequisitos

- **Node.js** >= 18
- **npm** >= 9
- Cuenta de Firebase (las credenciales ya están configuradas)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/jeikson/reto_fullstack.git

# 2. Entrar al proyecto
cd reto_fullstack/reto_fullstack

# 3. Instalar dependencias
npm install

# 4. Poblar la base de datos con productos de ejemplo
npm run seed

# 5. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `/dist` |
| `npm run preview` | Preview del build de producción |
| `npm run seed` | Poblar Firestore con datos de ejemplo |
| `npm run deploy` | Build + deploy a GitHub Pages |

---

## 🎨 Identidad Visual

La marca **Lumière** utiliza una paleta de lujo minimalista:

| Token | Color | Uso |
|-------|-------|-----|
| `gray-950` | `#030712` | Fondos oscuros, header, footer |
| `gold-400` | `#D4AF37` | Acentos, iconos activos, CTAs |
| `gold-500` | `#C5A028` | Hover states, precios |
| `white` | `#FFFFFF` | Texto sobre fondos oscuros |
| `gray-50` | `#F9FAFB` | Fondos claros de secciones |

---

## 🔥 Firebase

### Colecciones en Firestore

| Colección | Campos | Descripción |
|-----------|--------|-------------|
| `products` | `id`, `title`, `description`, `price`, `rate`, `image`, `category` | Catálogo de productos |
| `users` | `name`, `email`, `cellphone`, `address`, `createdAt` | Datos extendidos de usuario |
| `orders` | `userId`, `userEmail`, `items[]`, `total`, `status`, `createdAt` | Pedidos realizados |

### Estados de Pedido

`pendiente` → `procesando` → `enviado` → `entregado`  
`pendiente` → `cancelado`

---

## 📱 Responsive Design

| Breakpoint | Resolución | Optimización |
|-----------|------------|-------------|
| Mobile | < 640px | Menú hamburguesa, layout de 1 columna |
| Tablet | 640px - 1024px | Grid de 2 columnas |
| Desktop | > 1024px | Grid de 3-4 columnas, nav completo |

---

## 🌐 Deploy

El proyecto está desplegado en **GitHub Pages** usando la rama `gh-pages`:

```bash
# Deploy manual
npm run deploy
```

> **Nota técnica:** Se usa `HashRouter` en lugar de `BrowserRouter` porque GitHub Pages no soporta server-side URL rewrites. Las rutas usan el formato `/#/ruta`.

---

## 👨‍💻 Autor

**Jeikson Gómez**  
Estudiante de Desarrollo Full Stack  
Universidad Pontificia Bolivariana — Medellín, Colombia

- GitHub: [@jeikson](https://github.com/jeikson)

---

## 📚 Recursos y Referencias

| Recurso | Enlace |
|---------|--------|
| React Documentation | https://react.dev/ |
| Tailwind CSS v4 | https://tailwindcss.com/ |
| Zustand | https://zustand.docs.pmnd.rs/ |
| Firebase | https://firebase.google.com/docs |
| Vite | https://vite.dev/ |
| Atomic Design | https://bradfrost.com/blog/post/atomic-web-design/ |
| Axios | https://axios-http.com/ |

---

## 📄 Licencia

Proyecto de uso educativo — Curso de Desarrollo Full Stack, UPB 2026.
