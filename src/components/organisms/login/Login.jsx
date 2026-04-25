import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import smile from "../../../assets/smile.png";
import MOCK_USERS from "../../../mockdata/mock_users"
import { loginUser } from "../../../firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await loginUser(formData.email, formData.password);
    if (result.success) {
      navigate('/gallery');
    } else {
      setError(result.error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-sm border border-gray-100">

        {/* Header con Icono */}
        <div className="flex flex-col items-center mb-12">
          <div className="mb-4">
            <img src={smile} alt="Icono de bienvenida" className="w-[64px] h-[64px]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-display">¡Bienvenido!</h1>
          <p className="text-gray-400 text-lg">Inicia sesión en tu cuenta</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit}>

          {/* Input de Email */}
          <div className="relative group">
            <label className="block text-gray-400 text-lg mb-1 group-focus-within:text-gold-500 transition-colors">
              Correo electrónico
            </label>
            <div className="relative border-b border-gray-200 group-focus-within:border-gold-400 transition-all">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 bg-transparent focus:outline-none text-gray-700 pr-10"
                required
              />
              <span className="absolute right-0 top-2 text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Input de Password */}
          <div className="relative group">
            <label className="block text-gray-400 text-lg mb-1 group-focus-within:text-gold-500 transition-colors">
              Contraseña
            </label>
            <div className="relative border-b border-gray-200 group-focus-within:border-gold-400 transition-all">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-2 bg-transparent focus:outline-none text-gray-700 pr-10"
                required
              />
              <span className="absolute right-0 top-2 text-gray-300 cursor-pointer hover:text-gold-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Opciones */}
          <div className="flex items-center justify-between text-gray-400">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 border-gray-300 rounded focus:ring-gold-400 transition-all"
              />
              <span className="text-lg">¿Recordarme?</span>
            </label>
            <a href="#" className="text-gold-500 hover:text-gold-600 transition-colors text-lg">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            className="w-3/5 py-4 bg-gray-950 hover:bg-gold-500 hover:text-gray-950 text-white font-bold rounded-xl flex items-center justify-center space-x-3 transition-all shadow-lg shadow-gray-200 active:scale-95"
          >
            <span className="text-xl">Iniciar Sesión</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;