import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions';
import Card from '../components/Card';
import Categories from '../assets/iconsFilters/Category.svg';
import Headset from '../assets/iconsFilters/Headsets.svg';
import Microphone from '../assets/iconsFilters/Microphones.svg';
import Monitor from '../assets/iconsFilters/Monitors.svg';
import Mousepad from '../assets/iconsFilters/Mousepads.svg';
import Earbud from '../assets/iconsFilters/Earbuds.svg';
import Keyboard from '../assets/iconsFilters/Keyboards.svg';
import Mices from '../assets/iconsFilters/Mice.svg';
import Controller from '../assets/iconsFilters/Controllers.svg';


const categoryImages = {
 Headsets: Headset,
 Microphones: Microphone,
 Monitors: Monitor,
 Mousepads: Mousepad,
 Earbuds: Earbud,
 Keyboards: Keyboard,
 Mice: Mices,
 Controllers: Controller,
};


const LandingPage = () => {
 const dispatch = useDispatch();
 const products = useSelector((state) => state.products.results);
 const info = useSelector((state) => state.products?.info);


 const [showCategoryOptions, setShowCategoryOptions] = useState(false);
 const [currentPage, setCurrentPage] = useState(1);
 const [filters, setFilters] = useState({
   category: '',
   sale: null,
   price: '',
 });


 useEffect(() => {
   const fetchData = async () => {
     try {
       dispatch(getAllProducts(currentPage, 12, filters));
     } catch (error) {
       console.error('Error fetching products:', error);
     }
   };


   fetchData();
 }, [dispatch, currentPage, filters]);


 const handlePageChange = (newPage) => {
   setCurrentPage(newPage);
 };


 const handleFilterChange = (filterName, filterValue) => {
   setFilters((prevFilters) => ({
     ...prevFilters,
     [filterName]: filterValue === "Todos" ? null : filterValue,
   }));
   setCurrentPage(1);
   window.scrollTo(0, 0);
 };
  const categories = ["Headsets", "Microphones", "Monitors", "Mousepads", "Earbuds", "Keyboards", "Mice", "Controllers"];


 const itemsPerPage = 12;
 const totalPages = Math.ceil(info?.total / itemsPerPage);


 const paginationItems = [];
 for (let i = 1; i <= totalPages; i++) {
   paginationItems.push(
     <li key={i}>
       <a
         href="javascript:void(0)"
         className={`bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 ${
           i === currentPage ? 'bg-blue-50 text-blue-600' : ''
         }`}
         onClick={() => handlePageChange(i)}
       >
         {i}
       </a>
     </li>
   );
 }


 const toggleCategoryOptions = () => {
   setShowCategoryOptions(!showCategoryOptions);
 };


 const categoriesWithAll = ["", ...categories];


  return (
   <div className="flex flex-col items-center">
     <h1 className= "padding text-4xl font-bold m-2 mb-0">Bienvenido</h1>
     <p className="text-lg text-gray-600 m-1 mt-0">Explora lo nuevo en tecnología</p>


     <div className='m-3'>
       <label>
         <div className="relative inline-block">
           <div
             onClick={toggleCategoryOptions}
             className="flex items-center cursor-pointer"
           >
             <span className="text-gray-700 p-2 bg-gray-100 rounded-full">
               {filters.category ? filters.category : "Categorias"}
             </span>  
             <img
               src={
                 filters.category
                   ? categoryImages[filters.category]
                   : Categories
               }
               alt={filters.category || "Categories"}
               className="w-6 h-6 ml-2 bg-gray-200 rounded-full "
             />
           </div>
           {showCategoryOptions && (
             <div className="absolute mt-2 bg-white border border-gray-300 rounded-md overflow-hidden shadow-md flex flex-col">
               {categoriesWithAll.map((category) => (
                 <div
                   key={category}
                   onClick={() => {
                     handleFilterChange('category', category);
                     toggleCategoryOptions();
                   }}
                   className="flex items-center px-8 py-2 cursor-pointer hover:bg-gray-100"
                 >
                   <span className="text-gray-700">{category || "Categorías"}</span>
                   <img
                     src={categoryImages[category] || Categories}
                     alt={category}
                     className="w-5 h-5 ml-2"
                   />
                 </div>
               ))}
             </div>
           )}
         </div>
       </label>


       <label className='m-10'>
         <select
           value={filters.sale}
           onChange={(e) => handleFilterChange('sale', e.target.value)}
           className="p-2 bg-gray-100 rounded-full"
         >
           <option className='text-gray-200' value="">Oferta</option>
           <option value="1">En oferta</option>
           <option value="0">Sin oferta</option>
         </select>
       </label>




       <label>
         <select
           value={filters.price}
           onChange={(e) => handleFilterChange('price', e.target.value)}
           className="p-2 bg-gray-100 rounded-full"
         >
           <option value="">Todos</option>
           <option value="highest">Más alto</option>
           <option value="lowest">Más bajo</option>
         </select>
       </label>
     </div>




     <div className="grid grid-cols-1 m-5 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
       {products?.map((product) => (
         <Card
           key={product._id}
           name={product.name}
           price={product.price}
           img={product.img}
           _id={product._id}
         />
       ))}
     </div>




     <div className="max-w-2xl m-10 mx-auto">
       <nav aria-label="Page navigation example">
         <ul className="flex justify-center -space-x-px">
           <li>
             <a
               href="javascript:void(0)"
               className={`bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1}
             >
               Anterior
             </a>
           </li>
           {paginationItems}
           <li>
             <a
               href="javascript:void(0)"
               className={`bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === totalPages}
             >
               Siguiente
             </a>
           </li>
         </ul>
       </nav>
     </div>
   </div>
 );
};


export default LandingPage