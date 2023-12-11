import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPurchases } from '../../redux/actions';
import { jwtDecode } from 'jwt-decode';
import PurchaseCard from '../../components/PurchaseCard';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const UserPurchase = () => {
  const token = localStorage.getItem('token'); 
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const dispatch = useDispatch();

  const userPurchase = useSelector((state) => state.userPurchase);

  useEffect(() => {
    dispatch(getUserPurchases(userId));
  }, []);

  const [sortBy, setSortBy] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const allProducts = userPurchase.flatMap((purchase) => purchase.products);
    const sortedProducts = handleSort(allProducts, sortBy);
    const paginatedProducts = handlePagination(sortedProducts, currentPage, pageSize);
    setFilteredProducts(paginatedProducts);
  }, [userPurchase, sortBy, currentPage, pageSize]);

  const filterProducts = (products, name, priceMin, priceMax) => {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );

    if (priceMin) {
      products = products.filter((product) => product.price >= priceMin);
    }

    if (priceMax) {
      products = products.filter((product) => product.price <= priceMax);
    }

    return products;
  };

  const handleSort = (products, sortBy) => {
    switch (sortBy) {
      case "highestPrice":
        return products.sort((a, b) => b.price - a.price);
      case "lowestPrice":
        return products.sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };


  const handlePagination = (products, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return products.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const filtered = filterProducts(
      userPurchase.flatMap((purchase) => purchase.products),
      nameFilter,
      priceMin,
      priceMax
    );
    const sorted = handleSort(filtered, sortBy);
    setFilteredProducts(handlePagination(sorted, currentPage, pageSize));
  }, [sortBy, nameFilter, priceMin, priceMax, currentPage, pageSize]);

  console.log(userPurchase);
  console.log(filteredProducts);
  
  return (
    <div className="items-center p-5 mt-5 pt-10 justify-center min-h-screen bg-gray-900">
      <div className="col-span-12">
        <div className="overflow-auto lg:overflow-visible ">
          
          
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
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Todos</option>
                <option value="highestPrice">Más alto</option>
                <option value="lowestPrice">Más bajo</option>
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
              class={`appearance-none h-full rounded-tr-lg rounded-br-lg border block appearance-none bg-white border-gray-400 text-gray-700 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${filteredProducts.length < pageSize && `cursor-not-allowed bg-gray-400 bg-gray-400`} `}
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={filteredProducts.length < pageSize}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        <table className="table text-gray-400 text-center border-separate space-y-6 text-sm">
          <thead className="bg-gray-800 text-gray-500">
            <tr>
              <th className="p-3 text-gray-300 w-screen text-center">Nombre</th>
              <th className="p-3 text-gray-300 w-screen text-center">Categoria</th>
              <th className="p-3 text-gray-300 w-screen text-center">Precio</th>
              <th className="p-3 text-gray-300 w-screen text-center">Marca</th>
              <th className="p-3 text-gray-300 w-screen text-center">Fecha de compra</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <PurchaseCard
                key={product._id} 
                brand={product.brand}
                category={product.category}
                price={product.price}
                name={product.name}
                img={product.img}
                purchaseDate={product.updatedAt.split("T")[0]}
                _id={product._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default UserPurchase;
