import { useState } from "react";
import validation from '../../utils/Validation/validationCreateProducts';
import axios from "axios";
import Swal from 'sweetalert2';

const CreateProduct = () => {

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false); 
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    sale: 0,
    category: '',
    img: null,
    description: '',
    price: 0,
    quantity: 0
  });

  const categories = [  "Audífonos", "Micrófonos", "Monitores", "Mousepads", "Auriculares", "Teclados", "Mouse", "Controles"];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct({
      ...product,
      [name]: value
    });
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validation({ ...product, [name]: value })[name]
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProduct({
      ...product,
      img: file
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post('http://localhost:3001/product', product, {
        headers: {
          'x-access-token': token,
          'Content-Type': 'multipart/form-data'
        },
      })
      setMessage(data.message);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const isFormValid =
  product.img === null ||
  !product.name ||
  !product.brand ||
  !product.category ||
  !product.description ||
  !product.price ||
  !product.quantity;

  if (message !== '') {
    setSuccess(true);
  }

  if (success) {
    Swal.fire({
      icon: 'success',
      title: 'Producto creado con éxito',
      showConfirmButton: false,
      timer: 1500
    });
    setSuccess(false);
    setMessage('');
    setProduct({
      name: '',
      brand: '',
      sale: 0,
      category: '',
      img: null,
      description: '',
      price: 0,
      quantity: 0
    })
  }

  console.log(message);
  console.log(success);

  return (
    <div className="pl-72 ml-10 pr-10 p-9 pb-10 pt-10 min-h-[80vh] bg-gray-900">        
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="md:flex h-full"
      >
        <div className="md:flex-1 mt-5 mb-5 ml-0 mr-0 bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="flex w-full  items-center justify-center bg-grey-lighter rounded relative">
            <input
              type="file"
              accept="image/*"
              name="img"
              onChange={handleImageChange}
              required
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0, 
                zIndex: 2,
                cursor: 'pointer'
              }}
            />
            {product.img ? (
              <div className="bg-gray-600 rounded-lg flex items-center justify-center">
                <img
                  src={URL.createObjectURL(product.img)}
                  alt={`${product.name} image preview`}
                />
              </div>
            ) : (
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-400">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Selecciona una imagen</span>
              </label>
            )}
          </div>
        </div>

        <div className="md:flex-1 m-5 pl-5">
          <div className="bg-white shadow-md rounded px-4 pb-0 flex flex-col h-full justify-center">
            <div className="-mx-3 md:flex pt-1 mb-3">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                  Nombre
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name"
                  type="text"
                  placeholder='Escribe tu nombre'
                  value={product.name}
                  onChange={handleChange}
                  name="name"
                />
                {errors.name && <p className="text-red-900 text-xs italic">{errors.name}</p>}
              </div>


              <div className="md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                  Marca
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name"
                  type="text"
                  placeholder='Escribe la marca'
                  value={product.brand}
                  onChange={handleChange}
                  name="brand"
                />
                {errors.brand && <p className="text-red-900 text-xs italic">{errors.brand}</p>}
              </div>
            </div>


            <div className="-mx-3 md:flex mb-2">
              <div className="md:w-full px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
                  Descripción
                </label>
                <textarea
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 resize-none"
                  id="grid-password"
                  placeholder="Escribe una descripción"
                  value={product.description}
                  onChange={handleChange}
                  name="description"
                  style={{ height: '100px', lineHeight: '1.5' }}
                />
                {errors.description && <p className="text-red-900 text-xs italic">{errors.description}</p>}
              </div>
            </div>


            <div className="-mx-3 md:flex mb-2">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-city">
                  Descuento
                </label>
                <div >
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-city"
                    type="number"
                    value={product.sale}
                    onChange={handleChange}
                    name="sale"
                    min={0}
                  />
                </div>
                  {errors.sale && <p className="text-red-900 text-xs italic">{errors.sale}</p>}
              </div>


              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-state">
                  Precio
                </label>
                <div>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="number"
                    placeholder='Price'
                    value={product.price}
                    onChange={handleChange}
                    name="price"
                    min={0}
                  />
                </div>
                  <div>
                    {errors.price && <p className="text-red-900 text-xs italic">{errors.price}</p>}
                  </div>
              </div>


              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-state">
                  Cantidad
                </label>
                <div>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="number"
                    placeholder='Quantity'
                    value={product.quantity}
                    onChange={handleChange}
                    name="quantity"
                    min={0}
                  />
                </div>
                  <div>
                    {errors.quantity && <p className="text-red-900 text-xs italic">{errors.quantity}</p>}
                  </div>
              </div>
            </div>


            <div className="relative">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="category"
              >
                Categoria
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
              >
                <option value="" disabled>Selecciona una categoria</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-900 text-xs italic">{errors.category}</p>
              )}
            </div>

            <div className="relative mx-auto pt-5 mb-4">
              <button 
                type="submit"
                disabled={isFormValid}
                className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};


export default CreateProduct;