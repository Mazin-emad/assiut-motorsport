import Dashboard from "../Components/dashboard/Dashboard";
import NavBar from "../layout/NavBar";
import { Link } from "react-router-dom";
import { getToken } from "../context/localstorageAPI";

const DashboardPage = () => {
  const token = getToken();

  return (
    <>
      <NavBar />
      {token ? (
        <Dashboard />
      ) : (
        <div className="flex justify-center items-center h-screen bg-bgMain">
          <h1 className="text-2xl font-bold text-white">
            You are not authorized to access this page,{" "}
            <Link to="/login">
              <span className="text-blue-500">Login</span>
            </Link>
          </h1>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
