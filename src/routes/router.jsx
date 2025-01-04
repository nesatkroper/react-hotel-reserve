import { NavLink, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import { ProtectedRoute } from "@/routes/protect-route";
import Dashboard from "@/pages/dashboard/dashboard";
import Reservation from "@/pages/reservation/reservation";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/reservation",
      element: <Reservation />,
    },
    {
      path: "/",
      element: (
        <div>
          <div>About Us</div>
          <NavLink to="/reservation">Reserve</NavLink>
        </div>
      ),
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        // {
        //   path: "admin",
        //   element: <Dashboard />,
        // },
        // {
        //   path: "auth",
        //   element: <Navigate to="/" />,
        // },
        // {
        //   path: "*",
        //   element: <NotFound />,
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
