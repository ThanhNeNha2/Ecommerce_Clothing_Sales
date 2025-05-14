import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "./pages/Blog/blogs/Blogs";
import toast, { Toaster } from "react-hot-toast";
import AddBlog from "./pages/Blog/addBlog/AddBlog";

import Messages from "./pages/Messages/Messages";
import PrivateRoute from "./utils/PrivateRoute";
import AddProduct from "./pages/addProduct/AddProduct";
import BlogUpdate from "./pages/Blog/blogUpdate/BlogUpdate";
import Promotions from "./pages/Promotion/promotions/promotions";
import AddPromotion from "./pages/Promotion/addPromotions/AddPromotion";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Toaster position="top-right" />
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Login />,
    },
    {
      path: "/",
      element: <PrivateRoute />, // Kiểm tra đăng nhập
      children: [
        {
          path: "/",
          element: <Layout />, // Layout chứa các thành phần chính
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/users",
              element: <Users />,
            },
            {
              path: "/products",
              element: <Products />,
            },
            {
              path: "/blogs",
              element: <Posts />,
            },
            {
              path: "/promotions",
              element: <Promotions />,
            },
            {
              path: "/messages",
              element: <Messages />,
            },
            {
              path: "/blog/:id",
              element: <BlogUpdate />,
            },
            {
              path: "/addBlog",
              element: <AddBlog />,
            },
            {
              path: "/addPromotion",
              element: <AddPromotion />,
            },
            {
              path: "/addProduct",
              element: <AddProduct />,
            },
            {
              path: "/user/:id",
              element: <User />,
            },
            {
              path: "/products/:id",
              element: <Product />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
