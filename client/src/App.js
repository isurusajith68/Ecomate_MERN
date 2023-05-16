import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Resource from "./Pages/ResourceCenter/Resource";
import Sidebar from "./components/SideBar/Sidebar";
import AddResource from "./Pages/AddResource/AddResource";
import EditPost from "./Pages/ResourceCenter/editpost";
import SingleAdminPost from "./Pages/AdminPost/SingleAdminPost";
import Aresource from "./Pages/ResourceCenter/clientresource";
import SinglePost from "./Pages/SinglePost/SinglePost";
import Services from "./Pages/Servicesyug/Servicess"
import ServicessList from "./Pages/Servicesyug/ServicessList";
import { AuthorizeUser } from "./middleware/auth";
import { Authorized } from "./middleware/auth";
import EditServicess from "./Pages/Servicesyug/EditServicess";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthorizeUser>
        <Home />
      </AuthorizeUser>
    ),
  },
  {
    path: "/login",
    element: (
      <Authorized>
        <Login />
      </Authorized>
    ),
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: (
      <AuthorizeUser>
        <Dashboard />
      </AuthorizeUser>
    ),
  },
  {
    path: "/resource",
    element: (
      <AuthorizeUser>
        <Resource />
      </AuthorizeUser>
    ),
  },
  {
    path: "/side",
    element: (
      <AuthorizeUser>
        <Sidebar />
      </AuthorizeUser>
    ),
  },
  {
    path: "/resource/addresource",
    element: (
      <AuthorizeUser>
        <AddResource />
      </AuthorizeUser>
    ),
  },
  {
    path: "/resource/asinglepost/:id",
    element: (
      <AuthorizeUser>
        <SingleAdminPost />
      </AuthorizeUser>
    ),
  },
  {
    path: "/resource/edit/:id",
    element: (
      <AuthorizeUser>
        <EditPost />
      </AuthorizeUser>
    ),
  },
  {
    path: "/cresource",
    element: (
      <AuthorizeUser>
        <Aresource />
      </AuthorizeUser>
    ),
  },
  {
    path: "cresource/singlepost/:id",
    element: (
      <AuthorizeUser>
        <SinglePost />
      </AuthorizeUser>
    ),
  },
  {
    path: "/services",
    element: (
      <AuthorizeUser>
        <Services />
      </AuthorizeUser>
    ),
  },
  {
    path: "/serviceslist",
    element: (
      <AuthorizeUser>
        <ServicessList />
      </AuthorizeUser>
    ),
  },
  {
    path: "/servicesedit/:id",
    element: (
      <AuthorizeUser>
        <EditServicess />
      </AuthorizeUser>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
