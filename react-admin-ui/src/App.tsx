import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "./pages/Blog/blogs/Blogs";
import { Toaster } from "react-hot-toast";
import AddBlog from "./pages/Blog/addBlog/AddBlog";
import Messages from "./pages/Messages/Messages";
import PrivateRoute from "./utils/PrivateRoute";

import BlogUpdate from "./pages/Blog/blogUpdate/BlogUpdate";
import Promotions from "./pages/Promotion/promotions/promotions";
import AddPromotion from "./pages/Promotion/addPromotions/AddPromotion";
import UpdatePromotion from "./pages/Promotion/updatePromotion/UpdatePromotion";
import Order from "./pages/Order/Orders/Order";
import DetailOrder from "./pages/Order/DetailOrder/DetailOrder";
import MoneyStatistics from "./pages/Money_Statistics/MoneyStatistics";
import ProductOrderStatistics from "./pages/Product_Statistics/Product_Order_Statistics";
import Products from "./pages/Product/Products/Products";
import UpdateProduct from "./pages/Product/UpdateProduct/UpdateProduct";
import AddProduct from "./pages/Product/addProduct/AddProduct";

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
            // product
            {
              path: "/products",
              element: <Products />,
            },
            {
              path: "/addProduct",
              element: <AddProduct />,
            },
            {
              path: "/UpdateProduct/:id",
              element: <UpdateProduct />,
            },
            // promotion
            {
              path: "/promotions",
              element: <Promotions />,
            },
            {
              path: "/addPromotion",
              element: <AddPromotion />,
            },
            {
              path: "/promotions/:id",
              element: <UpdatePromotion />,
            },

            // blog
            {
              path: "/blogs",
              element: <Posts />,
            },
            {
              path: "/blog/:id",
              element: <BlogUpdate />,
            },
            {
              path: "/addBlog",
              element: <AddBlog />,
            },
            //user
            {
              path: "/users",
              element: <Users />,
            },
            {
              path: "/user/:id",
              element: <User />,
            },
            // message
            {
              path: "/messages",
              element: <Messages />,
            },
            // Order
            {
              path: "/orders",
              element: <Order />,
            },
            {
              path: "/detailorders/:id",
              element: <DetailOrder />,
            },

            //  Statistics
            {
              path: "/money_statistics",
              element: <MoneyStatistics />,
            },
            {
              path: "/product_statistics",
              element: <ProductOrderStatistics />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
