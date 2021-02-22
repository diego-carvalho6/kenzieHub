import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    margin: "3px",
  },
  form: {
    fontFamily: "roboto",
  },
  textField: {
    minWidth: "200px",
    width: "70%",
    maxWidth: "400px",
    margin: "7px",
  },
  box: {
    minWidth: "250px",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [tecks, setTecks] = useState(user.techs);
  const [token, setToken] = useState(() => {
    const sessionToken = localStorage.getItem("token") || "";
    return JSON.parse(sessionToken);
  });

  useEffect(() => {
    axios
      .get("https://kenziehub.me/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      <div>
        {user.name}
        {console.log(user)}
      </div>

      <div>{user.bio}</div>

      <div>{user.course_module}</div>

      <div>{user.email}</div>
      <div>
        <div>
          {user.techs?.map((element, index) => (
            <div key={index}>
              {element.title}: {element.status}
            </div>
          ))}
        </div>
      </div>
      <Button
        className={classes.button}
        onClick={() => history.push("/newTeck")}
        variant="contained"
        color="primary"
      >
        register new Tech
      </Button>
      <Button
        className={classes.button}
        onClick={() => history.push("/Users")}
        variant="contained"
        color="secondary"
      >
        show Users
      </Button>
      <div>{/* <AddTecks tecks={tecks} setTecks={setTecks}></AddTecks> */}</div>
    </div>
  );
};

export default HomePage;
