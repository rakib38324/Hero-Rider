import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Main from "../Pages/Main/Main";
import SignUp from "../Pages/Signup/SignUp";
import SignUpLearner from "../Pages/Signup/SignUpLearner";
import Users from "../Pages/Users/Users";
import UserProfile from "../UserProfile/UserProfile";

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
                element:<Users></Users>
            },
            {
                path:'/profile',
                element:<UserProfile></UserProfile>
            },
        ]
    }
])

export default router;