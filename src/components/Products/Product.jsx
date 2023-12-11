import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import { addToCart } from '../../redux/actions';
import { useDispatch,  } from 'react-redux';

const Product = ({ price, img, name, _id, description }) => {
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
    <div className={'group bg-blue1 shadow duration-150 rounded-xl  hover:scale-105 hover:shadow-md'}>
      <NavLink  to={`/detail/${_id}`}>     
        <div className='aspect-h-1 aspect-w-1 w-full rounded-tl-xl rounded-tr-xl overflow-hidden rounded-lg bg-blue1 xl:aspect-h-8 xl:aspect-w-7 '>
          <img className='h-full p-3 w-full object-cover object-center hover:saturate-150' src={img} alt={`${name} image`} />
        </div>
          <h3 className='my-4 pl-4 font-bold text-black-500'>{name}</h3>
            <p className='mb-4 ml-4 text-xl font-semibold text-gray-800'>${price}</p>
      </NavLink>

      <div class="p-3 pb-5 pt-0">
        <button
          onClick={handleAddToCart}
          class="block w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans bg-gray-200 text-xs font-bold uppercase  transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default Product;