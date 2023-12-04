import { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, finishPurchase } from '../redux/actions';
import Swal from 'sweetalert2';
import LoginRegister from "../components/Login-register/LoginRegister";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log('cartItems:', cartItems);
  const [showLogin, setShowLogin] = useState(false);

  const isUserLoggedIn = !!localStorage.getItem("token");

  const handleRemoveFromCart = (productById) => {
    dispatch(removeFromCart(productById));
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
          setShowLogin(true);
        }
      });
      return;
    }

    if (cartItems.length === 0) {
      Swal.fire('No hay nada en tu carrito');
      return;
    }

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id

    const objetoPago = cartItems.map((item) => ({
      ...item,
      productId: item.id,
      unit_price: item.price,
      currency_id: 'MEX',
      userId: userId
    }));

    dispatch(finishPurchase(objetoPago));
    Swal.fire('Compra completada');
    setShowLogin(true);
  };

  return (
    <div className="relative bg-blue-200">
      <div className="text-center py-10 bg-blue-200 h-screen">
        <h2 className="text-3xl font-bold text-black mb-4">Tu carrito</h2>
        {cartItems.length === 0 ? (
          <p className="text-black">Tu carrito esta vacio</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Producto</th>
                <th className='border p-2'>Cantidad</th>
                <th className="border p-2">Precio</th>
                <th className="border p-2">Cancelar</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2 flex items-center">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-12 h-12 object-cover rounded mr-2"
                    />
                    {item.title}
                  </td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">${item.price}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-black"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border p-2"></td>
                <td className="border p-2 font-bold">Total a pagar:</td>
                <td className="border p-2 font-bold">${totalAmount}</td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="relative bg-blue-200 text-center">
          <button
            onClick={handleFinishPurchase}
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
          >
            Comprar
          </button>
          {showLogin && <LoginRegister />}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;