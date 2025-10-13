import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Root from "./Root/Root";
import Contact from "./components/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path: "/", Component: Home },
      { path: "/about", Component: About },
      { path: "/contact", Component: Contact },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
