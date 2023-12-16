import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Media from "../Pages/Home/Media";
import PostDetails from "../Pages/Home/PostDetails";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/media',
          element:<Media></Media>
        },{
          path:'/media/:id',
          element:<PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
          loader: ({ params }) => fetch(`http://localhost:3000/media/${params.id}`)
        }
      ]

    },{
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/registration',
      element:<Registration></Registration>
    }
  ]);
  export default router;