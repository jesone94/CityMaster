import React,{ createContext, useState, useContext, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux';

const ModalContext = createContext();

const ModalContextProvider = ({children}) => {
  const [modal, setModal] = useState(false);



  return (
    <ModalContext.Provider value={
      {
        modal
      }
    }>
      {children}
    </ModalContext.Provider>
  )
}
export default ModalContextProvider

export const useModalContext = () => useContext(ModalContext)
