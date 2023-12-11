import CardsUserProduct from "../../components/CardsUserProduct";
import { getUserProducts } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { NavLink } from "react-router-dom";


const AdminDashboard = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.userProducts?.users);
  const products = useSelector((state) => state.userProducts?.products);
  const productDeletedCount = useSelector((state) => state.userProducts?.productDeletedCount);
  const productNotDeletedCount = useSelector((state) => state.userProducts?.productNotDeletedCount);
  const userAdminCount = useSelector((state) => state.userProducts?.userAdminCount);
  const userNotAdminCount = useSelector((state) => state.userProducts?.userNotAdminCount);

  useEffect(() => {
    dispatch(getUserProducts());
  }, [dispatch]);

  useEffect(() => {
    if (users && products) {
      renderUsersChart(users);
      renderCommercesChart(products);
    }
  }, [users, products]);

  const renderUsersChart = (usersData) => {
    destroyChart("usersChart"); 
    const usersChartCanvas = document.getElementById("usersChart");
    new Chart(usersChartCanvas, {
      type: "bar",
      data: {
        labels: ["Administradores", "Usuarios"],
        datasets: [
          {
            label: "Usuarios",
            data: [
              userAdminCount,
              userNotAdminCount,
            ],
            backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom' 
        }
      }
    });
  };

  const renderCommercesChart = (productsData) => {
    destroyChart("commercesChart"); 
    const commercesChartCanvas = document.getElementById("commercesChart");
    new Chart(commercesChartCanvas, {
      type: "doughnut",
      data: {
        labels: ["Productos desactivados", "Productos activos"],
        datasets: [
          {
            data: [
              productDeletedCount,
              productNotDeletedCount,
            ],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
            borderWidth: 1,
            
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom' 
        }
      }
    });
  };

  const destroyChart = (chartId) => {
    const existingChart = Chart.getChart(chartId);
    if (existingChart) {
      existingChart.destroy();
    }
  };

  return (
    <div>
      <div className="flex-1 pb-5 bg-gray-900 p-4 ml-72">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-2">
      
          <div className="text-center align-center justify-center">
            <div className="bg-white p-4 rounded-md">
              <h2 className="text-gray-500 text-lg font-semibold pb-1">Usuarios</h2>
              <div className="my1-"></div> 
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px  mb-6"></div> 
              <div className="chart-container" style={{ position: 'relative', height: '150px', width: '100%' }}>
                <canvas id="usersChart"></canvas>
              </div>
            </div>
          </div>

          <div className="text-center align-center justify-center">
            <div className="bg-white p-4  rounded-md">
              <h2 className="text-gray-500 text-lg font-semibold pb-1">Productos</h2>
              <div className="my1-"></div> 
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
              <div className="chart-container" style={{ position: 'relative', height: '150px', width: '100%' }}>
                <canvas id="commercesChart"></canvas>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-500 text-lg font-semibold pb-4">Usuarios</h2>
            <div className="my-1"></div>
            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 

            <table className="w-full text-center align-center jusntify-center table-auto text-sm">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Img</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nombre</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Rol</th>
                </tr>
              </thead>
              { users?.map((user) => (
                <CardsUserProduct
                  key={user._id}
                  img={user.img}
                  name={user.name}
                  admin={user.admin === false ? "Usuario" : "Administrador"}
                />
              ))
              }
            </table>

            <div className="text-center align-center junsitfy-center mt-4">
              <NavLink to={'/dashboard/users'} class="text-center align-center junsitfy-center mt-4">
                <button className="bg-cyan-500 text-center align-center justify-center hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                  Ver más
                </button>
              </NavLink>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md ">
            <h2 className="text-gray-500 text-lg font-semibold pb-4">Productos</h2>
            <div className="my-1"></div> 
            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Img</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nombre</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">Precio</th>
                </tr>
              </thead>
              { products?.map((product) => (
                <CardsUserProduct
                  key={product._id}
                  img={product.img}
                  name={product.name}
                  price={product.price}
                />
              ))
              }
            </table>
            
            <div className="text-center align-center junsitfy-center mt-4">
              <NavLink to={'/dashboard/products'} class="text-right mt-4">
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                  Ver más
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
