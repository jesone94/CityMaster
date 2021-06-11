import React from "react";
import style from "./StatsEl.module.css";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import classNames from 'classnames';

export default function StatsEl({ data, index }) {

  return (
    <> 
      <div className={classNames(style.spanItem ,style.gridStatsItem)}>
      <div className={style.index}><strong>{index + 1}</strong></div>
        <span>
          &nbsp;{data.displayName}
        </span>
      </div>
      <div className={classNames(style.gridStatsItem, style.gridAvatar)}>
        <div className={style.avatarka}>
          {!data.urlImg ? (
            <div className={classNames(style.gridStatsItemImg)}>
              <div className={style.noAvatar}>
              <PhotoCameraIcon className={style.noAvatarScale} style={{ color: "#fff" }}/>
              </div>
            </div>
          ) : (
            <img
          
              src={data.urlImg}
              alt="не найдено"
              className={style.gridStatsItemImg}
              width={"150px"}
              height={"150px"}
            ></img>
          )}
        </div>
      </div>
      <div className={style.points}>
        <div>
        <span>{data.score}</span>    
        </div>  
      </div>
    </>
  );
}
