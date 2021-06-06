import React,{ createContext, useState, useContext, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux';

const LoaderContext = createContext();

const LoaderContextProvider = ({children}) => {
  const [loader, setLoader] = useState(false);
  const [photoLoader, setPhotoLoader] = useState(false)

  const { loading } = useSelector((state) => state.user);
  const { photoLoading } = useSelector((state) => state.user)

  useEffect(() => {
    setLoader(loading)
    setPhotoLoader(photoLoading)
  }, [loading, photoLoading])

  return (
    <LoaderContext.Provider value={
      {
        loader, photoLoader
      }
    }>
      {children}
    </LoaderContext.Provider>
  )
}
export default LoaderContextProvider

export const useLoaderContext = () => useContext(LoaderContext)
