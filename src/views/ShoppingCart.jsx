import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import AuthModal from "../components/AuthModal";
import PurchaseCard from '../components/PurchaseCard';
import { finishPurchase } from '../redux/actions';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
  const cartReducer = useSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const isUserLoggedIn = !!localStorage.getItem("token");

  const groupedCartItems = Object.values(
    storedCartItems.reduce((acc, item) => {
      const key = item.id;
      if (!acc[key]) {
        acc[key] = { ...item, quantity: 0 };
      }
      acc[key].quantity += item.quantity;
      return acc;
    }, {})
  );
  
  const totalAmount = groupedCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedNumber = parseFloat(totalAmount).toFixed(2);

  const handleFinishPurchase = () => {
    if (!isUserLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión para completar la compra',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          showModal();
        }
      });
      return;
    }

    if (storedCartItems.length === 0) {
      Swal.fire('No hay nada en tu carrito');
      return;
    }

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id

    const objetoPago = storedCartItems.map((item) => ({
      ...item,
      productId: item.id,
      unit_price: item.price,
      currency_id: 'ARG',
      userId: userId
    }));

    dispatch(finishPurchase(objetoPago));
    Swal.fire('Compra en proceso');
    handleCancel();
    dispatch(finishPurchase([]))
  };

  return (
    <div className="relative min-h-[100vh] bg-gray-900">
      <div className="text-center min-h-[100vh] py-10 ">
        <h2 className="text-3xl justify-center align-center font-bold mt-3 text-white">Tu carrito</h2>
        {cartReducer.length === 0 ? (
          <p className=" text-4xl text-white pt-10 mt-10">Tu carrito esta vacío 😶</p>
        ) : (
          <table className="table p-5 text-gray-400 text-center border-separate space-y-6 rounded-md text-sm">
            <thead className="bg-gray-800 text-gray-500 rounded-md">
              <tr>
                <th className="p-3 text-gray-300 w-screen text-center">Nombre</th>
                <th className="p-3 text-gray-300 w-screen text-center">Cantidad</th>
                <th className="p-3 text-gray-300 w-screen text-center">Precio</th>
                
              </tr>
            </thead>
            <tbody>
            {groupedCartItems.map((item) => (
                  <PurchaseCard 
                    key={item.id}
                    img={item.image}
                    name={item.title}
                    price={item.price}
                    quantity={item.quantity}
                    cart={true}
                    _id={item.id}
                  />
              ))}
              <tr>
                <td className="border bg-gray-800 text-2xl p-2 text-white">Total a pagar: <span className='font-bold'>${formattedNumber}</span></td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="relative text-2xl rounded-xl text-center mt-3">
          { cartReducer.length > 0 &&
            <button
              disabled={storedCartItems.length === 0}
              onClick={handleFinishPurchase}
              className={`px-4 py-2 rounded focus:outline-none hover:bg-blue-600 bg-blue-500 text-white
              ${storedCartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ' text-white'}`}
            >
              Comprar
            </button>
          }
          <AuthModal isOpen={isModalOpen} onClose={handleCancel} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;