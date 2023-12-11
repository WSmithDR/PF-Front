import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearData } from "../redux/actions";

const UserIcon = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData);
  
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearData());
    navigate("/home");
  };

  const handleClickOutside = (event) => {
    if (
      buttonRef.current &&
      dropdownRef.current &&
      !buttonRef.current.contains(event.target) &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownVisible(false);
    }
  };

  const handleClickOnImage = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div style={{ position: 'relative' }}>
      <img
        ref={buttonRef}
        id="avatarButton"
        type="button"
        data-dropdown-toggle="userDropdown"
        data-dropdown-placement="bottom-start"
        className="w-6 h-6 rounded-full cursor-pointer"
        src={userData.img}
        alt="User dropdown"
        onClick={handleClickOnImage}
      />

      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          id="userDropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 mt-2 w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{userData.name}</div>
            <div className="font-medium pt-2 truncate">{userData.email}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {userData.Admin && (
              <li>
                <NavLink
                  to={"/dashboard"}
                  onClick={handleClickOnImage}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to={userData.Admin ? "/dashboard/profile" : "/profile"}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleClickOnImage}

              >
                Perfil
              </NavLink>
            </li>
            {!userData.Admin && (
              <li>
                <NavLink
                  to={"/profile/purchase"}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleClickOnImage}
                >
                  Mis compras
                </NavLink>
              </li>
            )}
          </ul>
          <div className="py-1">
            <button
              className="block px-4 w-full py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-red-950 dark:text-gray-200 dark:hover:text-white"
              type="button"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserIcon;
