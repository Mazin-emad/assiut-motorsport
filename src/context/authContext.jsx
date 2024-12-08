import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

async function checkSecretKey(secretKey) {
  try {
    const response = await fetch(
      "https://sport-production-f4dc.up.railway.app/api/validate-secert",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secretKey }),
      }
    );
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const { data } = await response.json();
    console.log("Check Secret Key Response:", data);
    return data;
  } catch (error) {
    console.error("Failed to check secret key:", error);
    throw error;
  }
}
async function signup(username, password, token) {
  try {
    const response = await fetch(
      "https://sport-production-f4dc.up.railway.app/api/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    console.log("Signup Response:", data);
    return data;
  } catch (error) {
    console.error("Failed to signup:", error);
    throw error;
  }
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckSecretKey = async (token) => {
    setLoading(true);
    try {
      const signupToken = await checkSecretKey(token);
      setToken(signupToken);
    } catch (err) {
      setError("there was an error" + err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (username, password) => {
    setLoading(true);
    try {
      await signup(username, password, token);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, handleSignup, loading, error, handleCheckSecretKey }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
