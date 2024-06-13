import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { Private } from "./routes/Private";

import Home from "./Pages/Home/Home";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Dashboard from "./Pages/Dashboard/Dashborad";
import New from "./Pages/Dashboard/New/New";
import Login from "./Pages/Login/Login";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";

const router = createBrowserRouter( [
    {
        element: <Layout/>,
        children: [
            {
              path:"/",
              element: <Home/>
            },
            {
                path:"/about",
                element: <About/>
            },
            {
                path:"/contact",
                element: <Contact/>
            },
            {
                path:"/productdetail/:id",
                element: <ProductDetail/>
            },
            {
                path:"/dashboard",
                element: <Private><Dashboard/></Private>
            },
            {
                path:"/dashboard/new",
                element: <Private><New/></Private>
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
])

export { router }