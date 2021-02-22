import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "41%",
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

const AddTecks = ({ setTecks }) => {
  const [user, setUser] = useState({});

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
  const history = useHistory();
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm();
  const handleForm = (data) => {
    console.log(data, token);
    axios
      .post(
        `https://kenziehub.me/users/techs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        data
      )
      .then((response) => {
        reset();
        history.push("/home");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <h1>new tech</h1>
      <form className={classes.form} onSubmit={handleSubmit(handleForm)}>
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="title"
          name="title"
          variant="outlined"
          inputRef={register}
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="status"
          variant="outlined"
          name="status"
          inputRef={register}
        />

        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
        >
          submit
        </Button>
      </form>
    </>
  );
};

export default AddTecks;
