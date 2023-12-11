import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData, putUserData, getUserPurchases } from "../../redux/actions";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const ProfileUser = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const userData = useSelector((state) => state.userData);
  const userPurchase = useSelector((state) => state.userPurchase);

  const quantityPurchases = userPurchase.flatMap((purchase) => purchase.products).length;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserData(userId));
    dispatch(getUserPurchases(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setImg(userData.img || '');
    setName(userData.name || '');
    setEmail(userData.email || '');
    setNumber(userData.number || '');
    setAddress(userData.address || '');
    setPassword(userData.password || '');
  }, [userData]);

  const [editMode, setEditMode] = useState(false);

  const [img, setImg] = useState(userData.img);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [number, setNumber] = useState(userData.number);
  const [address, setAddress] = useState(userData.address);
  const [password, setPassword] = useState(userData.password);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = () => {
    const updatedData = {};

    if (name !== userData.name) {
      updatedData.name = name;
    }

    if (email !== userData.email) {
      updatedData.email = email;
    }

    if (number !== userData.number) {
      updatedData.number = number;
    }

    if (address !== userData.address) {
      updatedData.address = address;
    }

    if (password !== userData.password) {
      updatedData.password = password;
    }

    if (img !== userData.img) {
      updatedData.img = img;
    }

    dispatch(putUserData(userId, updatedData)).then(() => {
      setAdmin(updatedData.admin);
    });
  
    setEditMode(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImg(file)
  };

  const isDataChanged = () => {
    return (
      name !== userData.name ||
      email !== userData.email ||
      number !== userData.number ||
      address !== userData.address ||
      password !== userData.password ||
      img !== userData.img
    );
  };  
  
  return (
    <div className="p-5 bg-gray-900 pt-5 mt-8 h-full min-h-[100vh]">  
      <div className="p-5 rounded-xl bg-blue-200 shadow mt-8 h-full">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-10 md:mt-0">

            <div 
              className='cursor-pointer bg-gray-900 hover:bg-gray-700 rounded-lg mr-1 hover-text-gray-900'
              onClick={() => navigate('/profile/purchase')}
            >
              <p className="text-gray-50 text-xl">{quantityPurchases}</p>
              <p className="font-bold pb-1 text-gray-50">Mis compras</p>
            </div>

            <div 
              className='cursor-pointer bg-gray-900 hover:bg-gray-700 rounded-lg mr-1 hover-text-gray-900'
            >
              <p className="text-gray-50 text-xl">0</p>
              <p className="font-bold pb-1 text-gray-50">Mis opiniones</p>
            </div>
          </div>

          <div className="relative">
            <div  className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center overflow-hidden">
            {editMode ? (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="img"
                  onChange={handleImageChange}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    zIndex: 2,
                    cursor: 'pointer',
                  }}
                />
               {img ? (
                  <img
                    src={img instanceof Blob ? URL.createObjectURL(img) : img}
                    alt={`${userData.name} image preview`}
                    className="object-cover w-full h-full "
                  />
                ) : (
                  <img
                    src={userData.img ? userData.img : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'}
                    alt=""
                    className="object-cover w-full h-full "
                  />
                )}
              </div>
            ) : (
              <img
                src={userData.img ? userData.img : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'}
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            )}
            </div>
          </div>

          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            { editMode ? (
              <button onClick={handleEditClick} className="text-white py-2 px-4 rounded-xl uppercase rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Cancelar</button>
            ) : (
              <button onClick={handleEditClick} className="text-white py-2 px-4 rounded-xl uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Editar</button>
            )}
            {editMode && (
              <button
                onClick={handleSaveClick}
                disabled={!isDataChanged()}
                className={`text-white py-2 px-4 rounded-xl uppercase rounded ${
                  isDataChanged() ? 'bg-green-400 hover:bg-green-500' : 'bg-gray-500 cursor-not-allowed'
                } shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5`}
              >
                Guardar
              </button>
            )}
          </div>
        </div>

        <div className="mt-20 text-center pb-5">
          <h1 className="text-4xl font-medium text-gray-700">
            {editMode ? (
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder={userData.name}
                className="appearance-none w-72 text-white bg-gray-900 text-grey-darker border border-red rounded-lg px-4  placeholder-gray-500 text-center"
              />
            ) : (
              userData.name
            )}
          </h1>

          <p className="mt-3 text-xl text-gray-700">
            {editMode ? (
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder={userData.email}
                className="appearance-none w-72 text-white bg-gray-900 text-grey-darker border border-red rounded-lg py-1 px-1  placeholder-gray-500 text-center"
              />
            ) : (
              userData.email
            )}
          </p>

          {editMode ? (
            <p className="mt-3 text-xl text-gray-700">
              
              <input 
                type="text" 
                value={number || ''} 
                onChange={(e) => setNumber(e.target.value)} 
                placeholder={userData.number || 'Escribe tu numero de telefono'}
                className="appearance-none w-72 text-white bg-gray-900 text-grey-darker border border-red rounded-lg py-1 px-4  placeholder-gray-500 text-center"
              />
            </p>
          ) : (
            userData.number ? (
              <p className="mt-5 text-xl text-gray-700">{userData.number}</p>
            ) : (
              <p className="mt-5 text-xl text-gray-700">No hay telefono</p>
            )
          )}

          {editMode ? (
            <p className="mt-3 text-xl text-gray-700">
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder={userData.address || 'Escribe tu direccion'}
                className="appearance-none w-72 text-white bg-gray-900 text-grey-darker border border-red rounded-lg py-1 px-4  placeholder-gray-500 text-center"
              />
            </p>
          ) : (
            userData.address ? (
              <p className="mt-5 text-xl text-gray-700">{userData.address}</p>
            ) : (
              <p className="mt-5 text-xl text-gray-700">No hay direccion</p>
            )
          )}

          {editMode ? (
            <p className="mt-3 text-xl text-gray-700">
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder={userData.password ? '*****' : 'No hay contraseña'}
                className="appearance-none w-72 text-white bg-gray-900 text-grey-darker border border-red rounded-lg py-1 px-4 mb-1 placeholder-gray-500 text-center"
              />
            </p>
          ) : (
            userData.password ? (
              <p className="mt-5 text-xl text-gray-700">***********</p>
            ) : (
              <p className="mt-5 text-xl text-gray-700">No hay contraseña</p>
            )
          )}

            <div/>
          </div>
        </div>
      <div/>
    </div>
  );
}

export default ProfileUser;