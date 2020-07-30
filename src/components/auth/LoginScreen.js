import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startWithEmailPassword, startWithGoogle } from "../../actions/auth";

export const LoginScreen = () => {
  const [values, handleInputChange, reset] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const dispatch = useDispatch();

  const { ui } = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startWithEmailPassword(email, password));
    reset();
  };

  const handleGoogle = () => {
    dispatch(startWithGoogle());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      {ui.msgError !== null && (
        <div className="auth__alert-error">{ui.msgError}</div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={ui.loading}
        >
          Login
        </button>
        <hr />
        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link className="link" to="/auth/register">
          Create new account
        </Link>
      </form>
    </>
  );
};
