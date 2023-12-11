import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import AuthModal from "../../components/AuthModal";
import SearchBar from "../../components/SearchBar";
import LOGO from "../../assets/LOGO.png";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { clearData, getUserByID } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { BiPurchaseTag } from "react-icons/bi";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    return state.cart.length > 0 ? state.cart : storedCart;
  });
  
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

  const userData = useSelector((state) => state.userData);
  const isUserLoggedIn = !!localStorage.getItem("token");
  const isAdmin = userData && userData.Admin;


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
  };

  if (!userData) {
    return <div>Loading...</div>;
  }
  

  return (
    <nav className="fixed top-0 w-full bg-blue1 shadow-md z-40 px-[5vw] flex items-center justify-between p-2">
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
        {isUserLoggedIn && isAdmin && (
          <MdOutlineSpaceDashboard
            className="w-[50px] h-[50px] cursor-pointer hover:text-gray-100"
            onClick={() => navigate("/dashboard")}
            title="Dashboard"
          />
        )}

        {isUserLoggedIn && !isAdmin && (
          <BiPurchaseTag
            className="w-[40px] h-[40px] cursor-pointer hover:text-gray-100"
            title="Mis compras"
            onClick={() => navigate("/profile/purchase")}
          />
        )}

        {isUserLoggedIn && !isAdmin && (
          <FaRegUser
            className="w-[40px] h-[40px] cursor-pointer hover:text-gray-100"
            title="User"
            onClick={() => navigate("/profile")}
          />
        )}

        
        <div style={{ position: 'relative' }}>
          <LuShoppingCart
              className="w-[40px] h-[40px] cursor-pointer hover:text-gray-100"
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
          <button
            className="hover:text-gray-100 text-gray4 font-pop-light text-xl bg-transparent border-none shadow-none navbutton"
            type="button"
            onClick={handleLogout}
          >
            <RiLogoutBoxRLine className="w-[40px] h-[40px] cursor-pointer" title="Logout" />
          </button>
        ) : (
          <Button
            className="text-gray4 font-pop-light text-xl bg-transparent border-none shadow-none navbutton"
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