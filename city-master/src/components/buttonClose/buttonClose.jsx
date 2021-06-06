import { useState } from "react";
import style from "./close.module.css";

export const ButtonClose = ({ text, click }) => {
  const [toggler, setToggler] = useState(true)

  return (
    <div className={style.menuIconWrapper}  onClick={() => {
      setToggler(prev => !prev)
      click && click()
    }}>
      <div className={toggler ? style.menuIcon : style.menuIconActive}>
        {text}
      </div>
    </div>
  );
};
