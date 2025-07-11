import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Arrange from "./pages/Arrange";

import ProtectedData from "../src/components/ProtectedData";
// ... inside your component tree:
<ProtectedData />



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arrange" element={<Arrange />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
