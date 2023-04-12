import AppContainer from "./components/Container/AppContainer";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./components/Pages/User/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Pages/Admin/Dashboard";
import Sidebar from "./components/Admin/Sidebar";
import Settings from "./components/Pages/Admin/Settings";
import Tables from "./components/Pages/Admin/Tables";
import Users from "./components/Pages/Admin/Users";
import LocationInput from "./components/Auth/LocationInput";

function App() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("profile"));
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <>
        <Sidebar />{" "}
        <div className="md:ml-64">
          <Routes>
            <Route path="/admin" exact Component={Dashboard} />
            <Route path="/admin/settings" Component={Settings} />
            <Route path="/admin/tables" Component={Tables} />
            <Route path="/admin/users" Component={Users} />
          </Routes>
        </div>
      </>
    );
  }

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
      <AppContainer>
        <Navbar />
        <Routes>
          <Route
            path="/"
            exact
            Component={() =>
              !user ? <LandingPage /> : <Navigate to="/posts" />
            }
          />

          <Route path="/posts" exact Component={Home} />
          <Route path="/location" exact Component={LocationInput} />

          <Route path="/posts/search" exact Component={Home} />
          <Route path="/posts/:id" Component={PostDetails} />
          <Route
            path="/auth"
            exact
            Component={() => (!user ? <Auth /> : <Navigate to="/posts" />)}
          />
        </Routes>
      </AppContainer>
    </GoogleOAuthProvider>
  );
}

export default App;
