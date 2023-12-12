import { useState } from "react";
import Categories from '../../../../assets/iconsFilters/Category.svg';
import categoryImages from "./categoryImages";

const CategorySelect = ({ filters, categoriesWithAll, handleFilterChange }) => {
 const [showCategoryOptions, setShowCategoryOptions] = useState(false);

 const toggleCategoryOptions = (e) => {
    e.stopPropagation();
    setShowCategoryOptions(!showCategoryOptions);
 };

 return (
    <div className="p-0 bg-gray-100 rounded-lg" onClick={toggleCategoryOptions}>
      <div className="grid grid-cols-2 items-center cursor-pointer">
        <span className="text-gray-700  bg-gray-00 rounded-tl-md rounded-bl-md">
          {filters.category ? filters.category : "Categorias"}
        </span>
        <img
          src={
            filters.category
              ? categoryImages[filters.category]
              : Categories
          }
          alt={filters.category || "Categories"}
          className="w-6 h-6 bg-gray-100 rounded-tr-md rounded-br-md p-1"
        />
      </div>
      {showCategoryOptions && (
        <div className="absolute mt-2 bg-white border border-gray-300 rounded-md overflow-hidden shadow-md">
          {categoriesWithAll.map((category) => (
            <div
              key={category}
              onClick={() => {
                handleFilterChange('category', category);
                toggleCategoryOptions();
              }}
              className="flex items-center px-2 py-2 cursor-pointer hover:bg-gray-100"
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
 );
};

export default CategorySelect;