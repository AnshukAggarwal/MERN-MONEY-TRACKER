import { toast } from "react-toastify";

export const checkEmptyInputFields = (array) => {
  if (array.includes("")) {
    toast.error("Please add data in all fields", {
      position: "top-center",
      closeOnClick: true,
      autoClose: 3000,
    });
    return true;
  } else {
    return false;
  }
};

export const checkInputsAreSame = (value1, value2) => {
  if (value1 === value2) {
    return true;
  } else {
    toast.error("Passwords don't match", {
      position: "top-center",
      closeOnClick: true,
      autoClose: 3000,
    });
    return false;
  }
};
