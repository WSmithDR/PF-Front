import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, deleteUser, putUserAdmin } from '../../redux/actions';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";


const AdminUser = () => {
 const dispatch = useDispatch();
 const users = useSelector((state) => state.allUsers);


 const [filteredUsers, setFilteredUsers] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [pageSize, setPageSize] = useState(5);
 const [nameFilter, setNameFilter] = useState("");
 const [isAdmin, setIsAdmin] = useState('default');


 useEffect(() => {
   dispatch(getAllUsers());
 }, [dispatch]);


 useEffect(() => {
   const filtered = filterUsers(users, nameFilter, isAdmin);
   setFilteredUsers(filtered);
 }, [users, nameFilter, isAdmin]);


 const handleDeleteUser = (userId) => {
   dispatch(deleteUser(userId));


   Swal.fire({
     title: 'Usuario Baneado',
     icon: 'success',
     timer: 1500,
     showConfirmButton: false,
   });
   dispatch(getAllUsers());
 };


 const handlePutUserAdmin = async (userId) => {
   try {
     await dispatch(putUserAdmin(userId, !isAdmin));
    
     Swal.fire({
       title: 'Estado de Usuario Cambiado',
       icon: 'success',
       timer: 1500,
       showConfirmButton: false,
     });
  
     dispatch(getAllUsers());
   } catch (error) {
     console.error('Error al cambiar el estado de admin del usuario:', error.message);
   }
 };


 const filterUsers = (users, name, isAdmin) => {
   let filteredUsers = users;


   if (name) {
     filteredUsers = filteredUsers.filter((user) =>
       user.name.toLowerCase().includes(name.toLowerCase())
     );
   }


   if (isAdmin !== 'default') {
     filteredUsers = filteredUsers.filter((user) =>
       isAdmin === 'true' ? user.Admin : !user.Admin
     );
   }


   return filteredUsers;
 };


 const handlePagination = () => {
   const startIndex = (currentPage - 1) * pageSize;
   const endIndex = startIndex + pageSize;
    const paginatedUsers = Array.isArray(filteredUsers) ? filteredUsers.slice(startIndex, endIndex) : [];
    return paginatedUsers;
 };


 const paginatedUsers = handlePagination();


 const totalPages = Math.ceil(filteredUsers.length / pageSize);
 return (
   <div className="items-center p-5 ml-72 pt-10 justify-center min-h-screen bg-gray-900">
     <div className="col-span-12">
      
       <div className="overflow-auto lg:overflow-visible ">
         <div className="text-center mb-6">
           <NavLink to="/dashboard/users/deleted">
             <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg ">Usuarios activos</button>
           </NavLink>
         </div>


         <div class="my-2 flex sm:flex-row flex-col">
           <div class="flex flex-row  sm:mb-0">
             <div class="relative">
               <select
                 class="appearance-none rounded-tl-lg rounded-bl-lg h-full border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                 onChange={(e) => setPageSize(parseInt(e.target.value))}
               >
                 <option value={5}>5</option>
                 <option value={10}>10</option>
                 <option value={20}>20</option>
               </select>
               <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                 <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                 </svg>
               </div>
              
             </div>
           </div>


           <div class="relative">
             <select
               class="appearance-none h-full rounded- border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
               onChange={(e) => setIsAdmin(e.target.value)}
             >
               <option value="default">Todos</option>
               <option value="true">Administradores</option>
               <option value="false">Usuarios</option>
             </select>
             <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
               <svg class="fill-current h-4 w-4" xmlns="http://www.0/svg" viewBox="0 0 20 20">
                 <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
               </svg>
             </div>
           </div>
      
         <div class="block relative">
           <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
             <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
               <path
                 d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
               </path>
             </svg>
           </span>
           <input
             placeholder="Buscar" 
             class="appearance-none rounded- rounded- sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
             value={nameFilter}
             onChange={(e) => setNameFilter(e.target.value)}
           />
         </div>


         <div class="block relative flex items-center">
           <button
             class={`appearance-none h-full rounded- border block appearance-none bg-white border-gray-400 text-gray-700 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${currentPage === 1 && `cursor-not-allowed bg-gray-400`} `}
          
             onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
             disabled={currentPage === 1}
           >
             <FaArrowLeft />
           </button>


           <button
             class={`appearance-none h-full rounded-tr-lg rounded-br-lg border block appearance-none bg-white border-gray-400 text-gray-700 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${currentPage === totalPages && `cursor-not-allowed bg-gray-400 bg-gray-400`} `}
             onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
             disabled={currentPage === totalPages}
           >
             <FaArrowRight />
           </button>
         </div>
       </div>


         <table className="table w-full text-gray-400 text-center border-separate text-sm">
           <thead className="bg-gray-800 text-gray-300">
             <tr>
               <th className="px-4 py-2">Nombre</th>
               <th className="px-4 py-2">Email</th>
               <th className="px-4 py-2">Estado</th>
               <th className="px-4 py-2">Rol</th>
               <th className="px-4 py-2">Remover Usuario</th>
             </tr>
           </thead>


           <tbody>
             {paginatedUsers.map((user) => (
               <tr className="bg-gray-800 text-white rounded-md" key={user._id}>
                
                 <td className="p-3 text-white font-bold">
                   {user.name}
                 </td>


                 <td className="p-3">
                   {user.email}
                 </td>


                 <td className="p-3 font-bold">
                   {user.deleted ? "Inactivo" : "Activo"}
                 </td>


                 <td className="p-3">
                   { user.Admin ? (
                     <button onClick={() => handlePutUserAdmin(user._id)} className="text-black bg-green-300 p-1 px-2 rounded-lg hover:bg-green-500 hover:text-white">
                       Admin
                     </button>
                   ): (
                     <button onClick={() => handlePutUserAdmin(user._id)} className="text-black bg-gray-300 p-1 rounded-lg hover:bg-gray-500 hover:text-white">
                       Usuario
                     </button>
                   )
                   }
                 </td>


                 <td className="p-3">
                   <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
                     Eliminar
                   </button>
                 </td>


               </tr>
             ))}
           </tbody>


         </table>
       </div>


     </div>
   </div>
 );
};


export default AdminUser;