import Avatar from "@material-ui/core/Avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "51%",
    minWidth: "250px",
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
    boxSizing: "border-box",
    minWidth: "200px",
    width: "100%",
    padding: "25px",
    maxWidth: "600px",
    textAlign: "center",
    backgroundColor: "black",
  },
  boxInside: {
    boxSizing: "border-box",
    alignSelf: "center",
    textAlign: "left",
    fontFamily: "Roboto",
    fontWeight: "bold",
    backgroundColor: "yellow",
    minWidth: "230px",
    width: "100%",

    maxWidth: "600px",
  },
  user: {
    padding: "1rem",
    lineHeight: "1.4rem",
    backgroundColor: "gray",
    border: "1px solid",
  },
  techs: {
    padding: "1rem",
    lineHeight: "1.4rem",
    marginTop: "20px",
    backgroundColor: "gray",
  },
}));

const HomePage = ({ setIsAuth }) => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({});

  const [token, setToken] = useState(() => {
    const localToken = localStorage.getItem("token") || "";

    if (!localToken) {
      return "";
    }
    setIsAuth(true);
    return JSON.parse(localToken);
  });

  useEffect(() => {
    axios
      .get("https://kenziehub.me/profile", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (!token) {
    history.push("/register");
  }

  return (
    <div className={classes.box}>
      <div className={classes.boxInside}>
        <div className={classes.user}>
          <Avatar alt={user.name} src={user.Avatar}></Avatar>
          <div>
            username: {user.name}
            {console.log(user)}
          </div>

          <div>biography: {user.bio}</div>

          <div>course module: {user.course_module}</div>

          <div>email: {user.email}</div>
        </div>

        <div className={classes.techs}>
          <h2>techs</h2>
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
