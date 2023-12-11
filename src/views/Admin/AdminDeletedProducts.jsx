import { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { getDeletedProducts, restoreProduct } from '../../redux/actions';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import Selection from '../../components/Selection/Selection';

const AdminDeletedProducts = () => {
  const dispatch = useDispatch();
  const deletedProducts = useSelector((state) => state.deletedProducts);
  const info = useSelector((state) => state.products?.info);
  console.log(deletedProducts)

  useEffect(() => {
    dispatch(getDeletedProducts());
  }, [dispatch]);

  const handleRestoreUser = (userId) => {
    dispatch(restoreProduct(userId));

    Swal.fire({
      title: 'Producto Reactivado',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-200">
      <div className="p-5 ml-72 h-full">
        <h2 className="text-center text-lg font-semibold p-4 text-blue-500">Productos desactivados</h2>
        <div className="text-center mb-4">
          <NavLink to="/dashboard/products">
            <button className="bg-gray-500 text-white p-2 rounded">Productos</button>
          </NavLink>
        </div>
        <div>
          <Selection/>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr>
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Restaurar Producto</th>
            </tr>
          </thead>
          <tbody>
            {deletedProducts?.results.map((product) => (
              <tr key={product._id}>
                <td className="border p-2 flex items-center">{product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.quantity}</td>
                <td className="text-center border p-2">{product.deleted ? "Desactivado" : "Activado"}</td>
                <td className="text-center border p-2">
                  <button onClick={() => handleRestoreUser(product._id)} className="text-black">
                    Reactivar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination info={info}/>
    </div>
  );
};

export default AdminDeletedProducts;