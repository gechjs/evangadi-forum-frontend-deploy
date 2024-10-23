import React, { useEffect, useRef, useState } from "react";
import classes from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";
import Auth from "../../components/auth/Auth";
import { ClipLoader } from "react-spinners"; 

function LoginForm({ setIsAuthenticated, isAuthenticated }) {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailDom.current.value;
    const password = passwordDom.current.value;

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      setSuccessMessage(""); 
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setIsAuthenticated(true);
      const { username, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ username }));

      setSuccessMessage("Login successful!"); 
      setErrorMessage("");
      navigate("/");
      emailDom.current.value = "";
      passwordDom.current.value = "";
    } catch (error) {
      const errorMessage = error.response?.data?.msg || error.message || "An error occurred.";
      setErrorMessage("Login failed: " + errorMessage); 
      setSuccessMessage(""); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Auth>
      <div className={classes.login__form__container}>
        <div className={classes.login__form__wrapper}>
          <h3>Login to your account</h3>
          {errorMessage && <p className={classes.errorMessage} aria-live="assertive">{errorMessage}</p>} 
          {successMessage && <p className={classes.successMessage} aria-live="polite">{successMessage}</p>}
          <p className={classes.option}>
            Don’t have an account?{" "}
            <Link to="/register">Create a new account</Link>
          </p>
          <form className={classes.login__form} onSubmit={handleSubmit}>
            <input
              ref={emailDom}
              type="email"
              placeholder="Email address"
              required
            />
            <input
              ref={passwordDom}
              type="password"
              placeholder="Password"
              required
            />
            <div className={classes.forgot__pass}>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button className={classes.join_btn} type="submit" disabled={loading}>
              {loading ? <ClipLoader size={26} color="#fff" loading={loading} /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </Auth>
  );
}

export default LoginForm;  
