 import React from "react";
 import { ToastContainer } from "react-toastify";
 import 'react-toastify/dist/ReactToastify.css';

 /* components */

 import ViewTable from "./components/ViewTable";

 /* components */

function App() {
  return (
    <div className="App">
      <ViewTable/>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
 
/>
<ToastContainer />
     </div>
  );
}

export default App;
