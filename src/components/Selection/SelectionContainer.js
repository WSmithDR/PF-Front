
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, setCurrentPage } from "../../redux/actions.js";
import categories from "./Options/Categories/categories.js";

const SelectionContainer = () => {
 const categoriesWithAll = ["", ...categories];
 const {currentPage} = useSelector(state => state)
 const [filters, setFilters] = useState({
    category: '',
    sale: 3,
    price: '',
 });

 const dispatch = useDispatch()

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

 const handleFilterChange = (filterName, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue === "Todos" ? null : filterValue,
    }));
    dispatch(setCurrentPage(1));
 };

 return {
    filters,
    categoriesWithAll,
    handleFilterChange,
 };
};

export default SelectionContainer;