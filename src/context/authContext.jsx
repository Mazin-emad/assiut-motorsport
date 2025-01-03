import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ADMIN_SIGNUP_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_AUTH_SIGNUP
}`;
const SECRET_KEY_VALIDATE_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_AUTH_VALIDATE_SECRET
}`;

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const validateSecretKeyFetch = async (secretKey) => {
  const response = await fetch(SECRET_KEY_VALIDATE_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ secretKey }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid secret key");
  }

  const data = await response.json();
  return data;
};

async function signup({ name, email, password, passwordConfirm }, token) {
  if (!token) {
    throw new Error("Token is required");
  }

  try {
    const response = await fetch(ADMIN_SIGNUP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      if (responseData.error && Array.isArray(responseData.error)) {
        // Combine all error messages
        const errorMessage = responseData.error
          .map((err) => err.msg)
          .join(", ");
        throw new Error(errorMessage);
      }
      throw new Error(responseData.message || "Failed to sign up");
    }

    return responseData;
  } catch (error) {
    console.error("Signup error details:", error);
    throw error;
  }
}

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const validateMutation = useMutation({
    mutationFn: validateSecretKeyFetch,
  });

  const signupMutation = useMutation({
    mutationFn: (data) => signup(data, token),
  });

  const value = {
    setToken,
    token,
    validateSecretKey: validateMutation.mutate,
    validateStatus: validateMutation,
    signup: ({ name, email, password, passwordConfirm }, options = {}) =>
      signupMutation.mutate(
        { name, email, password, passwordConfirm },
        options
      ),
    signupStatus: signupMutation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
