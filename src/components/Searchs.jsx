import { useState, useEffect } from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';
import CardLoading from './CardLoading';

const Searchs = () => {
  const productsByName = useSelector((state) => state.productsByName);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []); // Se ejecuta una vez al montar el componente

  return (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
      <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
        {!loading &&
          productsByName?.map((result) => (
            <Card
              key={result._id}
              name={result.name}
              price={result.price}
              img={result.img}
              _id={result._id}
            />
          ))}
      </div>

      {loading && (
        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <CardLoading />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchs;
