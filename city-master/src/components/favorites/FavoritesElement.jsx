import { ButtonCls, Button } from "../button/Button";
import SearchIcon from "@material-ui/icons/Search";
import style from "./favorites.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRemoveFavoriteElement } from "../../redux/userSliceFetches/fetchUserRemoveFavoriteElement";

export const FavoritesElement = ({ el }) => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);
  return (
    <div>
      <div key={el.id} className={style.favorites}>
        <h2>{el.place}</h2>
      </div>
      <div className={style.btnWrapperFav}>
        <Button text="Посмотреть на карте"></Button>
        <ButtonCls
          text="Удалить"
          click={() => {
            dispatch(fetchUserRemoveFavoriteElement({ uid, id: el.id }));
          }}
        ></ButtonCls>
      </div>
    </div>
  );
};
