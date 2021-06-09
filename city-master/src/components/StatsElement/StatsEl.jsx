import React from "react";
import style from "./StatsEl.module.css";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import classNames from 'classnames';

export default function StatsEl({ data, index }) {
  console.log(data, "DATA");
  return (
    <>
      <div className={classNames(style.spanItem ,style.gridStatsItem)}>
        <span>
          №{index + 1}
          &nbsp;{data.displayName}
        </span>
      </div>
      <div className={classNames(style.gridStatsItem, style.gridAvatar)}>
        <div>
          {!data.urlImg ? (
            <div className={style.gridStatsItemImg}>
              <PhotoCameraIcon />
            </div>
          ) : (
            <img
              src={data.urlImg}
              alt="не найдено"
              className={style.gridStatsItemImg}
              width={"50px"}
              height={"50px"}
            ></img>
          )}
        </div>
      </div>
      <div className={classNames(style.spanItem ,style.gridStatsItem, style.points)}>
        <span>{data.score}</span>
      </div>
    </>
  );
}
