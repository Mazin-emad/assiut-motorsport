import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const SecretTokenPage = () => {
  const [token, setToken] = useState("");
  const { handleCheckSecretKey, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.log("Token is required");
      return;
    }
    try {
      await handleCheckSecretKey(token);

      console.log("Token submitted:", token);
    } catch (err) {
      console.error("Error submitting token:", err);
    }
    setTimeout(() => {
      if (!error && !loading) {
        navigate("/signup");
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-secondary">
          Enter Secret Token
        </h1>
        {error && <div className="mb-4 text-red-500">{"" + error}</div>}
        <div className="mb-4">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your Secret Token"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SecretTokenPage;
