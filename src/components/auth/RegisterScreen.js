import React from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { createUserWithEmailPassword } from "../../actions/auth";

export const RegisterScreen = () => {
  const [values, handleInputChange, reset] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();

  const { name, email, password, password2 } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(createUserWithEmailPassword(email, password, name));
      reset();
    }
  };

  const {
    ui: { msgError, loading },
  } = useSelector((state) => state);

  const isFormValid = () => {
    if (name.trim().length < 3) {
      dispatch(setError("El nombre es invalido"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("El correo es invalido"));
      return false;
    } else if (
      !validator.equals(password, password2) ||
      password.trim().length < 4
    ) {
      dispatch(setError("Las claves son incorrectas"));
      return false;
    } else {
      dispatch(removeError());
      return true;
    }
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleSubmit}>
        {msgError !== null && (
          <div className="auth__alert-error">{msgError}</div>
        )}
        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          onChange={handleInputChange}
          value={name}
          required
        />
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="off"
          onChange={handleInputChange}
          value={email}
          required
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
          onChange={handleInputChange}
          value={password}
          required
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
          autoComplete="off"
          onChange={handleInputChange}
          value={password2}
          required
        />
        <button
          className="btn btn-primary btn-block mb-5"
          type="submit"
          disabled={loading}
        >
          Register
        </button>

        <Link className="link" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};
