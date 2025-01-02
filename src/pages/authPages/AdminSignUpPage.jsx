import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { saveTokenWithExpiration } from "../../context/localstorageAPI";

const AdminSignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const { signup, signupStatus, token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/secret");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    if (!token) {
      setValidationError("No token available. Please get a valid token first.");
      return;
    }

    if (!username || !email || !password || !confirmPassword) {
      setValidationError("All fields are required");
      return;
    }

    if (username.length < 3) {
      setValidationError("Username must be at least 3 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters long");
      return;
    }

    const inputs = {
      name: username,
      email,
      password,
      passwordConfirm: confirmPassword,
    };

    signup(inputs, {
      onSuccess: (data) => {
        saveTokenWithExpiration(data.token);
        navigate("/dashboard");
      },
      onError: (error) => {
        console.error("Error signing up:", error);
        const errorMessage =
          error?.message || "Failed to sign up. Please try again.";
        setValidationError(errorMessage);
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Admin Sign Up</h1>
        {!signupStatus.isLoading && validationError && (
          <div className="mb-4 text-red-500">{validationError}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-bgMain text-white py-2 rounded font-bold ${
            signupStatus.isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={signupStatus.isLoading}
        >
          {signupStatus.isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AdminSignUpPage;
