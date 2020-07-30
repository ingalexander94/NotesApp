import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../journal/JournalScreen";
import { firebase } from "../../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import { startingLoadNotes } from "../../actions/notes";

export const AppRouter = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [cheking, setCheking] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        setIsAuth(true);
        dispatch(login(user.uid, user.displayName));
        dispatch(startingLoadNotes());
      } else {
        setIsAuth(false);
      }
      setCheking(false);
    });
  }, [dispatch, setIsAuth, setCheking]);

  if (cheking) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter
            path="/auth"
            isAuthenticated={isAuth}
            component={AuthRouter}
          />
          <PrivateRouter
            path="/"
            isAuthenticated={isAuth}
            component={JournalScreen}
          />
        </Switch>
      </div>
    </Router>
  );
};
