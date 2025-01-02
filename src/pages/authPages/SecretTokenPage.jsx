import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const SecretTokenPage = () => {
  const [secret, setSecret] = useState("");
  const { validateSecretKey, validateStatus, token, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/signup");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!secret) {
      alert("Token is required");
      return;
    }

    validateSecretKey(secret, {
      onSuccess: (data) => {
        console.log("Validation successful, received data:", data);
        if (data && data.token) {
          setToken(data.token);
        } else {
          console.error("No token in response data:", data);
        }
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bgSection">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-secondary">
          Enter Secret Key
        </h1>
        {!validateStatus.isLoading && validateStatus.error && (
          <div className="mb-4 text-red-500">
            {validateStatus.error.message}
          </div>
        )}
        <div className="mb-4">
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-textPrimary"
            placeholder="Your Secret Key"
            disabled={validateStatus.isLoading}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 bg-bgMain text-white font-semibold rounded-lg hover:bg-bgSection focus:outline-none focus:ring-2 focus:ring-textPrimary ${
            validateStatus.isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={validateStatus.isLoading}
        >
          {validateStatus.isLoading ? "Submitting..." : "Submit"}
        </button>
        <Link to="/login">Have an account? Login</Link>
      </form>
    </div>
  );
};

export default SecretTokenPage;
