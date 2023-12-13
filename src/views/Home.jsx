import { useSelector } from 'react-redux';
import Pagination from '../components/Pagination/Pagination';
import Products from '../components/Products/Products';
import Selection from '../components/Selection/Selection';
import { home } from '../constants/styles/home';
import Welcome from './Welcome';

const Home = () => {
  const info = useSelector((state) => state.products?.info);
  const products = useSelector((state) => state.products.results);
  return (
    <div className={home}>
      <Welcome/>
      <Selection/>
      <Products products={products}/>
      <Pagination info={info}/>
    </div>
  );
};

export default Home;
