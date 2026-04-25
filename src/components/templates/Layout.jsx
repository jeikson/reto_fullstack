import { Outlet } from 'react-router-dom';
import NavBar from '../organisms/NavBar/NavBar';
import Footer from '../organisms/footer/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
