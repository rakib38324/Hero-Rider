import React, { useContext } from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContextProvider';
import SmallLoading from '../../Loading/SmallLoading';



const PrivateRouters = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    

    // if(loading){
    //     return <SmallLoading></SmallLoading>
    // }

    // console.log(user)
    if (user){
        return children;
    }

    
    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRouters;