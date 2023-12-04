import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './views/Landing';
import Detail from './components/Detail';
import CreateProduct from './components/CreateProduct';
import Searchs from './components/Searchs';
import ShoppingCart from './views/ShoppingCart';

const App = () => {
  return (
    <main className="relative">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/CreateProduct' element={<CreateProduct />} />
        <Route path='/searchs' element={<Searchs />} />
        <Route path='/shoppingCart' element={<ShoppingCart/>} />
      </Routes>
    </main>
  );
};


export default App;