import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SelectCategories from "./pages/SelectCategories";
import Arrange from "./pages/Arrange";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import GoogleOAuthSuccess from "./pages/GoogleOAuthSuccess";
import GoogleOAuthError from "./pages/GoogleOAuthError";
import { AuthProvider } from "./context/AuthContext";
import ProtectedData from "../src/components/ProtectedData";
import Navbar from "./components/Navbar";

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
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/google/success" element={<GoogleOAuthSuccess />} />
          <Route path="/auth/google/error" element={<GoogleOAuthError />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
