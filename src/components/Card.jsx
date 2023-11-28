import { NavLink } from 'react-router-dom';

const Card = ({ price, img, name, _id }) => {

 const isLocalImage = !img?.startsWith("http");
 return (
    <NavLink NavLink className={'group bg-blue1 shadow duration-150 hover:scale-105 hover:shadow-md'} to={`/detail/${_id}`}>     
      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-blue1 xl:aspect-h-8 xl:aspect-w-7 '>
        <img className='h-full w-full object-cover object-center group-hover:opacity-75' src={isLocalImage ? `http://localhost:3001/${img}` : img} alt={`${name} image`} />
      </div>
         <h3 className='my-4 pl-4 font-bold text-black-500'>{name}</h3>
         <p className='mb-4 ml-4 text-xl font-semibold text-gray-800'>$ {price}</p>
   </NavLink>
 );
};

export default Card;