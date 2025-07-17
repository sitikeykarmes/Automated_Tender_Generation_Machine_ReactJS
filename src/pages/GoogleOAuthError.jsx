import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function GoogleOAuthError() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const error = searchParams.get('error') || 'Unknown error occurred';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Google Sign-in Failed
          </h2>
          <p className="text-sm">{error}</p>
        </div>
        <p className="text-gray-600 mb-4">
          You will be redirected to the login page in a few seconds.
        </p>
        <button
          onClick={() => navigate('/login', { replace: true })}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}