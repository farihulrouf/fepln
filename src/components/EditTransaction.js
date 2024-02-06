import React, { useRef, useState } from 'react';
import  PrintComponent from "./PrintComponent";
//export default function
const EditTransaction = () => {
  // set an initial state for the message we will receive after the API call
  const [message, setMessage] = useState("");


  return (
    <div>
      <h1 className="text-center">Free Component</h1>

      {/* displaying our message from our API call */}
     

      <PrintComponent />
    </div>
  );
}
export default EditTransaction;
