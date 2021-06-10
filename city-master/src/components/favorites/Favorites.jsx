import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAllFavorites } from '../../redux/userSliceFetches/fetchUserAllFavorites';
import { FavoritesElement } from './FavoritesElement';
import style from './favorites.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './favoriteTransition.css';
import { Paralax } from '../paralax/Paralax';

export const Favorites = () => {

  const { favorites, uid } = useSelector((state) => state.user);

  return (
    <>
    <Paralax />
    <div className={style.favoritesContainer}>
      <div className={style.favoritesWrapper}>
        <TransitionGroup component='div'>
          {favorites &&
            favorites.length &&
            favorites.map((el) => (
              <CSSTransition key={el.id} timeout={600} classNames='favoriteTransition'>
                <FavoritesElement el={el} />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
    </div>
    </>
  );
};
