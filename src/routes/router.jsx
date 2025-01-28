import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import { ProtectedRoute } from "@/routes/protect-route";
import Dashboard from "@/pages/dashboard/dashboard";
import Reservation from "@/pages/reservation/reservation";
import NotFound from "@/pages/404/not-found";
import Room from "@/pages/room/room";
import Department from "@/pages/department/department";
import Position from "@/pages/position/position";
import Customer from "@/pages/customer/customer";
import Employee from "@/pages/employee/employee";
import POS from "@/pages/pos/pos";
import Product from "@/pages/product/product";
import ProductCategory from "@/pages/product-category/product-category";
import RoomPicture from "@/pages/room-picture/room-picture";
import Authentication from "@/pages/authentication/authentication";
import Home from "@/pages/home/home";
import Auth from "@/pages/auth/auth";
import Test from "./../pages/test/test";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/reservation",
      element: <Reservation />,
    },
    {
      path: "/room",
      element: <Room />,
    },
    {
      path: "/department",
      element: <Department />,
    },
    {
      path: "/position",
      element: <Position />,
    },
    {
      path: "/customer",
      element: <Customer />,
    },
    {
      path: "/employee",
      element: <Employee />,
    },
    {
      path: "/pos",
      element: <POS />,
    },
    {
      path: "/product",
      element: <Product />,
    },
    {
      path: "/pcategory",
      element: <ProductCategory />,
    },
    {
      path: "/rpicture",
      element: <RoomPicture />,
    },
    {
      path: "/authentication",
      element: <Authentication />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "auth",
          element: <Navigate to="/" />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/auth",
      element: <Auth />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
