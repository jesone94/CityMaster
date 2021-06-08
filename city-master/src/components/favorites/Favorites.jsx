import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAllFavorites } from "../../redux/userSliceFetches/fetchUserAllFavorites";
import { FavoritesElement } from "./FavoritesElement";
import style from "./favorites.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './favoriteTransition.css'


export const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites, uid } = useSelector((state) => state.user);

  
  useEffect(() => {
    dispatch(fetchUserAllFavorites(uid));

  }, [dispatch, uid, favorites]);

  return (
  
    <div className={style.favoritesContainer}>
      <div className={style.favoritesWrapper}>
      <TransitionGroup component='div'>
      {favorites && favorites.length && favorites.map((el) => 
        <CSSTransition
        key={el.id}
        timeout={600}
        classNames="favoriteTransition"
       >
       <FavoritesElement el={el} />
       </CSSTransition>
      )}
      </TransitionGroup>
  
      </div>
    </div>

  );
};
