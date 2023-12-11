const SaleSelect = ({ filters, handleFilterChange }) => {
 return (
    <select
      value={filters.sale}
      onChange={(e) => handleFilterChange('sale', e.target.value)}
      className="p-2 bg-gray-100 rounded-lg"
    >
      <option className='text-gray-200' value={3}>Descuentos</option>
      <option value="1">Con descuentos</option>
      <option value="0">Sin descuentos</option>
    </select>
 );
};

export default SaleSelect;