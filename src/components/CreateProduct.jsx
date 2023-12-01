import { useState } from "react";
import validationCreateProduct from '../utils/Validation/validationCreateProducts';
import axios from "axios";

const CreateProduct = () => {

  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    name: '',
    brand: null,
    sale: 0,
    category: '',
    img: null,
    description: '',
    price: 0,
    quantity: 0
  });

  const categories = ["Headsets", "Microphones", "Monitors", "Mousepads", "Earbuds", "Keyboards", "Mice", "Controllers"];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct({
      ...product,
      [name]: value
    });
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationCreateProduct({ ...product, [name]: value })[name]
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
    console.log(product);
    try {
      await axios.post('http://localhost:3001/product', product, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
    } catch (error) {
      console.log(error);
    }
  };

  const isFormValid =
  product.img === null ||
  !product.name ||
  !product.brand ||
  !product.sale ||
  !product.category ||
  !product.description ||
  !product.price ||
  !product.quantity;

  return (
    <div className="p-10 mt-5 bg-gray-500">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="md:flex"
      >
        <div className="md:flex-1 p-1 bg-gray-900 rounded-lg flex items-center justify-center">
          <div className="flex w-full h-screen items-center justify-center bg-grey-lighter rounded relative">
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
                <span className="mt-2 text-base leading-normal">Select a file</span>
              </label>
            )}
          </div>
        </div>
        <div className="md:w-1/2 pl-4">
          <div className="bg-white shadow-md rounded px-8  pb-8  flex flex-col  h-screen justify-center">
            <div className="-mx-3 md:flex mb-6">


              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name"
                  type="text"
                  placeholder='Name'
                  value={product.name}
                  onChange={handleChange}
                  name="name"
                />
                {errors.name && <p className="text-red-900 text-xs italic">{errors.name}</p>}
              </div>


              <div className="md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                  Brand
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name"
                  type="text"
                  placeholder='Brand'
                  value={product.brand}
                  onChange={handleChange}
                  name="brand"
                />
                {errors.brand && <p className="text-red-900 text-xs italic">{errors.brand}</p>}
              </div>
            </div>


            <div className="-mx-3 md:flex mb-3">
              <div className="md:w-full px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
                  Description
                </label>
                <textarea
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 resize-none"
                  id="grid-password"
                  placeholder="Description"
                  value={product.description}
                  onChange={handleChange}
                  name="description"
                  style={{ height: '100px', lineHeight: '1.5' }} // Ajusta la altura y el line-height según tus necesidades
                />
                {errors.description && <p className="text-red-900 text-xs italic">{errors.description}</p>}
              </div>
            </div>


            <div className="-mx-3 md:flex mb-2">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-city">
                  Sales
                </label>
                <div >
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-city"
                    type="number"
                    placeholder='Sale'
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
                  Price
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
                  Quantity
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
                Category
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
              >
                <option value="" disabled>Select a category</option>
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

            <div className="relative mx-auto pt-10">
              <button 
                type="submit"
                disabled={isFormValid}
                className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Create
              </button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
};


export default CreateProduct;