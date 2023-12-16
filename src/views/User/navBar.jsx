import { Button } from "antd";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/LOGO.png";
import AuthModal from "../../components/AuthModal";
import SearchBar from "../../components/SearchBar";
import UserIcon from "../../components/UserIcon";
import { getUserByID } from "../../redux/actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => (state.cart));
  
  const quantityProducts = cart.reduce((total, product) => total + product.quantity, 0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    const isUserLoggedIn = !!localStorage.getItem("token");

    if (isUserLoggedIn) {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      if (decodedToken) {
        try {
          await dispatch(getUserByID(decodedToken.id));
        } catch (error) {
          console.error("Error dispatching getUserByID:", error);
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, dispatch]);

  const isUserLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    fetchData(); 
  }, []);  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearData());
    navigate("/home");
    setIsModalOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-700 shadow-md z-40 px-[5vw] flex items-center justify-between p-2">
      <div className="flex items-center">
        <img
          className="bg-gray-50 rounded-lg w-[50px] h-[50px] cursor-pointer"
          src={LOGO}
          alt="home"
          onClick={() => navigate("/home")}
        />
      </div>

      <div className="flex items-center justify-center">
        <SearchBar />
      </div>

      <div className="flex items-center space-x-4">
        <div style={{ position: 'relative' }}>
          <LuShoppingCart
              className="w-[40px] h-[40px] text-gray-100 cursor-pointer hover:text-gray-500"
              onClick={() => navigate("/shoppingCart")}
              title="Cart"
            />
          {quantityProducts > 0 && (
            <div className="bg-red-500 text-white text-center justify-center rounded-full w-4 h-4 absolute top-0 right-0 -mt-2 -mr-2">
              {quantityProducts}
            </div>
          )}
        </div>

        {isUserLoggedIn ? (
          <div className='pl-0'>
            <UserIcon                   
              onClick={handleLogout}
            />
            
          </div>
        ) : (
          <Button
            className="text-white font-pop-light text-xl bg-transparent border-none shadow-none navbutton"
            type="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Entrar/Registrarse
          </Button>
        )}
      </div>

      <AuthModal isOpen={isModalOpen} onClose={handleCancel} onLogout={handleLogout} />
    </nav>
  );
};

export default NavBar;