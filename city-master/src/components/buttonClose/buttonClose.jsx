import { useCallback, useEffect, useState } from "react";
import style from "./close.module.css";

export const ButtonClose = ({ text, click }) => {
  const [toggler, setToggler] = useState()

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    windowSize > 1000 && setToggler(false);
    windowSize <= 1000 && setToggler(true);
  }, [setWindowSize, windowSize]);

  const handleWindowResize = useCallback((event) => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);


  return (
    <div className={style.menuIconWrapper}  onClick={() => {
      setToggler(prev => !prev)
      if(click){
        click();
      } 
    }}>
      <div className={toggler ? style.menuIcon : style.menuIconActive}>
        {text}
      </div>
    </div>
  );
};
