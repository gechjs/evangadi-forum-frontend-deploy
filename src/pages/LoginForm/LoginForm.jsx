import React, { useRef, useState } from "react";
import classes from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";
import Auth from "../../components/auth/Auth";
import { ClipLoader } from "react-spinners"; 

function LoginForm({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailDom.current.value;
    const password = passwordDom.current.value;

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      setSuccessMessage(""); 
      console.log('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      setIsAuthenticated(true);

      const data = response.data;

      const user = {
        username: data.username,
      };
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));
      
      setSuccessMessage("Login successful!"); 
      setErrorMessage("");
      navigate("/");

      emailDom.current.value = "";
      passwordDom.current.value = "";
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || error.message || "An error occurred.";
      setErrorMessage("Login failed: " + errorMessage); 
      setSuccessMessage(""); 
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Auth>
      <div className={classes.login__form__container}>
        <div className={classes.login__form__wrapper}>
          <h3>Login to your account</h3>
          {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>} 
          {successMessage && <p className={classes.successMessage}>{successMessage}</p>}
          <p className={classes.option}>
            Don’t have an account?{" "}
            <Link to="/register">Create a new account</Link>
          </p>
          <form className={classes.login__form} onSubmit={handleSubmit}>
            <input
              ref={emailDom}
              type="email"
              placeholder="Email address"
            />
            <input
              ref={passwordDom}
              type="password"
              placeholder="Password"
            />
            <div className={classes.forgot__pass}>
              <a href="">Forgot password?</a>
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
