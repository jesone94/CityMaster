import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { fetchStatistic } from '../../redux/database/firebaseStatistic'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Text } from "recharts";
import { useSelector } from "react-redux";
import { Tooltip } from "@material-ui/core";
import style from './privateOffice.module.css'


export const Recharts = () => {
    const [data, setData] = useState(null)
    const { uid } = useSelector(state => state.user)
    useEffect(() => {
      fetchStatistic(uid)
        .then((res) => setData(res))
    }, [uid])

    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
      if (window.innerWidth > 1100) {
        setWindowSize(window.innerWidth);
      } 
      if (window.innerWidth < 1000) {
        setWindowSize(1400);
      }
    }, [])

    const handleWindowResize = useCallback((event) => {
      if (window.innerWidth > 1100) {
        setWindowSize(window.innerWidth);
      } 
      if (window.innerWidth < 1000) {
        setWindowSize(1400);
      }
    }, []);

    useEffect(() => {
      window.addEventListener("resize", handleWindowResize);
    }, [handleWindowResize]);


    return (
      <>
      <BarChart
        width={windowSize - 700}
        height={300}
        data={data}
        margin={{ top: 25, right: 30, left: 20, bottom: 45 }}
      >
        <CartesianGrid strokeDasharray="3 3" fill="#fff" stroke="#333"/>
        <XAxis dataKey="data" angle={45} tickMargin={35} stroke="#000" tick={{ fontSize: 20 }}
         label={
          <Text
          x={0}
          y={0}
          dx={50}
          dy={450}
          offset={0}
          angle={-90}
       >Очки:</Text>
         }
        />
        
        <Tooltip />
        <YAxis stroke="#000" tick={{ fontSize: 20 }} label={
          <Text
          x={0}
          y={0}
          dx={80}
          dy={460}
          offset={0}
       >Дата:</Text>
         }/>
        {/* <Legend /> */}
     
        <Bar dataKey="add" fill="#9A764E" />
        <Bar dataKey="reduce" fill="#999" />
        
      </BarChart>
      <div className={style.barWrapper}>
      <div className={style.barSquare}>
        <span>Добавлено:&nbsp;</span>
        <div className={style.firstSquare}></div>
      </div>
      <div className={style.barSquare}>
        <span>Потеряно:&nbsp;</span>
        <div className={style.secondSquare}></div>
      </div>
    </div>
    </>
    );

}
