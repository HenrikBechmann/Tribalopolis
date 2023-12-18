// FirebaseProviders.tsx
// copyright (c) 2023-present Henrik Bechmann, Toronto, Licence: GPL-3.0

// react
import React, { useContext, useEffect, useRef, useState } from 'react'

// firebase
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"
import firebaseConfig from '../firebaseConfig'
import { getFunctions, httpsCallable } from "firebase/functions"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// FirebaseProvider

const 
    firebaseApp = initializeApp(firebaseConfig),
    FirebaseAppContext = React.createContext(firebaseApp),

    auth = getAuth(firebaseApp),
    AuthContext = React.createContext(auth),

    UserDataContext = React.createContext(null),

    firestore = getFirestore(firebaseApp),
    FirestoreContext = React.createContext(firestore),

    storage = getStorage(firebaseApp),
    StorageContext = React.createContext(storage)

const FirebaseProviders = ({children}) => {

    return <FirebaseAppContext.Provider value = {firebaseApp}>
    <AuthContext.Provider value = {auth} >
    <UserProvider>
    <FirestoreContext.Provider value = {firestore}>
    <StorageContext.Provider value = {storage}>
        {children}
    </StorageContext.Provider>
    </FirestoreContext.Provider>
    </UserProvider>
    </AuthContext.Provider>
    </FirebaseAppContext.Provider>
}

export default FirebaseProviders

// special requirements for onAuthStateChanged
export const UserProvider = ({children}) => {

    const 
        [userData, setUserData] = useState(undefined),
        authStateUnsubscribeRef = useRef(null),
        isMountedRef = useRef(true)

    useEffect(()=>{

        return () => {
            isMountedRef.current = false
        }

    },[])

    useEffect(()=>{

        isMountedRef.current = true
        authStateUnsubscribeRef.current = onAuthStateChanged(auth, async (user) => {

            let userData = null

            if (user) {
                const 
                    superUser = {
                        isSuperUser:false,
                        errorCondition:false,
                    },
                    functions = getFunctions(),
                    isSuperUser = httpsCallable(functions, 'isSuperUser')

                try {
                    const result:any = await isSuperUser()
                    superUser.isSuperUser = result.data.isSuperUser
                    // console.log('result, superUser',result, superUser)
                } catch (error) {
                    superUser.errorCondition = true
                }

                userData = {
                    authUser:user,
                    sysadminStatus:superUser
                }
            }

            setUserData(userData)
        })

        return () => {
            if (!isMountedRef.current) {
                authStateUnsubscribeRef.current()
            }
        }

    },[])

    return (
        <UserDataContext.Provider value = {userData} >
            {children}
        </UserDataContext.Provider>
    )

}

// context access

const useFirebaseApp = () => {
    return useContext(FirebaseAppContext)
}

const useAuth = () => {
    return useContext(AuthContext)
}

const useUserData = () => {
    return useContext(UserDataContext)
}

const useFirestore = () => {
    return useContext(FirestoreContext)
}

const useStorage = () => {
    return useContext(StorageContext)
}

export {
    useFirebaseApp,
    useAuth,
    useUserData,
    useFirestore,
    useStorage,
}

