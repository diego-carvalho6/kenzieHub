import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import axios from "axios";
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

const Register = () => {
  const [error, setError] = useState(null);
  const schema = yup.object().shape({
    email: yup.string().email("email invalido").required("campo obrigatorio"),
    name: yup.string().required("campo obrigatorio"),
    password: yup
      .string()
      .min(8, "minimo de 8 digitos")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "senha deve conter Uma letra maiúscula Uma letra minúscula Um número Um caractere especial (ex.: !@#$)"
      )
      .required("campo obrigatorio"),
    bio: yup.string().required("campo obrigatorio"),
    contact: yup.string().required("campo obrigatorio"),
    course_module: yup.string().required("campo obrigatorio"),
  });

  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const sendTo = () => {
    history.push("/");
  };
  const handleForm = (data) => {
    axios
      .post("https://kenziehub.me/users", data)
      .then((response) => {
        reset();
        history.push("/");
      })
      .catch((e) => setError("usuario ja cadastrado"));
  };
  return (
    <div className={classes.box}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(handleForm)} className={classes.form}>
        <TextField
          className={classes.textField}
          label="email"
          variant="outlined"
          name="email"
          size="small"
          inputRef={register}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          className={classes.textField}
          label="password"
          variant="outlined"
          name="password"
          type="password"
          size="small"
          inputRef={register}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          className={classes.textField}
          label="name"
          variant="outlined"
          name="name"
          size="small"
          inputRef={register}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          className={classes.textField}
          label="bio"
          variant="outlined"
          name="bio"
          type="name"
          size="small"
          inputRef={register}
          error={!!errors.bio}
          helperText={errors.bio?.message}
        />
        <TextField
          className={classes.textField}
          label="contact"
          variant="outlined"
          name="contact"
          type="number"
          size="small"
          inputRef={register}
          error={!!errors.contact}
          helperText={errors.contact?.message}
        />
        <TextField
          className={classes.textField}
          label="course_module"
          name="course_module"
          size="small"
          variant="outlined"
          type="name"
          inputRef={register}
          error={!!errors.course_module}
          helperText={errors.course_module?.message}
        />
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </form>

      <Button
        onClick={() => sendTo()}
        className={classes.button}
        variant="contained"
        color="secondary"
      >
        Voltar
      </Button>
      {error ? <div>{error}</div> : console.log(error)}
    </div>
  );
};

export default Register;
