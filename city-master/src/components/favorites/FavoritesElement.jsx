import { ButtonCls, Button } from "../button/Button";
import SearchIcon from "@material-ui/icons/Search";
import style from "./favorites.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRemoveFavoriteElement } from "../../redux/userSliceFetches/fetchUserRemoveFavoriteElement";
import { GoogleMap, LoadScript, StreetViewPanorama } from "@react-google-maps/api";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";


const panoramaOptions = {
  addressControl: false,
  motionTrackingControl: false,
  linksControl: false,
  enableCloseButton: false,
  showRoadLabels: false,
  clickToGo: false,
  disableDefaultUI: true,
};

const containerStyle = {
  width: "600px",
  height: "300px",
};



export const FavoritesElement = ({ el }) => {
  const  [toggler, setToggler] = useState(false)
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_API_KEY}>
      <div>
        <div key={el.id} className={style.favorites}>
          <h2>{el.place}</h2>
        </div>
        <div className={style.btnWrapperFav}>
          <Button text="Посмотреть панораму" click={
            () => setToggler(true)
          }></Button>
          <ButtonCls
            text="Удалить"
            click={() => {
              dispatch(fetchUserRemoveFavoriteElement({ uid, id: el.id }));
            }}
          ></ButtonCls>
        </div>
      </div>
      <div
        className={style.gameContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CSSTransition
          in={toggler}
          timeout={700}
          classNames="modal"
          mountOnEnter
          unmountOnExit
        >
          <div className={style.modalWrap}>
            <div
              className={style.btnSmall}
              onClick={async (e) => {
                e.stopPropagation();
                setToggler(false);
              }}
            ></div>
            <div className={style.modalPanorama}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                // center={coords}
                zoom={10}
                streetView={false}
              >
                <StreetViewPanorama
                  position={{lat: el.lat, lng: el.lng}}
                  visible={true}
                  options={panoramaOptions}
                />
              </GoogleMap>
              <div className={style.panoramaBtnWrap}>

              <ButtonCls text="Закрыть" click={() => {
                setToggler(false)
              }}/>
            </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </LoadScript>
  );
};
