import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import LoginRegister from "./Login-register/LoginRegister";
import SearchBar from "./SearchBar";
import homeicon from "../assets/icons/homeicon.png";

const NavBar = () => {
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

  return (
    <header className="fixed top-0 w-full bg-blue1 shadow-md z-50 px-[5vw] flex items-center justify-between p-2">
      <div className="flex">
        <img
          className="w-[100px] h-[50px] cursor-pointer "
          src={homeicon}
          alt="home"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex mb-0">
          <SearchBar/>
      </div>
     
        <Button
          className="mb-3 flex items-center justify-center text-gray4 font-pop-light text-xl bg-transparent border-none shadow-none navbutton"
          type="primary"
          onClick={showModal}
        >
          Entrar/Registrarse
        </Button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <LoginRegister />
      </Modal>
    </header>
  );
};

export default NavBar;