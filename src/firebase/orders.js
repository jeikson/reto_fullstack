import app from "./firebase.config.js";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore(app);

/**
 * Crea un nuevo pedido en Firestore
 */
export const createOrder = async (userId, userEmail, items, total) => {
    try {
        const orderData = {
            userId,
            userEmail,
            items: items.map(item => ({
                productId: item.product.id,
                title: item.product.title,
                price: parseFloat(item.product.price),
                quantity: item.quantity,
                image: item.product.image
            })),
            total: parseFloat(total.toFixed(2)),
            status: "pendiente",
            createdAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, "orders"), orderData);
        return { success: true, orderId: docRef.id };
    } catch (error) {
        console.error("Error creando pedido:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Obtiene todos los pedidos de un usuario
 */
export const getOrdersByUser = async (userId) => {
    try {
        const q = query(
            collection(db, "orders"),
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convertir Timestamp de Firestore a Date legible
            createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));
        // Ordenar por fecha (más reciente primero) del lado del cliente
        return orders.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
        console.error("Error obteniendo pedidos:", error);
        return [];
    }
};

/**
 * Actualiza el estado de un pedido
 */
export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, { status: newStatus });
        return { success: true };
    } catch (error) {
        console.error("Error actualizando pedido:", error);
        return { success: false, error: error.message };
    }
};
