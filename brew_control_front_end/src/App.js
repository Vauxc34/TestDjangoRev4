 import React from "react";
 import { ToastContainer } from "react-toastify";
 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import 'react-toastify/dist/ReactToastify.css';

 /* components */

 import ViewTable from "./components/ViewTable";
import AddSomeDevice from "./components/AddSomeDevice";

 /* components */

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<ViewTable/>}>
        </Route>
        <Route path='/add-device' element={<AddSomeDevice/>}>
        </Route>
      </Routes>
      </Router>
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
