import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatsData } from '../../redux/statsSlice';
import { Loader } from '../loader/Loader';
import StatsEl from '../StatsElement/StatsEl';

export default function Statistic() {
  const { data } = useSelector((state) => state.stats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStatsData());
  }, [dispatch]);

  console.log(data);

  return data !== null ? (
    data.map((el, index) => {
      return <StatsEl data={el} index={index} />;
    })
  ) : (
    <Loader />
  );
}
