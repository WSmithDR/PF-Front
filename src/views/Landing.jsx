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

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.results);
  const info = useSelector((state) => state.products?.info);

  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    sale: 3,
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCategoryOptions && !event.target.closest('.select-container')) {
        setShowCategoryOptions(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showCategoryOptions]);

  const scrollToTop = () => {
    scrollTo({
      top: 0,
      duration: 900,
      easing: 'easeInOutCubic',
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleFilterChange = (filterName, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue === "Todos" ? null : filterValue,
    }));
    setCurrentPage(1);
  };

  const handleRefreshFilters = () => {
    setFilters({
      category: '',
      sale: 3,
      price: '',
    });

    dispatch(getAllProducts(1, 12, {
      category: '',
      sale: 3,
      price: '',
    }));
  };

  const toggleCategoryOptions = (e) => {
    e.stopPropagation();
    setShowCategoryOptions(!showCategoryOptions);
  };

  const categories = ["Headsets", "Microphones", "Monitors", "Mousepads", "Earbuds", "Keyboards", "Mice", "Controllers"];

  const itemsPerPage = 12;
  const totalPages = Math.ceil(info?.total / itemsPerPage);

  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <li key={i}>
        <button
          style={{
            backgroundColor: i === currentPage ? '#424447' : 'white',
            borderColor: '#718096',
            color: i === currentPage ? '#f7fafc' : '#4a5568',
            pointerEvents: i === currentPage ? 'none' : 'auto',
          }}
          className={`border border-gray-300 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      </li>
    );
  }

  const categoriesWithAll = ["", ...categories];

  const hasAppliedFilters = filters.category !== '' || filters.sale !== '3' || filters.price !== '';

  return (
    <div className="relative h-full min-h-[100vh] bg-blue-200">
      <div className="relative inset-0">
        <div className="text-center pt-5 pb-0 relative">
          <div className="flex flex-col items-center " >
            <h1 className= "p-10 pb-5 text-4xl font-bold mb-0">Bienvenido</h1>
            <p className="text-lg text-gray-600 mb-3">Explora lo nuevo en tecnología</p>

            <div className="grid grid-cols-4 gap-3 items-center m-3 " >
              <label className="col-span-1">
                <div className="relative inline-block select-container" onClick={toggleCategoryOptions}>
                  <div className="flex items-center cursor-pointer">
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
                    <div className="absolute mt-2 bg-white border border-gray-300 rounded-md overflow-hidden shadow-md flex flex-col" style={{ zIndex: 1000 }}>
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
                  className="p-2 bg-gray-100 rounded-lg"
                  style={{ zIndex: 1000 }}
                >
                  <option className='text-gray-200' value={3}>Descuentos</option>
                  <option value="1">Con descuentos</option>
                  <option value="0">Sin descuentos</option>
                </select>
              </label>

              <label className="col-span-1">
                <select
                  value={filters.price}
                  onChange={(e) => handleFilterChange('price', e.target.value)}
                  className="p-2 bg-gray-100 rounded-lg"
                  style={{ zIndex: 1000 }}
                >
                  <option value="">Todos</option>
                  <option value="highest">Más alto</option>
                  <option value="lowest">Más bajo</option>
                </select>
              </label>

              <div className={`col-span-${hasAppliedFilters ? '1' : '0'} pr-40`}>
                {hasAppliedFilters && filters.category !== '' && (
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
                    <button
                      className={`bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </button>
                  </li>
                  {paginationItems}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
