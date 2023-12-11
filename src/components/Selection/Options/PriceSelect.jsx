const PriceSelect = ({ filters, handleFilterChange }) => {
 return (
    <select
      value={filters.price}
      onChange={(e) => handleFilterChange('price', e.target.value)}
      className="p-2 bg-gray-100 rounded-lg"
    >
      <option value="">Todos</option>
      <option value="highest">Más alto</option>
      <option value="lowest">Más bajo</option>
    </select>
 );
};

export default PriceSelect;