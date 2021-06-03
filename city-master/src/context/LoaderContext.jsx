import React,{ createContext, useState, useContext, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux';

const LoaderContext = createContext();

const LoaderContextProvider = ({children}) => {
  const [loader, setLoader] = useState(false);

  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    setLoader(loading)

  }, [loading])

  return (
    <LoaderContext.Provider value={
      {
        loader
      }
    }>
      {children}
    </LoaderContext.Provider>
  )
}
export default LoaderContextProvider

export const useLoaderContext = () => useContext(LoaderContext)
