
import Help from "./Components/Help";
import Home from "./Components/Home";

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {
  return (
  <>
  <div className=" p-[20px] text-white min-h-screen bg-gradient-to-r from-[#0575E6] to-[#021B79]">
  <Router>
    <Routes>
      <Route path="/" element={ <Home/>}/>
      <Route path="/help" element={ <Help/>}/>
    </Routes>
  </Router>
 
  
  </div>
  </>
  );
}

export default App;
