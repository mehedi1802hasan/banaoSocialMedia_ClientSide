import React, { createContext, useEffect, useState } from 'react';
import app from './Firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
export const AuthContext = createContext(null)

const Provider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const LoginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };
    const RegistrationUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const googleProvider = new GoogleAuthProvider();
    const googleLogin=()=>{
      return signInWithPopup(auth,googleProvider)
   }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('auth state changed', currentUser)
            setLoading(false);
        })
        return () => { unsubscribe() }
    }, [])
    const LogOut = () => {
        return signOut(auth)
    }
    const updateUserProfile=(name,photo)=>{
        return  updateProfile(auth.currentUser,{
           displayName: name, photoURL: photo
         })
        
       }
    const authInfo = {
        user, loading, LoginUser, RegistrationUser, LogOut,updateUserProfile,googleLogin
    };

    return (
        <div>
            <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
        </div>
    );
};

export default Provider;