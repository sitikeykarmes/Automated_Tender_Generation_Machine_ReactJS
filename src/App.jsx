import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SelectCategories from "./pages/SelectCategories";
import Arrange from "./pages/Arrange";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedData from "../src/components/ProtectedData";
import Navbar from "./components/Navbar";
// ... inside your component tree:
<ProtectedData />;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-categories" element={<SelectCategories />} />
          <Route path="/arrange" element={<Arrange />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} /> {/* Profile page */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
