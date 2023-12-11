import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions'


const PurchaseCard = ({ brand, category, price, name, img, purchaseDate, _id, cart, quantity }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeFromCart(_id));
  }

  return (
    <tr className="bg-gray-800 rounded-md">
      { cart !== true &&
        <td className="p-3">
          <NavLink to={`/detail/${_id}`} className="flex items-center">
            <img className="rounded-full h-12 w-12 object-cover" src={img} alt={`Imagen de ${name}`} />
            <div className="ml-5">
              <div className="text-gray-50 w-40 truncate text-lg font-semibold">{name}</div>
            </div>
          </NavLink>
        </td>
      }
      { cart !== true &&
        <td className="p-3">
          {category}
        </td>
      }
      { cart !== true &&
        <td className="p-3 font-bold">
          {price}
        </td>
      }
      { cart !== true &&
        <td className="p-3">
          <span className="text-gray-300 rounded-md px-2">{brand}</span>
        </td>
      }
      { cart !== true &&
        <td className="p-3">
          {purchaseDate}
        </td>
      }


      {/* Para carrito */}
      { cart === true &&
        <td className='p-3'>
          <NavLink to={`/detail/${_id}`} className="flex items-center">
            <img className="rounded-full h-12 w-12 object-cover" src={img} alt={`Imagen de ${name}`} />
            <div className="ml-5">
              <div className="text-gray-50 w-40 truncate text-lg font-semibold">{name}</div>
            </div>
          </NavLink>
        </td>
      }

      { cart === true &&
        <td className='p-3 text-white'>
          {quantity}
        </td>
      }

      { cart === true &&
        <td className='p-3 text-white'>
          {price}
        </td>
      }

      { cart === true &&
        <td className='p-3'>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
            Eliminar
          </button>
        </td>
      }

    </tr>
  );
};

export default PurchaseCard;

//CAMBIAR EL MODELO DE PURCHASES PARA QUE TENGA UNA REFERENCIA A LA FECHA DE COMPRA