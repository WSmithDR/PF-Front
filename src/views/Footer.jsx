import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <footer className="bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
              <p className="font-semibold text-gray-800 dark:text-white">Acceso rapido</p>

              <div className="mt-5 flex flex-col items-start space-y-2">
                <NavLink style={{color: "white"}} to={'/home'} className="text-white transition-colors duration-300 hover:underline dark:text-gray-300 dark:hover:text-blue-400">Inicio</NavLink>
                <NavLink style={{color: "white"}} to={'/about'} className=" transition-colors duration-300 hover:underline dark:text-gray-300 dark:hover:text-blue-400">Quienes somos</NavLink>
              </div>
          </div>

          <div>
              <p className="font-semibold text-gray-800 dark:text-white">Contactanos</p>

              <div className="mt-5 flex flex-col items-start space-y-2">
              <p className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400">(333) 221-4444</p>
              <p  className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400">electronicecommercepf@gmail.com</p>
              </div>
          </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700 md:my-10" />

          <div className="flex flex-col items-center justify-between sm:flex-row">
          <a href="#" className="text-2xl font-bold text-gray-800 transition-colors duration-300 hover:text-gray-700 dark:text-white dark:hover:text-gray-300">Elitronic</a>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-300 sm:mt-0">© Copyright 2023. Todos los derechos reservados.</p>
          </div>
      </div>
    </footer>
  )
}

export default Footer
