import { useCallback, useEffect, useState } from "react";
import style from "./close.module.css";

export const ButtonClose = ({ text, click, booleanToggle }) => {
  const [toggler, setToggler] = useState()

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    windowSize > 1000 && setToggler(false);
  }, [setWindowSize, windowSize]);

  const handleWindowResize = useCallback((event) => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);


  useEffect(() => {
    setToggler(booleanToggle)
  }, [booleanToggle])

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
