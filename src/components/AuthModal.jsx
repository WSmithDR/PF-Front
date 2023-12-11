import { useState, useEffect } from "react";
import { Modal } from "antd";
import LoginRegister from "./Login-register/LoginRegister";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const AuthModal = ({ isOpen, onClose, onLogout }) => {
  const successPostTokenGoogle = useSelector((state) => state.successPostTokenGoogle);
  const successPostUser = useSelector((state) => state.successPostUser);
  const successPostLogin = useSelector((state) => state.successPostLogin);
  const location = useLocation();

  const [showModalFor2Seconds, setShowModalFor2Seconds] = useState(false);
  const [modalAlreadyShown, setModalAlreadyShown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const shouldShowModal = () => (
      (successPostTokenGoogle || successPostUser || successPostLogin) &&
      !modalAlreadyShown &&
      isOpen
    );

    if (shouldShowModal()) {
      setShowModalFor2Seconds(true);

      timer = setTimeout(() => {
        setShowModalFor2Seconds(false);
        onClose();

        if (location.pathname === "/home") {
          navigate("/home");
        }

        setModalAlreadyShown(true);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [successPostTokenGoogle, successPostUser, successPostLogin, onClose, navigate, modalAlreadyShown, isOpen, location]);

  useEffect(() => {
    setShowModalFor2Seconds(isOpen && !modalAlreadyShown);
  }, [isOpen, modalAlreadyShown]);

  useEffect(() => {
    if (modalAlreadyShown) {
      setShowModalFor2Seconds(false);
    }
  }, [modalAlreadyShown]);

  useEffect(() => {
    if (location.pathname !== "/home") {
      setModalAlreadyShown(false);
      setShowModalFor2Seconds(false);
    }
  }, [location]);

  return (
    <Modal
      key={location.key}
      title=""
      open={showModalFor2Seconds}
      onOk={onClose}
      onCancel={onClose}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <LoginRegister />
    </Modal>
  );
};

export default AuthModal;
