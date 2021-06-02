// import React, {useEffect, useState, createContext, useContext} from 'react'
// import { useDispatch } from 'react-redux'
// import firebase from './firebase'

// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null)
//   const dispatch = useDispatch()
//   useEffect(() => {
//     firebase.auth().onAuthStateChanged(firebaseUser => {
//       setCurrentUser(firebaseUser)
//     })
//   }, [])

//   // useEffect(() => {
    
//   //   currentUser && dispatch(addPerson(currentUser.email))
    
//   // }, [currentUser, dispatch])

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }
// export const useAuthContext = () => useContext(AuthContext)
