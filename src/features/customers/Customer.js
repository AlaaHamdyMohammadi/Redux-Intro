import { useSelector } from "react-redux";

function Customer() {
  //store.customer -> the name of key in object in combineReducers method.
  const customer = useSelector((store) => store.customer.fullName)
  console.log(customer);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
