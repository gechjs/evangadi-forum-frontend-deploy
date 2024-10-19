import React from "react";
import classes from "./RgisterForm.module.css";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";
import Auth from "../../components/auth/Auth";

function RgisterForm() {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userNameDom.current.value;
    const firstName = firstNameDom.current.value;
    const secondName = lastNameDom.current.value;
    const email = emailDom.current.value;
    const password = passwordDom.current.value;

    if (!username || !firstName || !secondName || !email || !password) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axiosInstance.post("/users/register", {
        // Use axiosInstance here
        username: username,
        firstname: firstName,
        lastname: secondName,
        email: email,
        password: password,
      });
      alert("Registered Successfully!");
      navigate("/login");
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };
  return (
    <Auth>
      <div className={classes.form__container}>
        <h3>Join the network</h3>
        <p className={classes.option}>
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            ref={userNameDom}
            type="text"
            placeholder="username"
            required
          />

          <div className={classes.flname}>
            <input
              ref={firstNameDom}
              type="text"
              placeholder="First name"
              required
            />

            <input
              ref={lastNameDom}
              type="text"
              placeholder="Last name"
              required
            />
          </div>
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

          <label>
            <input type="checkbox" required /> I agree to the
            <a href="#"> privacy policy</a> and
            <a href="#"> terms of service</a>.
          </label>
          <button className={classes.join_btn} type="submit">
            Agree and Join
          </button>
        </form>
        <p>
          <Link to={"/login"}>Already have an account?</Link>
        </p>
      </div>
    </Auth>
  );
}

export default RgisterForm;
