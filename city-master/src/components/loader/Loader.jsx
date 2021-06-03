import { useSelector } from "react-redux";
import "./loader.css";
import { CSSTransition } from "react-transition-group";
import { useLoaderContext } from "../../context/LoaderContext";

export const Loader = () => {
  const { loader } = useLoaderContext();
  return (
    // <CSSTransition
    //   in={loader}
    //   // timeout={{
    //   //   enter: 500,
    //   //   exit: 500,
    //   //  }}
    //   timeout={1000}
    //   classNames="loader"
    //   mountOnEnter
    //   unmountOnExit
    // >
      <div className="modalWrap">
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
      </div>
    // </CSSTransition>
  );
};
