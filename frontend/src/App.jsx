import {Route , Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";

function App(){
  return(
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path = "/register" element={<Register/>}/>
      <Route path = "/dashboard" element={<Dashboard/>}/>

    </Routes>
  );
};

export default App;
