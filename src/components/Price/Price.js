import React, { useState } from "react";
import FormPrice from "./FormPrice";
import ListPrice from "./ListPrice";
import { useNavigate  } from "react-router-dom";

const Price = () => {
  const navigate = useNavigate();
  const [addprice, setAddprice] = useState(false);
  const [editprice,setEditprice] = useState(false)
  const handleAddChange = () => {
    setAddprice(!addprice)
  }
  return (
    <React.Fragment>
     <button className="px-6 py-2 bg-teal-500" onClick={() => { navigate('/price/add') }}>Add</button>
     
        <div className="">
          <ListPrice stateChanger={handleAddChange} />
        </div>
   
    </React.Fragment>
  );
};
export default Price;
