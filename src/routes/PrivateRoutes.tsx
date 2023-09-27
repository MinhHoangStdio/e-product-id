import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";

const PrivateRoutes = () => {
  const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
  const Categories = Loadable(lazy(() => import("../pages/categories")));
  const Products = Loadable(lazy(() => import("../pages/products")));
  const ProductDetail = Loadable(
    lazy(() => import("../pages/products/detail"))
  );
  const Users = Loadable(lazy(() => import("../pages/users")));
  const UserDetail = Loadable(lazy(() => import("../pages/users/detail")));
  const Organizations = Loadable(lazy(() => import("../pages/organization")));
  const OrganizationDetail = Loadable(
    lazy(() => import("../pages/organization/detail"))
  );
  const Consignments = Loadable(lazy(() => import("../pages/consignments")));
  const ConsignmentDetail = Loadable(
    lazy(() => import("../pages/consignments/detail"))
  );
  const ChangePwd = Loadable(lazy(() => import("../pages/changePwd")));

  return (
    <MainLayout>
      <Routes>
        <Route path="/*" element={<Navigate to="/categories" />} />
        <Route path="/login" element={<Navigate to="/categories" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/:id" element={<OrganizationDetail />} />
        <Route path="/consignments" element={<Consignments />} />
        <Route path="/consignments/:id" element={<ConsignmentDetail />} />
        <Route path="/change-password" element={<ChangePwd />} />
      </Routes>
    </MainLayout>
  );
};

export default PrivateRoutes;
