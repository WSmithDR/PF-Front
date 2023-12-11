import Header from "./Header";
import Items from "./Items";

const Inventory = ({ title, products }) => {
  const columnTitles = ["Nombre", "Precio", "Cantidad", "Publicado"];

  return (
    <div className="mx-4 mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md" style={{ border: 'none' }}>
          <caption className="text-lg font-semibold p-4 text-blue-500">
            {title}
          </caption>
          <Header titles={columnTitles} />
          <Items products={products} />
        </table>
      </div>
    </div>
  );
};

export default Inventory;
