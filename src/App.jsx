import { Route, Routes, useLocation } from 'react-router-dom';
import Detail from './components/Products/Detail';
import Searchs from './components/Searchs';
import About from './views/About.jsx';
import AdminDashboard from './views/Admin/AdminDashboard.jsx';
import AdminProducts from './views/Admin/AdminProducts.jsx';
import AdminUser from './views/Admin/AdminUser.jsx';
import CreateProduct from './views/Admin/CreateProduct.jsx';
import Profile from './views/Admin/Profile.jsx';
import SideBar from './views/Admin/SideBar.jsx';
import Footer from './views/Footer.jsx';
import Home from './views/Home';
import Landing from './views/Landing';
import ShoppingCart from './views/ShoppingCart';
import NavBar from './views/User/navBar.jsx';

import AdminDeletedProducts from './views/Admin/AdminDeletedProducts.jsx';
import AdminDeletedUsers from './views/Admin/AdminDeletedUsers.jsx';
import ProfileUser from './views/User/ProfileUser.jsx';
import UserPurchase from './views/User/UserPurchase.jsx';

const App = () => {
  const location = useLocation()

  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const toFooter = !isDashboardRoute && location.pathname !== '/';

  return (
    <main className="relative">
      { !isDashboardRoute && location.pathname !== '/' && <NavBar /> }
      { isDashboardRoute && <SideBar/> }
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path='/searchs' element={<Searchs/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/profile' element={<ProfileUser/>}/>
        <Route path='/shoppingCart' element={<ShoppingCart/>}/>
        <Route path='/profile/purchase' element={<UserPurchase/>}/>
    
        {isDashboardRoute && (
          <>
            <Route path='/dashboard' element={<AdminDashboard/>}/>
            <Route path='/dashboard/users' element={<AdminUser/>}/>
            <Route path='/dashboard/profile' element={<Profile/>}/>
            <Route path='/dashboard/create' element={<CreateProduct/>}/>
            <Route path='/dashboard/products' element={<AdminProducts/>}/>
            <Route path='/dashboard/users/deleted' element={<AdminDeletedUsers/>}/>
            <Route path='/dashboard/products/deleted' element={<AdminDeletedProducts/>} />
          </>
        )}
      </Routes>
      { toFooter && <Footer/>}
    </main>
  );
};

export default App;