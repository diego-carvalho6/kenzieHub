import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import NewTeck from "../pages/NewTeck";
import UpdateTechs from "../pages/ModifyTechs";
const Routes = () => {
  return (
    <Switch>
      <Route path="/Home">
        <Home></Home>
      </Route>
      <Route path="/Users">
        <Users></Users>
      </Route>
      <Route exact path="/newTeck">
        <NewTeck></NewTeck>
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
