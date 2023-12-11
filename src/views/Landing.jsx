import { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postMessage } from "../redux/actions";
import AuthModal from "../components/AuthModal";
import { Button } from "antd";
import wagner from "../assets/images/wagner.jpg";

const Landing = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const [message, setMessage] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setMessage({
      ...message,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(postMessage(message));

    setMessage({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  };

  const isUserLoggedIn = !!localStorage.getItem("token");

  const toHome = () => {
    navigate('/home');
  }

  return (
    <div>
      <main>

        <section className="bg-white dark:bg-gray-900">
          { !isUserLoggedIn &&
            <div className="flex items-center justify-between">
              <Button
                onClick={showModal}
                style={{ borderBottom: "1px solid white", borderRadius: "0" }}
                className="font-pop-light text-white bg-transparent border-none pb-5 text-2xl navbutton ml-auto m-5"
              >
                Acceder
              </Button>
            </div>
          }

          <div className="container mx-auto px-6 py-16 text-center">
            <div className="mx-auto max-w-lg">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white lg:text-4xl">Compra y venta de electrónicos de primera</h1>
              <p className="mt-6 text-gray-500 dark:text-gray-300">Facilitamos la experiencia de transacciones electrónicas para que comprar y vender electrónicos sea más sencillo que nunca.</p>
              <NavLink to={'/home'}>
                <button className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-center text-sm font-medium capitalize leading-5 text-white hover:bg-blue-500 focus:outline-none lg:mx-0 lg:w-auto">Explorar Electrónicos</button>
              </NavLink>

            </div>
            <div className="mt-10 flex justify-center">
              <img className="h-96 w-full rounded-xl object-cover" src="https://pcstore.com.uy/wp-content/uploads/slider/cache/30fd4e3092cf5a3a8c739cc5c984c53e/pcgamerbanner-scaled.webp" />
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 py-10">
              <h1 className="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">Beneficios</h1>

              <p className="mt-4 text-center text-gray-500 dark:text-gray-300">Compra y vende electrónicos fácilmente con nosotros. ¡Descúbre porque!</p>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
                <div>
                    <img className="h-96 w-full rounded-lg object-cover" src="https://img.freepik.com/vector-gratis/importacion-exportacion-dibujados-mano-camion_23-2149160485.jpg?w=740&t=st=1701750744~exp=1701751344~hmac=d64ae478fece2ef2b1d280aee01388a5762ddea90a933d1ba81d65f8111fc19f" alt="" />
                    <h2 className="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-white">Envios a todo el mundo</h2>
                    <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-blue-400">GRATIS!</p>
                </div>

                <div>
                    <img className="h-96 w-full rounded-lg object-cover" src="https://img.freepik.com/vector-gratis/comercio-internacional-dibujado-mano-efectivo_23-2149160479.jpg?w=740&t=st=1701751096~exp=1701751696~hmac=a24d7876ecfacbf5e1514b5ce1ae087b502e62037e070665a39d7d5062362aad" alt="" />
                    <h2 className="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-white">Los mejores precios</h2>
                    <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-blue-400">Favorito de muchas personas</p>
                </div>

                <div>
                    <img className="h-96 w-full rounded-lg object-cover" src="https://img.freepik.com/vector-gratis/ilustracion-concepto-calidad-producto_114360-7301.jpg?w=740&t=st=1701750692~exp=1701751292~hmac=cfba0f0ac60c5d1b653e716974b9164126b7b2a2e54e205c8c6fa4af0bde3646" alt="" />
                    <h2 className="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-white">La mejor calidad</h2>
                    <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-blue-400">Verificados mundialmente</p>
                </div>
              </div>
          </div>
        </section>

      <section className="bg-white dark:bg-gray-900">
      <div className="h-[32rem] bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-6 py-10">
          <h1 className="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">El equipo de desarrollo</h1>

          <div className="mx-auto mt-6 flex justify-center">
              <span className="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
              <span className="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
              <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
          </div>

          <p className="mx-auto mt-6 mb-10 max-w-2xl text-center text-gray-500 dark:text-gray-300">Conoce a nuestro equipo de desarrollo. Creando tu experiencia de compra perfecta.</p>
          </div>
      </div>

      <div className="container mx-auto mt-70 px-6 py-10 sm:-mt-80 md:-mt-96">
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-16 xl:grid-cols-3">
          <div className="flex flex-col items-center rounded-xl border p-4 dark:border-gray-700 sm:p-6">
              <img className="aspect-square w-full rounded-xl object-cover" src={wagner} alt="" />

              <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 dark:text-white">Wagner Dueñas</h1>

              <p className="mt-2 capitalize text-gray-500 dark:text-gray-300">Desarrollador web full stack</p>

              <div className="-mx-2 mt-3 flex">
                <a href="https://www.linkedin.com/in/wsmith123/" target="_blank" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Facebook">
                  <FaLinkedin className='text-4xl'/>
                </a>

                <a href="https://github.com/JavonMagistral" target="_blank" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Github">
                  <FaGithub className='text-4xl'/>
                </a>
              </div>
          </div>

            <div className="flex flex-col items-center rounded-xl border p-4 dark:border-gray-700 sm:p-6">
                <img className="aspect-square w-full rounded-xl object-cover" src="https://media.licdn.com/dms/image/D4D03AQEQSHpyB0B6XA/profile-displayphoto-shrink_800_800/0/1701752410452?e=1707350400&v=beta&t=sCvzMeu5dM9Qlsl4wbKN5Mx2lBD28TxUykgQfHD72Eo" alt="" />

                <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 dark:text-white">Elias Martinez</h1>

                <p className="mt-2 capitalize text-gray-500 dark:text-gray-300">Desarrollador web full stack</p>

                <div className="-mx-2 mt-3 flex">
                  <a href="https://www.linkedin.com/in/elias-martinez-040980246/" target="_blank" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Facebook">
                    <FaLinkedin className='text-4xl'/>
                  </a>

                  <a href="https://github.com/XliazZz" target="_blank" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Github">
                    <FaGithub className='text-4xl'/>
                  </a>
                </div>
            </div>

            <div className="flex flex-col items-center rounded-xl border p-4 dark:border-gray-700 sm:p-6">
                <img className="aspect-square w-full rounded-xl object-cover" src="https://media.licdn.com/dms/image/D4E03AQEottAuMqRYYQ/profile-displayphoto-shrink_800_800/0/1695405963437?e=1707350400&v=beta&t=GCgCQrSaIBoCgz-gg0dGF5c81PN-Cetaorlsszc4o3U" alt="" />

                <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 dark:text-white">Juan Rodriguez</h1>

                <p className="mt-2 capitalize text-gray-500 dark:text-gray-300">Desarrollador web full stack</p>

                <div className="-mx-2 mt-3 flex">
                  <a href="https://www.linkedin.com/in/juan-manuel-rodriguez-hurtado-87b531164/" target="_blank" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Facebook">
                    <FaLinkedin className='text-4xl'/>
                  </a>

                  <a href="https://github.com/JMRodriguezHurtado" target="_blank" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Github">
                    <FaGithub className='text-4xl'/>
                  </a>
                </div>
            </div>
          </div>
      </div>
      </section>

      <section className="bg-white dark:bg-gray-900 pb-10 pt-5">
        <div className="max-w-screen-xl mx-auto px-5 min-h-sceen">
          <div className="flex flex-col items-center ">
            <h2 className="font-bold text-3xl mt-5 tracking-tight text-white">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-5">
            <div className="py-5 bg-gray-800 rounded-tl-xl rounded-tr-xl">
                <details className="group ">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className='text-white pl-1'>¿Ofrecen envío gratuito en todo el mundo?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <p className="text-sky-400 mt-3 group-open:animate-fadeIn pl-1">
                        Sí, ofrecemos envío gratuito a nivel mundial para todos nuestros productos.
                    </p>
                </details>
            </div>

            <div className="py-5 bg-gray-800">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className='text-white pl-1'>¿Se puede pagar con Mercado Pago?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <p className="text-sky-400 mt-3 group-open:animate-fadeIn pl-1">
                        Sí, aceptamos pagos a través de Mercado Pago para brindarte una opción segura y conveniente.
                    </p>
                </details>
            </div>

            <div className="py-5 bg-gray-800">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className='text-white pl-1'>¿Puedo vender y comprar productos en la plataforma?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <p className="text-sky-400 mt-3 group-open:animate-fadeIn pl-1">
                        Sí, nuestra plataforma permite tanto la venta como la compra de productos electrónicos de todo tipo, desde mousepads hasta monitores.
                    </p>
                </details>
            </div>

            <div className="py-5 bg-gray-800">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className='text-white pl-1'>¿Puedo registrarme con Google o manualmente?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <p className="text-sky-400 mt-3 group-open:animate-fadeIn pl-1">
                        Sí, ofrecemos opciones de registro tanto con Google como manualmente para adaptarnos a tus preferencias.
                    </p>
                </details>
            </div>

            <div className="py-5 bg-gray-800">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className='text-white pl-1'>¿Qué tipo de productos electrónicos tienen?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <p className="text-sky-400 mt-3 group-open:animate-fadeIn pl-1">
                        Tenemos una amplia variedad de productos electrónicos, desde mousepads hasta monitores de alta calidad.
                    </p>
                </details>
            </div>

            <div className="py-5 bg-gray-800 rounded-bl-xl rounded-br-xl">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className='text-white pl-1'>¿Ofrecen los mejores precios tanto para vendedores como para compradores?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <p className="text-sky-400 mt-3 group-open:animate-fadeIn pl-1">
                        Sí,los mejores precios tanto para nuestros vendedores y compradores.
                    </p>
                </details>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-gradient-to-r from-blue-600 via-blue-800 to-blue-900 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto flex min-h-screen flex-col px-6 py-12">
          <div className="flex-1 lg:-mx-6 lg:flex lg:items-center">
          <div className="text-white lg:mx-6 lg:w-1/2">
              <h1 className="text-3xl font-semibold capitalize lg:text-5xl">Acercate a nosotros</h1>

              <p className="mt-6 max-w-xl">Pregúntanos todo y con gusto te responderemos.</p>

              <div className="mt-6 space-y-8 md:mt-8">
              <p className="-mx-2 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-2 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  <span className="mx-2 w-72 truncate text-white"> Mexico | Ecuador | Argentina </span>
              </p>

              <p className="-mx-2 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-2 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>

                  <span className="mx-2 w-72 truncate text-white">(333) 221-4444</span>
              </p>

              <p className="-mx-2 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-2 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>

                  <span className="mx-2 w-72 truncate text-white">electronicecommercepf@gmail.com</span>
              </p>
              </div>
          </div>

            <div className="mt-8 lg:mx-6 lg:w-1/2">
              <div className="mx-auto w-full overflow-hidden rounded-xl bg-white px-8 py-10 shadow-2xl dark:bg-gray-900 lg:max-w-xl">
              <h1 className="text-2xl font-medium text-gray-700 dark:text-gray-200">Contactanos</h1>

              <form onSubmit={handleSubmit} className="mt-6">
                  <div className="flex-1">
                  <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">Nombre completo</label>
                  <input 
                    value={message.name}
                    onChange={handleChange}
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Juana de Arco" 
                    className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" 
                  />
                  </div>

                  <div className="mt-6 flex-1">
                  <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">Email</label>
                  <input 
                    value={message.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    id="email"
                    placeholder="ejemplo@gmail.com" 
                    className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" 
                  />
                  </div>

                  <div className="mt-6 w-full">
                  <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">Mensaje</label>
                  <textarea 
                    value={message.message}
                    onChange={handleChange}
                    name="message"
                    id="message" 
                    className="mt-2 block h-32 w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 md:h-48" 
                    placeholder="Escribenos tu mensaje."
                  ></textarea>
                  </div>

                  <button type="submit"  className="mt-6 w-full transform rounded-md bg-blue-600 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">Enviar</button>
              </form>
              </div>
          </div>
        </div>
      </div>
      </section>
      
      <footer className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-12">
          <div className="md:-mx-3 md:flex md:items-center md:justify-between">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-800 dark:text-white md:mx-3 xl:text-4xl">Accede para poder comprar!.</h1>

            <div className="mt-6 shrink-0 md:mx-3 md:mt-0 md:w-auto" >
              <button onClick={isUserLoggedIn ? toHome : showModal} className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm text-white duration-300 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                <span  className="mx-2">Acceder</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-2 h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700 md:my-10" />

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
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400">(333) 221-4444</a>
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400">electronicecommercepf@gmail.com</a>
              </div>
          </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700 md:my-10" />

          <div className="flex flex-col items-center justify-between sm:flex-row">
          <a href="#" className="text-2xl font-bold text-gray-800 transition-colors duration-300 hover:text-gray-700 dark:text-white dark:hover:text-gray-300">Electronic Ecommerce</a>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-300 sm:mt-0">© Copyright 2023. Todos los derechos reservados.</p>
          </div>
      </div>
      </footer>
      </main>
      <AuthModal isOpen={isModalOpen} onClose={handleCancel} />
    </div>
  )
}

export default Landing