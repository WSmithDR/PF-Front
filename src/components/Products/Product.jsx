import { useDispatch, } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addToCart } from '../../redux/actions';

const Product = ({ price, img, name, _id, description, sales }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: _id,
      title: name,
      price: price,
      image: img,
      description: description,
      quantity: 1,
    }));
    
    Swal.fire({
      icon: 'success',
      title: 'Producto añadido al carro',
      showConfirmButton: false,
      timer: 1500, 
    });
  };

 return (
    <div className={'group bg-gray-950 text-white shadow duration-150 rounded-2xl  hover:scale-105 hover:shadow-md'}>
      <NavLink  to={`/detail/${_id}`}>     
        <div className='aspect-h-1 aspect-w-1 w-full rounded-tl-2xl rounded-tr-2xl overflow-hidden xl:aspect-h-8 xl:aspect-w-7 '>
          <img className='h-full p-3 w-full bg-gray-700 object-cover object-center ' src={img} alt={`${name} image`} />
        </div>
        
        <h3 className='my-4 pl-4 font-bold text-black-500'>{name}</h3>

        <div className="flex mb-3 items-center">
          <p className='ml-4 text-xl font-semibold text-gray-300'>${price}</p>
          {sales !== 0 && sales !== '' && sales !== 0 && <p className="ml-auto text-base pr-5 py-auto my-auto font-medium text-green-500">${sales} off</p>}
        </div>
      </NavLink>

      <div className="p-3 pb-5 pt-0">
        <button
          onClick={handleAddToCart}
          className="block w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans bg-gray-900 text-xs font-bold uppercase transition-all hover:bg-gray-800 hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default Product;