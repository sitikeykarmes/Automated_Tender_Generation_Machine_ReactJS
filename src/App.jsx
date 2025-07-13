import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Arrange from "./pages/Arrange";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import ProtectedData from "../src/components/ProtectedData";
// ... inside your component tree:
<ProtectedData />;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arrange" element={<Arrange />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
