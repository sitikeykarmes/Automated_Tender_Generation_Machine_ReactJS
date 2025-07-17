import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GoogleOAuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  // ✅ Add a ref to make sure login runs only once
  const hasLoggedIn = useRef(false);

  useEffect(() => {
    if (hasLoggedIn.current) return; // ❌ Prevent re-running

    const token = searchParams.get("token");
    const userStr = searchParams.get("user");

    if (!token || !userStr) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userStr));
      login(user, token); // 🔁 Causes state update
      hasLoggedIn.current = true; // ✅ Prevent infinite loop
      navigate("/account", { replace: true });
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login", { replace: true });
    }
  }, [login, navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Completing Google Sign-in...
        </h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}
