import { IoReload } from "react-icons/io5";

const ResetFiltersButton = ({ handleRefreshFilters, hasAppliedFilters }) => {
 return (
    <div className={`${hasAppliedFilters ? 'pr-40' : ''}`}>
      {hasAppliedFilters && (
        <button
          onClick={handleRefreshFilters}
          className="p-0 bg-gray-100 rounded-full align-middle"
        >
          <IoReload className="w-6 h-6 p-1"/>
        </button>
      )}
    </div>
 );
};

export default ResetFiltersButton;