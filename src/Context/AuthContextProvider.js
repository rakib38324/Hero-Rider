import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/Firebase.config';

import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword,  signOut, updateProfile} from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app)


const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }



    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const deleteUser = (userInfo) =>{
        setLoading(true)
        return deleteUser(auth.currentUser, userInfo);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

   

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])







    const authInfo = {
        user,
        createUser,
        signIn,
        deleteUser,
        logOut,
        loading,
        setLoading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;