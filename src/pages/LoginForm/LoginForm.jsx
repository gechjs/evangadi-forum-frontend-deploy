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

    if (!email || !password) {
      alert("Please provide all required information");
      return;
    }

    try {
      const { data } = await axiosInstance.post("/users/login", {
        email: email,
        password: password,
      });
      alert("Login Successfully!");
      const user = {
        username: data.username,
        userid: data.userId,
      };
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      alert("Something went wrong");
      console.log(error.stack);
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
