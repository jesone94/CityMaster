import React from 'react';
import style from './StatsEl.css';
export default function StatsEl({ data, index }) {
  console.log(data, 'DATA');
  return (
    <div className={'stats-el'}>
      <span>№{index + 1}</span>
      <div>
        <img src={data.urlImg} width={'50px'} height={'50px'}></img>
      </div>

      <h1>
        {data.displayName} набрал {data.score}
      </h1>
    </div>
  );
}
