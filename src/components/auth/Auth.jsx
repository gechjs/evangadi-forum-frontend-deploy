import React from "react";
import classes from "./Auth.module.css";
import { Link } from "react-router-dom";

function Auth({ children }) {
  return (
    <div className={classes.main__box}>
      <div className={classes.container}>
        {/* Form section */}
        {children}

        {/* Info section */}
        <div className={classes.info__container}>
          <a href="">About</a>
          <h2>Evangadi Networks</h2>
          <p>
            No matter what stage of life you are in, whether you're just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p>
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <Link to={"/register"} className={classes.create__account}>
            Create a New Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Auth;
