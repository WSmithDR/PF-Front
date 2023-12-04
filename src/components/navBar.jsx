import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import LoginRegister from "./Login-register/LoginRegister";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { clearData } from "../redux/actions";
import { useDispatch } from "react-redux";
import LOGO from "../assets/LOGO.png";

const NavBar = () => {
  const successPostTokenGoogle = useSelector((state) => state.successPostTokenGoogle);
  const successPostUser = useSelector((state) => state.successPostUser);
  const successPostLogin = useSelector((state) => state.successPostLogin);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalFor2Seconds, setShowModalFor2Seconds] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearData());
    navigate("/");
  };

  const isUserLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (successPostTokenGoogle || successPostUser || successPostLogin) {
      setShowModalFor2Seconds(true);

      const timer = setTimeout(() => {
        setShowModalFor2Seconds(false);
        setIsModalOpen(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successPostTokenGoogle, successPostUser, successPostLogin]);

  return (
    <nav className="fixed top-0 w-full bg-blue1 shadow-md z-40 px-[5vw] flex items-center justify-between p-2" >
      <div className="flex items-center">
        <img
          className="bg-gray-50 rounded-lg w-[50px] h-[50px] cursor-pointer"
          src={LOGO}
          alt="home"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="flex items-center justify-center">
        <SearchBar />
      </div>

      <div className="flex items-center space-x-4">
        {isUserLoggedIn && (
          <FaRegUser
            className="w-[40px] h-[40px] cursor-pointer hover:text-gray-100"
            title="User"
          />
        )}

        <LuShoppingCart 
          className="w-[40px] h-[40px] cursor-pointer hover:text-gray-100"
          onClick={() => navigate("/shoppingCart")}
          title="Cart"
        />
        
        {isUserLoggedIn ? (
          <button
            className="hover:text-gray-100 text-gray4 font-pop-light text-xl bg-transparent border-none shadow-none navbutton"
            type="button"
            onClick={handleLogout}
          >
            <RiLogoutBoxRLine className="w-[40px] h-[40px] cursor-pointer" title="Logout"/>
          </button>
        ) : (
          <Button
            className="text-gray4 font-pop-light text-xl bg-transparent border-none shadow-none navbutton"
            type="primary"
            onClick={showModal}
          >
            Entrar/Registrarse
          </Button>
        )}
      </div>

      <Modal
        title=""
        visible={isModalOpen || showModalFor2Seconds}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <LoginRegister />
      </Modal>
    </nav>
  );
};

export default NavBar;
