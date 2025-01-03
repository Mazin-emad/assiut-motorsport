import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { saveTokenWithExpiration } from "../../context/localstorageAPI";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ADMIN_LOGIN_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_AUTH_LOGIN
}`;

const login = async ({ email, password }) => {
  const response = await fetch(ADMIN_LOGIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  const responseData = await response.json();
  return responseData;
};

const AdminLogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userLogin = useMutation({
    mutationFn: (data) => login(data),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    userLogin.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          saveTokenWithExpiration(data.token);
          navigate("/dashboard");
        },
        onError: (error) => {
          setError(error.message);
        },
      }
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bgMain">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Admin Log In</h1>
        {!userLogin.isLoading && error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-bgMain text-white px-4 py-2 rounded hover:bg-bgSection"
          disabled={userLogin.isLoading}
        >
          {userLogin.isLoading ? "Logging In..." : "Log In"}
        </button>
        <div className="mt-4 text-center">
          <Link to="/secret" className="text-bgSection hover:underline">
            Don&apos;t have an account? Sign Up
          </Link>
        </div>
        <div className="mt-4 text-center">
          <Link to="/forget" className="text-bgSection hover:underline">
            Forget Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogInPage;
