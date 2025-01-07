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
      path: "/group-picture",
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
