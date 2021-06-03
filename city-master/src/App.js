import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch, NavLink } from "react-router-dom";
import NavBar from './components/navbar/NavBar';
import { Main } from './components/main/Main';
import SignUp from './components/form/SignUp';
import {AuthProvider} from './firebase/auth'
import PrivateRoute from './firebase/PrivateRoute';
import SignIn from './components/form/SignIn';
import { useEffect } from 'react';
import firebase from './firebase/firebase'
import { fetchUser } from './redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PrivateOffice } from './components/privateOffice/privateOfiice';
import { CSSTransition } from 'react-transition-group';



function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const routes = [
    {path: '/', Component:Main},
    {path: '/private-office', Component:PrivateOffice},
  ]

  const { userEmail } = useSelector((state) => state.user);
 
  return (
    <>
      {/* <AuthProvider> */}
        <Router>
            <NavBar />
            <Switch>
              <PrivateRoute exact path="/" component={Main} />
              <Route exact path="/signup">
                {!userEmail &&  <SignUp />}
              </Route>
              <Route exact path="/signin">
                {!userEmail &&  <SignIn />}
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
              <PrivateRoute exact path="/private-office" component={PrivateOffice} />
              <Route exact path="/fade">
                
              </Route>
              <Route exact path="/">
                
              </Route>
            </Switch>
          </Router>
        {/* </AuthProvider> */}
    </>
  );
}

export default App;
