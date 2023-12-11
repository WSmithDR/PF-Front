import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/actions";

const Item = ({ product }) => {
  const { name, price, quantity, _id } = product;
  const dispatch = useDispatch();

const handleDeleteProduct = () => {
  dispatch(deleteProduct(_id));
};

  return (
    <tr className="hover:bg-blue-50 transition duration-300 ease-in-out rounded-lg border-b my-2">
      <td className="px-4 py-2 text-center">{name}</td>
      <td className="px-4 py-2 text-center">{price}</td>
      <td className="px-4 py-2 text-center">{quantity}</td>
      <td className="px-4 py-2 text-center flex items-center justify-center">
      <button
          onClick={handleDeleteProduct}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
        >
          Desactivar
        </button>
      </td>
    </tr>
  );
};

export default Item;
