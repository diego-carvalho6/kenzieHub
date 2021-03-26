import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import style from "./style.css";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  button: {
    width: "33%%",
    minWidth: "250px",
    margin: "3px",
  },
}));
const ShowUsers = ({ setIsAuth }) => {
  const classes = useStyles();
  const history = useHistory();
  const [nextUrl, setNextUrl] = useState(1);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://kenziehub.me/users?perPage=15&page=${nextUrl}`)
      .then((response) => {
        setUsers(response.data);
      });
  }, [nextUrl]);

  const [token, setToken] = useState(() => {
    const localToken = localStorage.getItem("token") || "";

    if (!localToken) {
      return "";
    }
    setIsAuth(true);
    return JSON.parse(localToken);
  });
  if (!token) {
    history.push("/register");
  }

  return (
    <>
      <div className="box">
        {users.map((element, index) => (
          <div key={index} className="card">
            <div>{element.name}</div>
            <div>{element.email}</div>
            <div>{element.course_module}</div>
            <div>{element.bio}</div>
            <div>{element.contact}</div>
            <div>
              {element.techs.map((element, index) => (
                <div key={index}>
                  <div>{element.title}</div>
                  <div>{element.status}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ textAlign: "center", width: "100%" }}>
          {nextUrl <= 0 ? (
            <Button
              className={classes.button}
              disabled="true"
              variant="contained"
              color="secondary"
            >
              previous page
            </Button>
          ) : (
            <Button
              className={classes.button}
              onClick={() => setNextUrl(nextUrl - 1)}
              variant="contained"
              color="secondary"
            >
              previous page
            </Button>
          )}
          <Button
            className={classes.button}
            onClick={() => history.push("/home")}
            variant="contained"
            color="primary"
          >
            voltar para home
          </Button>
          <Button
            className={classes.button}
            onClick={() => setNextUrl(nextUrl + 1)}
            variant="contained"
            color="secondary"
          >
            next page
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShowUsers;
