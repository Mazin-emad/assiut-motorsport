import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { saveTokenWithExpiration } from "../../context/localstorageAPI";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REST_PASS_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_AUTH_RESET_PASSWORD
}`;

const restPass = async ({ email, newPassword }) => {
  const response = await fetch(REST_PASS_ENDPOINT, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      newPassword,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const responseData = await response.json();
  return responseData;
};

const RestPassPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const restPassFunc = useMutation({
    mutationFn: restPass,
  });

  const email = location.state?.email;

  const handelSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    if (!newPassword) {
      setError("Please enter your new password.");
      return;
    }
    restPassFunc.mutate(
      { email, newPassword },
      {
        onSuccess: (data) => {
          saveTokenWithExpiration(data.token);
          navigate("/dashboard");
        },
        onError: (error) => {
          console.error("Error sending password reset email:", error);
          setError(error.message);
        },
      }
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-[600px] bg-bgSection">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-bgMain">Reset Password</h1>
        {!restPassFunc.isLoading && error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <form onSubmit={handelSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-bgMain mb-2">
              Email
            </label>
            <input
              value={email}
              id="email"
              readOnly
              type="email"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="restpass" className="block text-bgMain mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="restpass"
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
            className="bg-bgMain hover:bg-bgSection text-white font-bold py-2 px-4 rounded w-full"
          >
            {restPassFunc.isLoading ? "Loading..." : "Reset"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestPassPage;
