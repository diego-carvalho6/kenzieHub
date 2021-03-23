import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "fontsource-roboto";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";

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

const Login = () => {
  const [error, setError] = useState(null);
  const schema = yup.object().shape({
    email: yup.string().email("email invalido").required("campo obrigatorio"),
    password: yup
      .string()
      .min(8, "minimo de 8 digitos")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "senha deve conter Uma letra maiúscula Uma letra minúscula Um número Um caractere especial (ex.: !@#$)"
      )
      .required("campo obrigatorio"),
  });
  const history = useHistory();
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const handleForm = (data) => {
    axios
      .post("https://kenziehub.me/sessions", data)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("token", JSON.stringify(response.data.token));
        reset();
        history.push("/home");
      })
      .catch((e) => setError("email ou senha incorretos"));
  };
  const sendTo = (path) => {
    history.push(path);
  };
  return (
    <div className={classes.box}>
      <h1>Kenzie-Hub</h1>
      <form className={classes.form} onSubmit={handleSubmit(handleForm)}>
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="email"
          name="email"
          variant="outlined"
          inputRef={register}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="password"
          variant="outlined"
          type="password"
          name="password"
          inputRef={register}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
        >
          login
        </Button>
      </form>
      <div className={classes.box}>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => sendTo("/register")}
        >
          Register
        </Button>
        {error ? <div>{error}</div> : console.log(error)}
      </div>
    </div>
  );
};

export default Login;
