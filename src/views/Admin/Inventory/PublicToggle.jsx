import { useState } from "react";
import { useDispatch } from "react-redux";
import Switch from "react-switch";
import { deleteProduct } from "../../../redux/actions";

const PublicToggle = ({ id, deleted }) => {
  const [toggleSwitch, setToggleSwitch] = useState(!deleted);
  const dispatch = useDispatch();

  const handleChange = (checked) => {
    setToggleSwitch(checked);
    dispatch(deleteProduct(id));
  };

  return (
    <Switch
        onChange={handleChange}
        checked={toggleSwitch}
        onColor="#2196f3"/>
  );
};

export default PublicToggle;
