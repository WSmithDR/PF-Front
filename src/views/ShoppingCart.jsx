
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, finishPurchase } from '../redux/actions';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {return state.cart});
  console.log('cartItems:', cartItems);
  const navigate = useNavigate();

  const handleRemoveFromCart = (productById) => {
    dispatch(removeFromCart(productById));
  };

  const handleFinishPurchase = () => {
    
    if (cartItems.length === 0) {
      Swal.fire('No hay nada en tu carrito');
      return;
    }
    const objetoPago = cartItems.map((item) => ({
      ...item,
      unit_price: item.price,
      currency_id: 'MEX',
    }));
   
    dispatch(finishPurchase(objetoPago));
    Swal.fire('Compra completada');
    navigate('/');
  };

  return (
    <div className="text-center py-40 bg-blue-200 h-screen">
  <h2 className="text-3xl font-bold text-black mb-4">Your Shopping Cart</h2>
  {cartItems.length === 0 ? (
    <p className="text-black">Your cart is empty.</p>
  ) : (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mx-auto">
      {cartItems.map((item) => (
        <li key={item.id} className="mb-2">
          <span className="text-center">{item.title}</span>
          <img
        src={item.image} 
        alt={item.productName}
        className="mx-auto my-5 max-w-full h-auto" 
      />
          <button
            onClick={() => handleRemoveFromCart(item.id)}
            className="text-black"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  )}
  <button
    onClick={handleFinishPurchase}
    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded focus:outline-none hover:bg-blue-600"
  >
    Comprar
  </button>
</div>
)}

export default ShoppingCart;