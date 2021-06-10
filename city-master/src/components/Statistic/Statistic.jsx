import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatsData } from '../../redux/statsSlice';
import { Loader } from '../loader/Loader';
import StatsEl from '../StatsElement/StatsEl';
import style from './Stats.module.css';

import classNames from 'classnames';
import { Paralax } from '../paralax/Paralax';

export default function Statistic() {
  const { data } = useSelector((state) => state.stats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStatsData());
  }, [dispatch]);

  console.log(data);

  return  (
    <>
    <Paralax />
    <div className={style.wrapperRaitings}>
    {data !== null ? <><div className={style.title}><h1>Лучшие игроки:</h1></div>
    <div className={style.gridStatsBody}>
    <div className={classNames(style.spanItem ,style.gridStatsItem)}>
        <span>
          Имя:
        </span>
      </div>
      <div className={classNames(style.gridStatsItem, style.gridAvatar, style.spanItem)}>
        <div>
          Фотография профиля:
        </div>
      </div>
      <div className={classNames(style.spanItem ,style.gridStatsItem, style.points)}>
        <span>Количество очков:</span>
      </div>
      {data.map((el, index) => {
        return <StatsEl data={el} index={index} />;
      })}
    </div></>
   : 
    (<Loader />)}
    </div>
  </>
  )
}
