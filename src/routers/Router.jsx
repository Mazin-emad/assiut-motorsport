import { Routes, Route } from "react-router-dom";
import GalleryPage from "../pages/GalleryPage";
import DashboardPage from "../pages/DashboardPage";
import CollectionPage from "../pages/CollectionPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layout/MainLayout";
import TeamMembersPage from "../pages/TeamMembersPage";
import AdminLogInPage from "../pages/authPages/AdminLogInPage";
import AdminSignUpPage from "../pages/authPages/AdminSignUpPage";
import SecretTokenPage from "../pages/authPages/SecretTokenPage";
import ForgetPassPage from "../pages/authPages/ForgetPassPage";
import RestCodePage from "../pages/authPages/RestCodePage";
import RestPassPage from "../pages/authPages/RestPassPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<AdminLogInPage />} />
        <Route path="/secret" element={<SecretTokenPage />} />
        <Route path="/signup" element={<AdminSignUpPage />} />
        <Route path="/forget" element={<ForgetPassPage />} />
        <Route path="/code" element={<RestCodePage />} />
        <Route path="/restpass" element={<RestPassPage />} />
        <Route path="/gallery">
          <Route index element={<GalleryPage />} />
          <Route path=":id" element={<CollectionPage />} />
        </Route>
        <Route path="/team" element={<TeamMembersPage />} />
      </Route>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
