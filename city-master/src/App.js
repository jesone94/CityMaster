import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

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
              <Route exact path="/">
              
              </Route>
              <Route exact path="/">
              
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
