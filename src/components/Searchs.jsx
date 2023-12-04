import { useState, useEffect } from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';
import Categories from '../assets/iconsFilters/Category.svg';
import Headset from '../assets/iconsFilters/Headsets.svg';
import Microphone from '../assets/iconsFilters/Microphones.svg';
import Monitor from '../assets/iconsFilters/Monitors.svg';
import Mousepad from '../assets/iconsFilters/Mousepads.svg';
import Earbud from '../assets/iconsFilters/Earbuds.svg';
import Keyboard from '../assets/iconsFilters/Keyboards.svg';
import Mices from '../assets/iconsFilters/Mice.svg';
import Controller from '../assets/iconsFilters/Controllers.svg';
import { IoReload } from "react-icons/io5";

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

const Searchs = () => {
  const productsByName = useSelector((state) => state.productsByName);

  const [loading, setLoading] = useState(true);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    sale: '3',
    price: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const applyFilters = () => {
    let filteredProducts = [...productsByName];

    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.category
      );
    }

    const saleValue = parseInt(filters.sale, 10);
    if (saleValue === 1) {
      filteredProducts = filteredProducts.filter((product) => product.sale >= 1);
    } else if (saleValue === 0) {
      filteredProducts = filteredProducts.filter((product) => product.sale < 1);
    }

    if (filters.price === 'highest') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (filters.price === 'lowest') {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    const itemsPerPage = 12;
    const offset = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(offset, offset + itemsPerPage);

    return { paginatedProducts, totalPages };
  };

  const { paginatedProducts, totalPages } = applyFilters();

  const handleFilterChange = (filterName, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue === 'Todos' ? null : filterValue,
    }));
    setCurrentPage(1);
  };

  const categories = ["Headsets", "Microphones", "Monitors", "Mousepads", "Earbuds", "Keyboards", "Mice", "Controllers"];

  const toggleCategoryOptions = () => {
    setShowCategoryOptions(!showCategoryOptions);
  };
  
  const categoriesWithAll = ["", ...categories];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleRefreshFilters = () => {
    setFilters({
      category: '',
      sale: '3',
      price: '',
    });
  };

  const hasAppliedFilters = filters.category || filters.sale !== '3' || filters.price;

  return (
    <div className="relative h-full min-h-[100vh] bg-blue-200">
      <div className="relative inset-0">
        <div className="text-center pt-40 pb-0 relative">
          <div className="flex flex-col items-center">

          <div className="grid grid-cols-4 gap-3 items-center m-3">
            <label className="col-span-1">
              <div className="relative inline-block">
                  <div
                    onClick={toggleCategoryOptions}
                    className="flex items-center cursor-pointer"
                  >
                    <span className="text-gray-700 p-2 bg-gray-100 rounded-tl-md rounded-bl-md">
                      {filters.category ? filters.category : "Categorias"}
                    </span>  
                    <img
                      src={
                        filters.category
                          ? categoryImages[filters.category]
                          : Categories
                      }
                      alt={filters.category || "Categories"}
                      className="w-6 h-6 bg-gray-100 rounded-tr-md rounded-br-md p-2 "
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

              <label className="col-span-1 ml-5 mr-5">
                <select
                  value={filters.sale}
                  onChange={(e) => handleFilterChange('sale', e.target.value)}
                  className='p-2 bg-gray-100 rounded-lg'
                >
                  <option className='text-gray-200' value='3'>
                    Descuentos
                  </option>
                  <option value='1'>Con descuentos</option>
                  <option value='0'>Sin descuentos</option>
                </select>
              </label>
              
              <label className="col-span-1">
                <select
                  value={filters.price}
                  onChange={(e) => handleFilterChange('price', e.target.value)}
                  className='p-2 bg-gray-100 rounded-lg'
                >
                  <option value=''>Todos</option>
                  <option value='highest'>Más alto</option>
                  <option value='lowest'>Más bajo</option>
                </select>
              </label>

              <div className={`col-span-${hasAppliedFilters ? '1' : '0'} pr-40`}>
                {hasAppliedFilters && (
                  <button 
                    onClick={handleRefreshFilters}
                    className="p-0 bg-gray-100 rounded-full align-middle"
                  > 
                    <IoReload className="w-6 h-6 p-1"/>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 m-5 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {!loading &&
              paginatedProducts?.map((product) => (
                <Card
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  img={product.img}
                  _id={product._id}
                />
              ))}
            </div>

            {paginatedProducts.length != 0 && !loading && (
              <div className="max-w-2xl m-10 mx-auto">
                <nav aria-label="Page navigation example">
                <ul className="flex justify-center -space-x-px">
                  <li>
                    <button
                      className={`bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}                      
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </button>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li key={i}>
                      <button
                        style={{
                          backgroundColor: i + 1 === currentPage ? '#424447' : 'white', 
                          borderColor: '#718096',
                          color: i + 1 === currentPage ? '#f7fafc' : '#4a5568', 
                          pointerEvents: i + 1 === currentPage ? 'none' : 'auto',
                        }}
                        className={`border border-gray-300 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3`}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      className={`bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchs;
