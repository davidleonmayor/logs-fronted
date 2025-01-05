import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AuthLayout from "./layouts/Auth";
// import AppLayout from "./layouts/AppLayout";
import { MainNavbar } from "./layouts/MainNavbar";
import { NewProduct } from "./views/NewProduct";
// import LinkTree from "./views/LinkTree";
// import Profile from "./views/Profile";
// import Login from "./views/Login";
// import Register from "./views/Register";
// import Handle from "./views/Handle";
import { NotFound } from "./views/NotFound";
import { ProductCatalog } from "./views/ProductCatalog";
// import Home from "./views/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* View Auth */}
        {/* <Route element={<AuthLayout />}>
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/login" element={<Login />} />
        </Route> */}

        {/* View config user profile */}
        <Route path="/" element={<div>home layout</div>} />
        <Route path="/clients" element={<MainNavbar />} />

        {/* Rutas con el layout fijo */}
        <Route element={<MainNavbar />}>
          <Route path="/inventory/new-product" element={<NewProduct />} />
          <Route path="/inventory/products" element={<ProductCatalog />} />
          <Route path="/inventory/test" element={<NewProduct />} />
        </Route>

        {/* <Route path="/admin" element={<AppLayout />}>
          <Route index={true} element={<LinkTree />} />
          <Route path="profile" element={<Profile />} />
        </Route> */}

        {/* View user profile */}
        {/* <Route path="/:handle" element={<AuthLayout />}>
          <Route index={true} element={<Handle />} />
        </Route> */}

        {/* Ruta para página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
