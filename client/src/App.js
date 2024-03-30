import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "./App.scss";
import "./style.scss";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NavBar from "./components/navBar/NavBar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ArtWorks from "./pages/ArtWorks/ArtWorks";
import Marketplace from "./pages/MarketPlace/Marketplace";
import EventsPage from "./pages/EventsPage/EventsPage";
import VRGallery from "./pages/VrGallery/VrGallery";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminHome from "./pages/AdminDashboard/AdminHome";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ManageUsers from "./pages/ManageUsers/ManageUsers";

import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
import SellItem from "./pages/SellItem/SellItem";
import Product from "./pages/Product/Product";
import Friends from "./pages/Friends/Friends";
import Verification from "./pages/Verification/Verification";
import VerifyPage from "./pages/Verification/VerifyPage";
import AdminVerifyUsers from "./pages/AdminVerifyUser/AdminVerifyUser";

function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  console.log(darkMode);

  const userRole = currentUser ? currentUser.roleType : null;

  const userStatus = currentUser ? currentUser.status : null;

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <NavBar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  // Determine the home page based on user's role
  const HomePage = () => {
    if (userRole === "admin" && userStatus === "approved") {
      return <AdminHome />;
    } else if (userRole === "artist" && userStatus === "approved") {
      return <Home />;
    } else if (userStatus === "pending") {
      return <Verification />;
    } else {
      return null; // Handle other cases accordingly
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/Market",
          element: <Marketplace />,
        },
        {
          path: "/SellItem",
          element: <SellItem />,
        },
        {
          path: "/artworks",
          element: <ArtWorks />,
        },
        {
          path: "/events",
          element: <EventsPage />,
        },
        {
          path: "/VRGallery",
          element: <VRGallery />,
        },
        {
          path: "/Product/:id",
          element: <Product />,
        },
        {
          path: "/Friends",
          element: <Friends />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/AdminLogin",
      element: <AdminLogin />,
    },
    {
      path: "/AdminHome",
      element: <AdminHome />,
    },
    {
      path: "/AdminDashboard",
      element: <AdminDashboard />,
    },
  ]);

  const router_admin = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <AdminDashboard />,
        },
        {
          path: "/AdminUsers",
          element: <AdminUsers />,
        },
        {
          path: "/ManageUsers",
          element: <ManageUsers />,
        },
        {
          path:"VerifyUsers",
          element: <AdminVerifyUsers/>
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/AdminLogin",
      element: <AdminLogin />,
    },
  ]);

  const verification_router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <VerifyPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  const selectedRouter =
    userRole === "admin"
      ? router_admin
      : userStatus === "pending"
      ? verification_router
      : router;

  return (
    <div>
      <RouterProvider router={selectedRouter} />
    </div>
  );
}

export default App;
