import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToAuthChanges, logoutUser } from '../../../firebase/auth';
import { getOrdersByUser, updateOrderStatus } from '../../../firebase/orders';
import { imageMap } from '../../../assets/imageMap';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('pedidos');

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Cargar pedidos cuando el usuario esté disponible
  useEffect(() => {
    if (user) {
      setOrdersLoading(true);
      getOrdersByUser(user.uid).then((data) => {
        setOrders(data);
        setOrdersLoading(false);
      });
    }
  }, [user]);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate('/login');
    }
  };

  const handleCancelOrder = async (orderId) => {
    const result = await updateOrderStatus(orderId, 'cancelado');
    if (result.success) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelado' } : o));
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pendiente: 'bg-gold-100 text-gold-700',
      procesando: 'bg-blue-100 text-blue-700',
      enviado: 'bg-green-100 text-green-700',
      entregado: 'bg-gray-200 text-gray-700',
      cancelado: 'bg-red-100 text-red-700',
    };
    const labels = {
      pendiente: 'Pendiente',
      procesando: 'Procesando',
      enviado: 'Enviado',
      entregado: 'Entregado',
      cancelado: 'Cancelado',
    };
    return (
      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${styles[status] || styles.pendiente}`}>
        {labels[status] || status}
      </span>
    );
  };

  const formatDate = (date) => {
    if (!date) return '—';
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(date instanceof Date ? date : new Date(date));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-xl text-gray-600">Inicia sesión para ver tu perfil</p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-gray-950 text-white font-medium rounded-lg hover:bg-gold-500 hover:text-gray-950 transition-all"
        >
          Ir a Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ════════════ CABECERA DEL PERFIL ════════════ */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-gray-950 via-gray-800 to-gold-400"></div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start px-6 -mt-12 pb-6">
          <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gold-100 to-gold-300 flex items-center justify-center text-3xl font-bold text-gold-700">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
          <div className="mt-4 sm:mt-14 sm:ml-6 text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-900 font-display">
              {user.displayName || 'Configura tu nombre'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          </div>
          <div className="mt-6 sm:mt-14">
            <button
              onClick={handleLogout}
              className="px-6 py-2 border-2 border-gray-950 text-gray-950 font-medium rounded-lg hover:bg-gray-950 hover:text-white transition-all"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* ════════════ TABS ════════════ */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('pedidos')}
          className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === 'pedidos'
              ? 'border-gold-400 text-gold-500'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Mis Pedidos ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('cuenta')}
          className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === 'cuenta'
              ? 'border-gold-400 text-gold-500'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Información de la Cuenta
        </button>
      </div>

      {/* ════════════ TAB: MIS PEDIDOS ════════════ */}
      {activeTab === 'pedidos' && (
        <div>
          {ordersLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold-400"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">No tienes pedidos aún</h3>
              <p className="text-gray-500 mb-6">¡Explora nuestra colección y haz tu primera compra!</p>
              <button
                onClick={() => navigate('/gallery')}
                className="px-6 py-2 bg-gray-950 text-white font-medium rounded-lg hover:bg-gold-500 hover:text-gray-950 transition-all"
              >
                Ir a la Tienda
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Order Header */}
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="w-full px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">
                          Pedido #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(order.status)}
                      <span className="font-bold text-gray-900 text-lg">${order.total.toFixed(2)}</span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Order Details (expandable) */}
                  {expandedOrder === order.id && (
                    <div className="border-t border-gray-100 px-6 py-5 bg-gray-50">
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, idx) => {
                          const resolvedImage = imageMap[item.image] ?? item.image;
                          return (
                            <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-lg">
                              <img src={resolvedImage} alt={item.title} className="w-12 h-12 object-contain rounded" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                <p className="text-xs text-gray-400">Cantidad: {item.quantity}</p>
                              </div>
                              <span className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Resumen del pedido */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                          {order.items.reduce((sum, i) => sum + i.quantity, 0)} artículo(s)
                        </div>
                        <div className="flex items-center gap-4">
                          {order.status === 'pendiente' && (
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50"
                            >
                              Cancelar Pedido
                            </button>
                          )}
                          <span className="font-bold text-lg text-gold-500">Total: ${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════ TAB: INFORMACIÓN DE LA CUENTA ════════════ */}
      {activeTab === 'cuenta' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-display">Información de la Cuenta</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">ID de Usuario</dt>
              <dd className="mt-1 text-sm text-gray-900 break-all font-mono">{user.uid}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Estado de la cuenta</dt>
              <dd className="mt-1 text-sm text-gold-500 font-medium">Activa</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Correo Electrónico</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Correo Verificado</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.emailVerified ? 'Sí' : 'No'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Total de Pedidos</dt>
              <dd className="mt-1 text-sm text-gray-900 font-bold">{orders.length} pedido(s)</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
