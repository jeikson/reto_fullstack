import app from '../src/firebase/firebase.config.js';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';

const db = getFirestore(app);

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Bolso Tote Medellín",
    description: "Bolso tote de cuero genuino artesanal con costuras reforzadas y forro interior en suede. Diseño amplio con múltiples compartimentos, cierre magnético y correa ajustable. Perfecto para el día a día con un toque sofisticado.",
    price: "189.900",
    rate: 4.7,
    image: "01_item.jpg",
    category: "Bolsos"
  },
  {
    id: 2,
    title: "Morral Urbano Cuero",
    description: "Morral de cuero premium con diseño ergonómico, acolchado en la espalda y tirantes ajustables. Compartimento para laptop de hasta 14\", bolsillos laterales y cierre metálico dorado. Ideal para la mujer moderna.",
    price: "249.900",
    rate: 4.9,
    image: "02_item.jpg",
    category: "Morrales"
  },
  {
    id: 3,
    title: "Billetera Clásica Compacta",
    description: "Billetera compacta en cuero italiano con 8 ranuras para tarjetas, compartimento para billetes y monedero con cierre. Acabado minimalista con herrajes dorados y grabado sutil del logo Lumière.",
    price: "89.900",
    rate: 4.3,
    image: "03_item.jpg",
    category: "Billeteras"
  },
  {
    id: 4,
    title: "Maletín Ejecutivo Premium",
    description: "Maletín ejecutivo de piel natural con compartimento acolchado para laptop de hasta 15\". Costuras dobles, herrajes dorados, cerradura de combinación y asa reforzada. Pieza de edición limitada para la profesional exigente.",
    price: "389.900",
    rate: 4.9,
    image: "04_item.jpg",
    category: "Maletines"
  },
  {
    id: 5,
    title: "Clutch Dorado Edición Limitada",
    description: "Clutch de diseñador en cuero italiano de alta gama con herrajes dorados y forro interior de seda. Cadena desmontable para uso como bandolera. Edición limitada numerada, ideal para eventos especiales.",
    price: "459.900",
    rate: 4.8,
    image: "05_item.jpg",
    category: "Clutch"
  },
];

const MOCK_USERS = [
  { id: 1, name: "Andrés Restrepo", email: "andres.restrepo@example.com", cellphone: "3002456734", address: "Cra 50c #10-20, El Poblado, Medellín" },
  { id: 2, name: "Beatriz Álvarez", email: "beatriz.alvarez@example.com", cellphone: "3104567890", address: "Calle 10 #43-12, Laureles, Medellín" },
  { id: 3, name: "Carlos Mejía", email: "carlos.mejia@example.com", cellphone: "3209876543", address: "Circular 4 #70-15, Envigado" },
  { id: 4, name: "Daniela Ríos", email: "daniela.rios@example.com", cellphone: "3156781234", address: "Diagonal 80 #20-30, Sabaneta" },
  { id: 5, name: "Esteban Londoño", email: "esteban.londono@example.com", cellphone: "3015556677", address: "Av. Oriental #45-10, Centro, Medellín" },
  { id: 6, name: "Fernanda Ochoa", email: "fernanda.ochoa@example.com", cellphone: "3124443322", address: "Transversal 39 #12-05, Belén, Medellín" },
  { id: 7, name: "Gabriel Salazar", email: "gabriel.salazar@example.com", cellphone: "3182221100", address: "Calle 50 #80-45, Itagüí" },
  { id: 8, name: "Helena Montoya", email: "helena.montoya@example.com", cellphone: "3213334455", address: "Carrera 70 #32-18, Florida Nueva, Medellín" },
  { id: 9, name: "Iván Guerrero", email: "ivan.guerrero@example.com", cellphone: "3049998877", address: "Calle 33 #65-22, Estadio, Medellín" },
  { id: 10, name: "Juliana Arango", email: "juliana.arango@example.com", cellphone: "3117770099", address: "Circular 1 #75-40, Laureles, Medellín" }
];

async function seed() {
  console.log('🌱 Iniciando seed de Lumière Store...\n');

  // Seed Products
  const productsRef = collection(db, 'products');
  try {
    for (const product of MOCK_PRODUCTS) {
      const docRef = doc(productsRef, product.id.toString());
      await setDoc(docRef, product);
      console.log(`  ✅ Producto: ${product.title} — $${product.price}`);
    }
    console.log(`\n📦 ${MOCK_PRODUCTS.length} productos cargados.\n`);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }

  // Seed Users
  const usersRef = collection(db, 'users');
  try {
    for (const user of MOCK_USERS) {
      const docRef = doc(usersRef, user.id.toString());
      await setDoc(docRef, { ...user, createdAt: new Date() });
      console.log(`  ✅ Usuario: ${user.name} (${user.email})`);
    }
    console.log(`\n👤 ${MOCK_USERS.length} usuarios cargados.\n`);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }

  console.log('🎉 Seed completado exitosamente.');
  process.exit(0);
}

seed();
