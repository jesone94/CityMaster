import React from 'react';
export default function StatsEl({ data, index }) {
  console.log(data, 'DATA');
  return (
    <div>
      <img src={data.urlImg}></img>
      <span>{index + 1}</span>
      <h1>
        {data.displayName} набрал {data.score}
      </h1>
    </div>
  );
}
