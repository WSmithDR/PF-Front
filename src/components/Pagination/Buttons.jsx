
const Buttons = ({ currentPage, totalPages, handlePageChange }) => {
 const paginationItems = [];
  
 for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <li key={i}>
        <button
          style={{
            backgroundColor: i === currentPage ? 'rgb(3 7 18)' : 'rgb(51 65 85)',
            borderColor: 'rgb(15 23 42)',
            color: i === currentPage ? '#ffffff' : '#a4a5a6',
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

 return (
    <>
      <li>
        <button
          className={`bg-white border border-gray-950 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-950 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
      </li>
      {paginationItems}
      <li>
        <button
          className={`bg-white border border-gray-950 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-950 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </li>
    </>
 );
};

export default Buttons;