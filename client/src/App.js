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

function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  console.log(darkMode);

  const userRole = currentUser ? currentUser.roleType : null;

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
            {/* <RightBar /> */}
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
    if (userRole === "admin") {
      return <AdminHome />;
    } else if (userRole === "artist") {
      return <Home />;
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

  const selectedRouter = userRole === "admin" ? router_admin : router;

  return (
    <div>
      <RouterProvider router={selectedRouter} />
    </div>
  );
}

export default App;
