import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsById, addToCart } from '../redux/actions';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productById = useSelector((state) => state.productById);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);

  console.log(productById);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setSelectedQuantity(newQuantity);
  };

  const isLocalImage = !productById.img?.startsWith("http");

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: productById._id,
      title: productById.name,
      price: productById.price,
      image: productById.img,
      description: productById.description,
      quantity: selectedQuantity,
    }));
    
    Swal.fire({
      icon: 'success',
      title: 'Producto añadido al carro',
      showConfirmButton: false,
      timer: 1500, 
    });
    
  };


  return (
    <div className='py-40 h.full bg-gray-300 h-screen'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div
              x-data="{ image: 1 }"
              x-cloak
              className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4"
            >
            <div
              x-show="image === 1"
              className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
            >
              <img
                src={isLocalImage ? `http://localhost:3001/${productById.img}` : productById.img}
                alt={`${productById.name} image`}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{productById.name}</h2>
            <p className="text-gray-500 text-sm">
              By <a href="#" className="text-indigo-600 hover:underline">{productById.brand}</a>
            </p>

            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-indigo-400 mr-1 mt-4">$</span>
                  <span className="font-bold text-indigo-600 text-3xl">{productById.price}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-500">{productById.description}</p>
            <p className="text-gray-900 mt-5">Max Cantidad: {productById.quantity}</p>
            <p className="text-gray-900">Categoria: {productById.category}</p>

            <div className="flex py-4 space-x-4 items-center">
              <div className="relative">
                <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-black tracking-wide font-semibold">
                  Ctd
                </div>

                <select
                  value={selectedQuantity}
                  onChange={handleQuantityChange}
                  className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-9 pr-8 h-14 flex items-end text-center pr-5 pb-0.5"
                >
                  {[...Array(productById.quantity).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                  
                </select>
              </div>


              <button type="button"
               onClick={handleAddToCart}
              className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                Añadir al carro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default Detail;