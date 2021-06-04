import { CSSTransition } from "react-transition-group";
import "./spinner.css";
import { useLoaderContext } from "../../context/LoaderContext";
import StartMap from "./StartMap";

export const Spinner = () => {
 
  return (
    <CSSTransition
      in={true}
      // timeout={{
      //   enter: 500,
      //   exit: 500,
      //  }}
      timeout={1000}
      classNames="cube"
      mountOnEnter
      unmountOnExit
    >
      <div className="spinnerContainer">
      <div class="sk-cube-grid">
          <div class="sk-cube sk-cube1"></div>
          <div class="sk-cube sk-cube2"></div>
          <div class="sk-cube sk-cube3"></div>
          <div class="sk-cube sk-cube4"></div>
          <div class="sk-cube sk-cube5"></div>
          <div class="sk-cube sk-cube6"></div>
          <div class="sk-cube sk-cube7"></div>
          <div class="sk-cube sk-cube8"></div>
          <div class="sk-cube sk-cube9"></div>
        </div>
       </div>
    </CSSTransition>
  );
};
