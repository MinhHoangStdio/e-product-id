import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

const PublicRoutes = () => {
  const AuthLogin = Loadable(lazy(() => import("../pages/auth")));
  return (
    <MinimalLayout>
      <Routes>
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </MinimalLayout>
  );
};

export default PublicRoutes;
