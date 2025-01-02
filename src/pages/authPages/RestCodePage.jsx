import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RESET_CODE_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_AUTH_RESET_PASSWORD
}`;

const verifyRestCode = async ({ resetCode }) => {
  const reqBody = JSON.stringify({ resetCode });
  const response = await fetch(RESET_CODE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: reqBody,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

const RestCodePage = () => {
  const [resetCode, setResetCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!resetCode) {
      setError("Please enter your rest code.");
      return;
    }

    try {
      await verifyRestCode({ resetCode });
      setLoading(false);
      navigate("/restpass", { state: { email } });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bgSection">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Verify Rest Code</h1>
        {!loading && error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="restcode" className="block text-bgMain mb-2">
            Enter Rest Code
          </label>
          <input
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            id="restcode"
            type="number"
            className="w-full px-3 py-2 border border-bgMain rounded"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-bgMain hover:bg-bgSection text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Loading..." : "Verify Code"}
        </button>
      </form>
    </div>
  );
};

export default RestCodePage;
