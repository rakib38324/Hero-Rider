import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContextProvider';
import useAdmin from '../../Hooks/UseAdmin';
import BigLoading from '../../Loading/BigLoding';



const AdminRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();



    if(loading || isAdminLoading){
       
        return <BigLoading></BigLoading>
    }

    if (user && isAdmin){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default AdminRoutes;