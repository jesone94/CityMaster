import React, { useEffect, useState } from "react";
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

    return (
      <>
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" 
         label={
          <Text
          x={0}
          y={0}
          dx={50}
          dy={150}
          offset={0}
          angle={-90}
       >Очки</Text>
         }
        />
        
        <Tooltip />
        <YAxis label={
          <Text
          x={0}
          y={0}
          dx={80}
          dy={280}
          offset={0}
       >Дата</Text>
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
