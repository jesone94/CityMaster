import { useEffect, useState } from "react";
import mySpots from "../../images/mySpots4.gif";
import style from './myLogotip.module.css'



export const MyLogotip = () => {

  return (
    <>
    <div className={style.formImg}>
    <img src={mySpots} alt="не найдено"/>
  </div>
  </>
  )
}
