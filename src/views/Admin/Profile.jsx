import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, putUserData, getAdminProducts } from "../../redux/actions";
import ProductCreated from './ProductCreated';

const Profile = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const userData = useSelector((state) => state.userData);
  const adminProducts = useSelector((state) => state.adminProducts);

  const quantityProducts = adminProducts.flatMap((purchase) => purchase).length;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData(userId));
    dispatch(getAdminProducts(userId));
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

  const [sectionMyProducts, setSectionMyProducts] = useState(false);

  const handleSectionChange = (section) => {
    setSectionMyProducts(!sectionMyProducts);
  }

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

    dispatch(putUserData(userId, updatedData));
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
    <div className="p-5 pt-10 bg-gray-900 ml-72 h-full min-h-[100vh]">
      <div className="p-5 rounded-xl bg-blue-200 shadow mt-9 h-full">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-10 md:mt-0">
            <div className='cursor-pointer bg-gray-900 hover:bg-gray-700 rounded-lg mr-1 hover-text-gray-900'onClick={handleSectionChange}>
              <p className="text-gray-50 text-xl">{quantityProducts}</p>
              <p className="font-bold pb-1 text-gray-50">Creados</p>
            </div>
            <div className='cursor-pointer mr-1 hover:bg-gray-700 bg-gray-900 rounded-lg'>
              <p className="text-gray-50 text-xl">10</p>
              <p className="font-bold text-gray-50">Ventas</p>
            </div>
            <div className='cursor-pointer hover:bg-gray-700 bg-gray-900 mr-1 rounded-lg'>
              <p className="text-gray-50 text-xl">89</p>
              <p className="font-bold text-gray-50">Opiniones</p>
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

          { sectionMyProducts === false &&
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
          }
        </div>

        { sectionMyProducts === false &&
          <div className="mt-20 text-center border-b pb-5">

            <h1 className="text-4xl font-medium text-gray-700">
              {editMode ? (
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder={userData.name}
                  className="appearance-none w-72 text-white bg-gray-900 text-grey-darker border border-red rounded-lg py-1 px-4  placeholder-gray-900 text-center"
                />
              ) : (
                userData.name
              )}
            </h1>

            <p className="mt-3 text-xl text-gray-500">
              {editMode ? (
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder={userData.email}
                  className="appearance-none w-72 text-white bg-gray-900 text-grey-darker border border-red rounded-lg py-1 px-4  placeholder-gray-900 text-center"
                />
              ) : (
                userData.email
              )}
            </p>

              {editMode ? (
                <p className="mt-3 text-xl text-gray-500">
                  <input 
                    type="text" 
                    value={number || ''} 
                    onChange={(e) => setNumber(e.target.value)} 
                    placeholder={userData.number || 'Escribe tu numero de telefono'}
                    className="appearance-none w-72 text-white bg-gray-900 text-grey-darker border border-red rounded-lg py-1 px-4  placeholder-gray-900 text-center"
                  />
                </p>
              ) : (
                userData.number ? (
                  <p className="mt-5 text-xl text-gray-500">{userData.number}</p>
                ) : (
                  <p className="mt-5 text-xl text-gray-500">No hay telefono</p>
                )
              )}


              {editMode ? (
                <p className="mt-3 text-xl text-gray-500">
                  <input 
                    type="text" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder={userData.address || 'Escribe tu direccion'}
                    className="appearance-none w-72 text-white bg-gray-900 text-grey-darker border border-red rounded-lg py-1 px-4  placeholder-gray-900 text-center"
                  />
                </p>
              ) : (
                userData.address ? (
                  <p className="mt-5 text-xl text-gray-500">{userData.address}</p>
                ) : (
                  <p className="mt-5 text-xl text-gray-500">No hay direccion</p>
                )
              )}

              {editMode ? (
                <p className="mt-3 text-xl text-gray-500">
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder={userData.password ? '*****' : 'No hay contraseña'}
                    className="appearance-none w-72 text-white bg-gray-900 text-grey-darker border border-red rounded-lg py-1 px-4 mb-1 placeholder-gray-900 text-center"
                  />
                </p>
              ) : (
                userData.password ? (
                  <p className="mt-5 text-xl text-gray-500">***********</p>
                ) : (
                  <p className="mt-5 text-xl text-gray-500">No hay contraseña</p>
                )
              )}
            </div>
        }

        { sectionMyProducts === true &&
          <div className='pt-10 '>
            <ProductCreated />
          </div>
        }
        
      </div>
    </div>
  );
}

export default Profile;
