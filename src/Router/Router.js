import { createBrowserRouter } from "react-router-dom";
import Courses from "../Pages/Courses/Courses";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Main from "../Pages/Main/Main";
import Payment from "../Pages/Payment/Payment";
import SignUp from "../Pages/Signup/SignUp";
import SignUpLearner from "../Pages/Signup/SignUpLearner";
import Users from "../Pages/Users/Users";
import UserProfile from "../UserProfile/UserProfile";
import AdminRoute from "./AdminRoute/AdminRoute";

import PrivateRouters from './PrivateRouter/PrivateRouters'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/signuplearner',
                element:<SignUpLearner></SignUpLearner>
            },
            {
                path:'/users',
                element: <AdminRoute><Users></Users></AdminRoute>
            },
            {
                path:'/profile',
                element:<PrivateRouters><UserProfile></UserProfile></PrivateRouters>
            },
            {
                path:'/courses',
                element:<PrivateRouters><Courses></Courses></PrivateRouters>
            },
            {
                path:'/payment/:id',
                element:<PrivateRouters><Payment></Payment></PrivateRouters>,
                loader:({params}) => fetch(`http://localhost:5000/payment/${params.id}`)
               
            },
        ]
    }
])

export default router;