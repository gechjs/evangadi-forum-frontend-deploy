import React, { useEffect } from "react";
import classes from "./LoginForm.module.css";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";
import Auth from "../../components/auth/Auth";

function LoginForm() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailDom.current.value;
    const password = passwordDom.current.value;
  
    try {
      const response = await fetch("https://evangadi-forum-backend-xvz1.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const {data} = await response
      if (!response.ok) {
        throw new Error(data.message || "Network response was not ok");
      }
      alert("Login Successfully!");
      localStorage.setItem("token", data.token);
    } catch (error) {
      alert("Login failed: " + error.message);
      console.error("Login error:", error);
    }
  };

  return (
    <Auth>
      <div className={classes.login__form__container}>
        <div className={classes.login__form__wrapper}>
          <h3>Login to your account</h3>
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
              <a href="">Forgot password?</a>
            </div>
            <button className={classes.join_btn} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </Auth>
  );
}

export default LoginForm;
