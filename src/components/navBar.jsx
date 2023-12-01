import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import LoginRegister from "./Login-register/LoginRegister";
import SearchBar from "./SearchBar";
import homeicon2 from "../assets/icons/homeicon2.png";
import shoppingCart from "../assets/icons/shoppingCart.png"
import Login from "./Login-register/Login/Login";
import userIcon from "../assets/icons/userIcon.png"
import { clearData } from "../redux/actions";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
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
  }

  const handleLogout = () => {  
    localStorage.removeItem("token");
    dispatch(clearData())
    navigate("/");
  };

  const isUserLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="fixed top-0 w-full bg-blue1 shadow-md z-50 px-[5vw] flex items-center justify-between p-2">
      <div className="flex">
        <img
          className="w-[50px] h-[50px] cursor-pointer "
          src={homeicon2}
          alt="home"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex">
        <img
          className="w-[50px] h-[50px] cursor-pointer"
          src={shoppingCart}
          alt="shoppingCart"
          onClick={() => navigate("/shoppingCart")}
        />
      </div>
      {isUserLoggedIn && (
        <div className="flex">
          <img 
            className="w-[50px] h-[50px] cursor-pointer"
            src={userIcon}
            alt="user"
          />
        </div>
      )}
      <div className="flex">
        <SearchBar />
      </div>
  {isUserLoggedIn ? (
        <Button
          className="flex items-center justify-center text-gray4 font-pop-light text-xl bg-transparent border-none shadow-none navbutton"
          type="primary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Button
          className="flex items-center justify-center text-gray4 font-pop-light text-xl bg-transparent border-none shadow-none navbutton"
          type="primary"
          onClick={showModal}
        >
          Entrar/Registrarse
        </Button>
      )}
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Login onLogin={handleLogin} />
        <LoginRegister />
      </Modal>
    </nav>
  );
}

export default NavBar;