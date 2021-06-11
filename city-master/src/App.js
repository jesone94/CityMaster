import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { Main } from "./components/main/Main";
import SignUp from "./components/form/SignUp";
import PrivateRoute from "./firebase/PrivateRoute";
import SignIn from "./components/form/SignIn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrivateOffice } from "./components/privateOffice/privateOfiice";
import { fetchUser } from "./redux/userSliceFetches/fetchUserStart";
import LoaderContextProvider from "./context/LoaderContext";
import ModalContextProvider from "./context/ModalChooseLocation";
import { fetchUserAllFavorites } from "./redux/userSliceFetches/fetchUserAllFavorites";
import { fetchUserScrore } from "./redux/userSliceFetches/fetchUserScore";
import { Favorites } from "./components/favorites/Favorites";
import Statistic from "./components/Statistic/Statistic.jsx";

function App() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserAllFavorites(uid));
    dispatch(fetchUserScrore(uid));
  }, [uid]);


  const { userEmail } = useSelector((state) => state.user);


  return (
    <>

      <LoaderContextProvider>
        <ModalContextProvider>
          <Router>
            <NavBar />

            <Switch>
              <PrivateRoute exact path="/" component={Main} />
              <Route exact path="/signup">
                {!userEmail ? <SignUp /> : <Redirect to="/" />}
              </Route>

              <Route exact path="/signup">
                {!userEmail ? <SignUp /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/signin">
                {!userEmail ? <SignIn /> : <Redirect to="/" />}
              </Route>

              <PrivateRoute
                exact
                path="/private-office"
                component={PrivateOffice}
              />
              <Route exact path="/fade"></Route>
              <PrivateRoute exact path="/favorites" component={Favorites} />

              <PrivateRoute
                exact
                path="/private-office"
                component={PrivateOffice}
              />
              <PrivateRoute exact path="/stats" component={Statistic} />

              <Route exact path="/"></Route>
            </Switch>
          </Router>
        </ModalContextProvider>
      </LoaderContextProvider>

    </>
  );
}

export default App;
