import ReactDOM from "react-dom/client";
import AuthService from "./utils/auth";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import App from "./App.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/Error";
import Fleet from "./pages/Fleet";
import UserMgt from "./pages/UserMgt";
import Landing from "./pages/Landing.js";
import Warehouse from "./pages/Warehouse";

// ProtectedRoute function to block access to website if user not loged in
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = AuthService.loggedIn();
  // Redirect to login if not logged in
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/landing",
        element: (
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/fleet",
        element: (
          <ProtectedRoute>
            <Fleet />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-mgt",
        element: (
          <ProtectedRoute>
            <UserMgt />
          </ProtectedRoute>
        ),
      },
      {
        path: "/warehouse",
        element: (
          <ProtectedRoute>
            <Warehouse />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
