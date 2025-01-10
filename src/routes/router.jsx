import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import { ProtectedRoute } from "@/routes/protect-route";
import Dashboard from "@/pages/dashboard/dashboard";
import Reservation from "@/pages/reservation/reservation";
import Layout from "@/components/app/layout";
import NotFound from "@/pages/404/not-found";
import Room from "@/pages/room/room";
import Department from "@/pages/department/department";
import Position from "@/pages/position/position";
import GroupPicture from "@/pages/group-picture/group-picture";
import Customer from "@/pages/customer/customer";
import Employee from "@/pages/employee/employee";
import POS from "@/pages/pos/pos";
import Product from "@/pages/product/product";
import ProductCategory from "@/pages/product-category/product-category";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/",
      element: <Layout />,
    },
    {
      path: "*",
      element: <NotFound />,
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
      path: "/item",
      element: <Product />,
    },
    {
      path: "/icategory",
      element: <ProductCategory />,
    },
    {
      path: "/rpicture",
      element: <GroupPicture />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
        // {
        //   path: "admin",
        //   element: <Dashboard />,
        // },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/auth",
      element: <p>auth</p>,
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
