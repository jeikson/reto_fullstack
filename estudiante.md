
# 📦 Proyecto: Lumière — Concept Store E-commerce

## 🎓 Entrega Final — Desarrollo Full Stack  
💻 Universidad Pontificia Bolivariana — Medellín, 2026

---

## 👤 Información del Estudiante

- **Nombre:** Jeikson Gómez  
- **Correo:** jeikson.gomez@upb.edu.co  
- **Repositorio:** https://github.com/jeikson/reto_fullstack  
- **Deploy:** https://jeikson.github.io/reto_fullstack/

---

## 🎯 Objetivo

Desarrollar una aplicación web fullstack tipo e-commerce con React, implementando autenticación, galería de productos, carrito de compras, gestión de pedidos y despliegue en producción.

---

## 🧪 Funcionalidades Implementadas

| # | Funcionalidad | Estado | Detalle |
|---|--------------|--------|---------|
| 1 | Registro de usuarios | ✅ | Firebase Auth con email/password |
| 2 | Login y sesión persistente | ✅ | Detección automática de estado de autenticación |
| 3 | Galería de productos | ✅ | Grid responsivo con datos de Firestore |
| 4 | Búsqueda en tiempo real | ✅ | Filtrado mientras el usuario escribe |
| 5 | Detalle de producto | ✅ | Vista individual con rating, descripción y selector de cantidad |
| 6 | Carrito de compras | ✅ | Agregar, modificar cantidad, eliminar. Persistencia con Zustand + localStorage |
| 7 | Checkout y pago | ✅ | Formulario de facturación con procesamiento simulado |
| 8 | Gestión de pedidos | ✅ | Pedidos guardados en Firestore. Visibles y cancelables desde el perfil |
| 9 | Perfil de usuario | ✅ | Tabs: Mis Pedidos + Información de la Cuenta |
| 10 | Página Nosotros | ✅ | Propuesta de valor, misión y CTA |
| 11 | Diseño responsivo | ✅ | Mobile, tablet y desktop |
| 12 | Deploy en producción | ✅ | GitHub Pages con HashRouter |

---

## ⚙️ Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| UI Framework | React | 19 |
| Build Tool | Vite | 8 |
| Estilos | Tailwind CSS | 4 |
| Estado | Zustand | 5 |
| Routing | React Router DOM | 7 |
| HTTP Client | Axios | 1.15 |
| Auth | Firebase Authentication | 12 |
| Database | Cloud Firestore | 12 |
| Deploy | GitHub Pages + gh-pages | — |

---

## 📐 Patrón de Diseño: Atomic Design

```
src/components/
├── atoms/          → Componentes base (Button, Input)
├── molecules/      → Componentes compuestos (ProductCard)
├── organisms/      → Módulos complejos (NavBar, Gallery, Checkout...)
└── templates/      → Layouts (NavBar + Outlet + Footer)
```

---

## 🎨 Identidad Visual

- **Marca:** Lumière — Concept Store
- **Paleta:** Negro (`#030712`) + Dorado (`#D4AF37`) + Blanco
- **Tipografía:** Playfair Display (títulos) + Inter (cuerpo)
- **Estilo:** Lujo minimalista, dark header con acentos dorados

---

## 🗃️ Colecciones en Firestore

| Colección | Descripción |
|-----------|-------------|
| `products` | Catálogo de productos (title, price, rate, image, category) |
| `users` | Datos extendidos de usuario (name, email, address, cellphone) |
| `orders` | Pedidos con items, total, status y timestamp |

---

## 📚 Recursos Utilizados

- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- Zustand: https://zustand.docs.pmnd.rs/
- Firebase: https://firebase.google.com/docs
- Vite: https://vite.dev/
- Atomic Design: https://bradfrost.com/blog/post/atomic-web-design/
- Axios: https://axios-http.com/

---

## 📄 Licencia

Proyecto de uso educativo — Curso de Desarrollo Full Stack, UPB 2026.