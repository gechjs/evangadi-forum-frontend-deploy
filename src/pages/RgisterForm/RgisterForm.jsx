import React, { useRef, useState } from "react";
import classes from "./RgisterForm.module.css";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";
import Auth from "../../components/auth/Auth";
import { ClipLoader } from "react-spinners"; 

function RgisterForm() {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userNameDom.current.value;
    const firstName = firstNameDom.current.value;
    const secondName = lastNameDom.current.value;
    const email = emailDom.current.value;
    const password = passwordDom.current.value;

    if (!username || !firstName || !secondName || !email || !password) {
      setErrorMessage("Please provide all  information");
      return;
    }

    setLoading(true); 
    setErrorMessage(""); 

    try {
      await axiosInstance.post("/users/register", {
        username,
        firstname: firstName,
        lastname: secondName,
        email,
        password,
      });
   
      navigate("/login");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.msg || "Something went wrong";
      setErrorMessage(errorMessage);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Auth>
      <div className={classes.form__container}>
        <h3>Join the network</h3>
        {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
        <p className={classes.option}>
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <input ref={userNameDom} type="text" placeholder="Username" />
          <div className={classes.flname}>
            <input ref={firstNameDom} type="text" placeholder="First name" />
            <input ref={lastNameDom} type="text" placeholder="Last name" />
          </div>
          <input ref={emailDom} type="email" placeholder="Email address" />
          <input ref={passwordDom} type="password" placeholder="Password" />
          <label>
            <input type="checkbox" /> I agree to the
            <a href="#"> privacy policy</a> and
            <a href="#"> terms of service</a>.
          </label>
          <button className={classes.join_btn} type="submit" disabled={loading}>
            {loading ? (
              <ClipLoader size={20} color="#fff" loading={loading} />
            ) : (
              "Agree and Join"
            )}
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
