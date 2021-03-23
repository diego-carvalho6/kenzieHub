import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import NewTeck from "../pages/NewTeck";
import UpdateTechs from "../pages/ModifyTechs";
import { useState } from "react";
const Routes = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Switch>
      <Route path="/Home">
        <Home setIsAuth={setIsAuth}></Home>
      </Route>
      <Route path="/Users">
        <Users setIsAuth={setIsAuth}></Users>
      </Route>
      <Route exact path="/newTeck">
        <NewTeck setIsAuth={setIsAuth}></NewTeck>
      </Route>
      <Route path="/Register">
        <Register></Register>
      </Route>
      <Route path="/">
        <Login></Login>
      </Route>
    </Switch>
  );
};

export default Routes;
