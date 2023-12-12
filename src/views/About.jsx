const About = () => {
  return (
    <div>
      <section className="py-10 bg-stone-100 font-poppins dark:bg-gray-800">
        <div className=" py-4">
          <div className="flex flex-wrap">
            <div className=" mb-10 lg:w-2/4 lg:mb-0">
              <div className="">
                <div className="px-4 pl-4 mb-6 border-l-4 border-blue-500">
                  <span className="text-sm text-gray-600 uppercase dark:text-gray-400">Quienes somos??</span>
                  <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                    Sobre nosotros
                  </h1>
                </div>
                <p className="px-4 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                  Tu destino para la última electrónica. Explora dispositivos vanguardistas con estilo. ¡Únete a nosotros en la vanguardia de la innovación!
                </p>

                <div className="flex pt-5 flex-wrap items-center">
                  <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                    <div className="p-6 bg-white dark:bg-gray-900">
                      <span className="text-blue-500 dark:text-blue-400">
                      <svg className="bi bi-people-fill w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                      </svg>
                      </span>
                      <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">+100</p>
                      <h2 className="text-sm text-gray-700 dark:text-gray-400">Productos</h2>
                    </div>
                  </div>
                  <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                    <div className="p-6 bg-white dark:bg-gray-900">
                      <span className="text-blue-500 dark:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-people-fill w-10 h-10" fill="currentColor"  viewBox="0 0 16 16">
                          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                          <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                        </svg>
                      </span>
                      <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">+50
                      </p>
                      <h2 className="text-sm text-gray-700 dark:text-gray-400">Usuarios</h2>
                    </div>
                  </div>
                  <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                    <div className="p-6 bg-white dark:bg-gray-900">
                      <span className="text-blue-500 dark:text-blue-400">
                        <svg className="w-10 h-10 bi bi-alarm-fill" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                          <path d="M13.383.076a1 1 0 0 0-1.09.217L11 1.586 9.707.293a1 1 0 0 0-1.414 0L7 1.586 5.707.293a1 1 0 0 0-1.414 0L3 1.586 1.707.293A1 1 0 0 0 0 1v18a1 1 0 0 0 1.707.707L3 18.414l1.293 1.293a1 1 0 0 0 1.414 0L7 18.414l1.293 1.293a1 1 0 0 0 1.414 0L11 18.414l1.293 1.293A1 1 0 0 0 14 19V1a1 1 0 0 0-.617-.924ZM10 15H4a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0-4H4a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2Zm0-4H4a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
                        </svg>
                      </span>
                      <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">+74
                      </p>
                      <h2 className="text-sm text-gray-700 dark:text-gray-400">Ventas</h2>
                    </div>
                  </div>
                  <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                    <div className="p-6 bg-white dark:bg-gray-900">
                      <span className="text-blue-500 dark:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-10 h-10 bi bi-alarm-fill" viewBox="0 0 16 16">
                          <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
                        </svg>
                      </span>
                      <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">100%
                      </p>
                      <h2 className="text-sm text-gray-700 dark:text-gray-400">Velocidad</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-screen px-4 mb-10 lg:w-1/2 lg:mb-0">
              <img 
                src="https://i.postimg.cc/9MW8G96J/pexels-the-coach-space-2977565.jpg" 
                alt=""
                className="object-cover w-full h-full rounded"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="py-10 bg-stone-100 text-white font-poppins dark:bg-gray-900">
        <h2 class="font-bold pl-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            ¿Por qué elegirnos?
        </h2>

        <div class="flex flex-wrap items-center mt-20 text-left text-center">
            <div class="w-full md:w-3/5 lg:w-1/2 px-4">
                <img src="https://img.freepik.com/foto-gratis/manos-primer-plano-obteniendo-caja_23-2148767157.jpg?w=900&t=st=1702355074~exp=1702355674~hmac=7c87ea7c231d564fcdb91dee104b95a4a407840bff8612b698a6d6cfe30ee5d0" alt="gem" class="inline-block rounded shadow-lg h-96 border border-merino-400"/>
            </div>
            <div class="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
                <h3 class="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                  Envío gratis a nivel mundial                
                </h3>
                <p class="sm:text-lg mt-6">
                  Con nosotros, disfrutarás de envío gratuito a cualquier parte del mundo. Nos preocupamos por tu comodidad,
                  por eso, al elegirnos, te beneficias de la conveniencia de recibir tus productos favoritos sin costo adicional.
                </p>
            </div>
        </div>

        <div class="flex flex-wrap items-center mt-20 text-left text-center">
            <div class="w-full md:w-3/5 lg:w-1/2 px-4">
                <img src="https://img.freepik.com/foto-gratis/mujer-jugando-portatil-mantenga-tarjeta-credito_1150-22875.jpg?w=996&t=st=1702355326~exp=1702355926~hmac=9d5e2ad414c91724785841c57885e354d12ad4ebe46ee3c3e901b476fa9cfe5e" alt="project members" class="inline-block h-96 rounded shadow-lg border border-merino-400"/>
            </div>
            <div class="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12">
              <h3 class="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                Facilidad de compra
            </h3>
            <p class="sm:text-lg mt-6">
                Nuestro sitio web está diseñado para que puedas encontrar fácilmente lo que buscas. Con una interfaz de usuario
                intuitiva, podrás navegar por nuestro catálogo y encontrar tus productos favoritos en segundos.
            </p>
            </div>
        </div>

        <div class="flex flex-wrap items-center mt-20 text-left  text-center">
          <div class="w-full md:w-3/5 lg:w-1/2 px-4">
              <img src="https://img.freepik.com/foto-gratis/concepto-collage-control-calidad-estandar_23-2149595839.jpg?w=826&t=st=1702355632~exp=1702356232~hmac=072eda9ca9e01bd91e128c7abfeda347917f3a83c6e839bca5c84ef993fcc062" alt="editor" class="h-96 inline-block rounded shadow-lg border border-merino-400"/>
          </div>
          <div class="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
              <h3 class="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                Calidad de producto              
              </h3>
              <p class="sm:text-lg mt-6">
                Nos preocupamos por la calidad de nuestros productos. Por eso, solo trabajamos con los mejores proveedores
                para garantizar que nuestros clientes reciban productos de la más alta calidad.
              </p>
          </div>
        </div>

      </section>
    </div>
  )
}

export default About;