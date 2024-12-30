import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const forgetPass = async (email) => {
  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/admin/forgetPassword",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const responseData = await response.json();
  return responseData;
};

const ForgetPassPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const forgetPassMutation = useMutation({
    mutationFn: forgetPass,
    onSuccess: (data) => {
      console.log("Password reset email sent successfully", data.message);
      navigate("/code", {
        state: { email },
      });
    },
    onError: (error) => {
      console.error("Error sending password reset email:", error);
      setError(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    forgetPassMutation.mutate(email);
  };

  return (
    <div className="bg-bgMain flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white w-full max-w-md p-8 rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Forget Password</h1>
        {!forgetPassMutation.isLoading && error && (
          <p className="text-red-500">{error}</p>
        )}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgMain"
          />
        </div>
        <button
          type="submit"
          disabled={forgetPassMutation.isLoading}
          className={`w-full py-2 px-4 rounded-lg ${
            forgetPassMutation.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-bgMain hover:bg-bgSection text-white font-bold"
          }`}
        >
          {forgetPassMutation.isPending ? "Sending..." : "Send Code"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassPage;
