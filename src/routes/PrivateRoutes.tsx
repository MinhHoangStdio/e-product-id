import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";

const PrivateRoutes = () => {
  const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
  const Categories = Loadable(lazy(() => import("../pages/categories")));
  const Products = Loadable(lazy(() => import("../pages/products")));
  const ProductDetail = Loadable(lazy(() => import("../pages/products/detail")));
  return (
    <MainLayout>
      <Routes>
        <Route path="/*" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </MainLayout>
  );
};

export default PrivateRoutes;
