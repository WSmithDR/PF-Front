import { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsersDeleted, restoreUser } from '../../redux/actions';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

const AdminDeletedUsers = () => {
  const dispatch = useDispatch();
  const deletedUsers = useSelector((state) => state.allUsersDeleted);
  const info = useSelector((state) => state.allUsersDeleted?.info);
  console.log(deletedUsers)
  console.log(info)

  useEffect(() => {
    dispatch(getAllUsersDeleted());
  }, [dispatch]);

  const handleRestoreUser = (userId) => {
    dispatch(restoreUser(userId));

    Swal.fire({
      title: 'Usuario Restaurado',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-200">
      <div className="p-5 ml-72 h-full">
        <h2 className="text-center text-lg font-semibold p-4 text-blue-500">Usuarios removidos</h2>
        <div className="text-center mb-4">
          <NavLink to="/dashboard/users">
            <button className="bg-gray-500 text-white p-2 rounded">Usuarios</button>
          </NavLink>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Restaurar Usuario</th>
            </tr>
          </thead>
          <tbody>
            {deletedUsers?.results.map((user) => (
              <tr key={user._id}>
                <td className="border p-2 flex items-center">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="text-center border p-2">{user.deleted ? "Inactivo" : "Activo"}</td>
                <td className="text-center border p-2">
                  <button onClick={() => handleRestoreUser(user._id)} className="text-black">
                    Restaurar
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

export default AdminDeletedUsers;