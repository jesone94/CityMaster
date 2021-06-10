import { useEffect, useState } from "react";
import mySpots from "../../images/mySpots.gif";
import style from './myLogotip.module.css'
import Freezeframe from 'freezeframe';


export const MyLogotip = () => {
  const [img, setImg] = useState(false)
  
  const logo = new Freezeframe({
    selector: '#foo',
    trigger: 'click',
    overlay: true,
    responsive: false,
    warnings: false
  });
  
  useEffect(() => {
      setImg(true)
      logo.stop()
  }, [])
  return (
    <>
    <div className={style.formImg}>
    {img && <img id="logo" src={mySpots} alt="не найдено"/>}
  </div>
  </>
  )
}
