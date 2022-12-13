import React from "react";
import { useLocation } from "react-router-dom";

const EditTransaction = () => {
  const location = useLocation();
  console.log(location.state.data);
  return <div>EditTransaction</div>;
};

export default EditTransaction;
