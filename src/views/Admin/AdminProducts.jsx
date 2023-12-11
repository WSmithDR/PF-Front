import { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, deleteProduct } from '../../redux/actions';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import Selection from '../../components/Selection/Selection';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const info = useSelector((state) => state.products?.info);

  useEffect(() => {
    console.log('voy por los productos')
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));

    Swal.fire({
      title: 'Producto desactivado',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-200">
      <div className="p-5 ml-72 h-full">
        <h2 className="text-center text-lg font-semibold p-4 text-blue-500">Tus Productos</h2>
        <div className="text-center mb-4">
          <NavLink to="/dashboard/products/deleted">
            <button className="bg-gray-500 text-white p-2 rounded">Productos Desactivados</button>
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
              <th className="px-4 py-2">Desactivar Producto</th>
            </tr>
          </thead>
          <tbody>
            {products?.results.map((product) => (
              <tr key={product._id}>
                <td className="border p-2 flex items-center">{product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.quantity}</td>
                <td className="text-center border p-2">{product.deleted ? "Desactivado" : "Activado"}</td>
                <td className="text-center border p-2">
                  <button onClick={() => handleDeleteProduct(product._id)} className="text-black">
                    Desactivar
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

export default AdminProducts;