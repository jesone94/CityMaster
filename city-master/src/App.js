import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  NavLink,
  useLocation,

} from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { Main } from "./components/main/Main";
import SignUp from "./components/form/SignUp";
import { AuthProvider } from "./firebase/auth";
import PrivateRoute from "./firebase/PrivateRoute";
import SignIn from "./components/form/SignIn";
import { useEffect, useState } from "react";
import firebase from "./firebase/firebase";
import { fetchFavorites } from "./redux/database/firebaseAllFavorites";
import { useDispatch, useSelector } from "react-redux";
import { PrivateOffice } from "./components/privateOffice/privateOfiice";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { fetchUser } from "./redux/userSliceFetches/fetchUserStart";
import LoaderContextProvider from "./context/LoaderContext";
import ModalContextProvider from "./context/ModalChooseLocation";
import { loadFavorites } from "./redux/userSlice";
import { fetchUserAllFavorites } from "./redux/userSliceFetches/fetchUserAllFavorites";
import { fetchUserScrore } from "./redux/userSliceFetches/fetchUserScore";
import { Favorites } from "./components/favorites/Favorites";
import Statistic from './components/Statistic/Statistic.jsx';


function App() {
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserAllFavorites(uid));
    dispatch(fetchUserScrore(uid))
  }, [dispatch, uid]);

  const routes = [
    { path: '/', Component: Main },
    { path: '/private-office', Component: PrivateOffice },
  ];

  const { userEmail } = useSelector((state) => state.user);

  const [toggler, setToggler] = useState();

  return (
    <>
      {/* <AuthProvider> */}
      <LoaderContextProvider>
        <ModalContextProvider>
          <Router>
            <NavBar />
            <div className="bckgrnd-url"> </div>
            <Switch>

              
              <PrivateRoute exact path="/" component={Main} />
              <Route exact path="/signup">
                {!userEmail ? <SignUp /> : <Redirect to="/" />}
      </Route>
      
              <Route exact path='/signup'>
                {!userEmail ? <SignUp /> : <Redirect to='/' />}

              </Route>
              <Route exact path='/signin'>
                {!userEmail ? <SignIn /> : <Redirect to='/' />}
              </Route>
              {/* <div clasName="container">
              {routes.map(({path, Component}) => <Route key={path} exact path={path}>
                {({match}) => 
                    <CSSTransition
                    in={match != null}
                    timeout={1000}
                    classNames="page"
                    unmountOnExit
                  >
                    <div className="page">
                    {userEmail ? <Component /> : <Redirect to="signin"/>}
                  </div>
                  </CSSTransition>
                }
              </Route>)}
              </div> */}

              <PrivateRoute
                exact
                path="/private-office"
                component={PrivateOffice}
              />
              <Route exact path="/fade"></Route>
              <PrivateRoute exact path="/favorites" component={Favorites} />
             

              <PrivateRoute exact path='/private-office' component={PrivateOffice} />
              <Route exact path='/stats'>
                <Statistic />
              </Route>
              <Route exact path='/'></Route>

            </Switch>
          </Router>
        </ModalContextProvider>
      </LoaderContextProvider>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
