import { Outlet } from "react-router-dom";
import Footer from "./footer";
import NavBar from "./NavBar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg font-sans">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
