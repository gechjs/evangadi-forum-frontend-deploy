import React, { useState } from "react";
import classes from "./Header.module.css";
import headerLogo from "../../assets/evangadi.png";
import { useNavigate, Link } from "react-router-dom";

import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

function Header() {
  const userExist = localStorage.getItem("user");
  const navigate = useNavigate();
  const [drop, setDrop] = useState(false);
  const handleToggle = () => {
    setDrop((prev) => !prev);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header>
      <div className={classes.header__container}>
        <div className={classes.logo}>
          <a href="#">
            <img src={headerLogo} alt="logo" />
          </a>
        </div>
        <div className={classes.header__links}>
          <Link to={"/"}>Home</Link>
          <a href="#">How it works</a>
          {userExist ? (
            <div className={classes.log__out} onClick={handleLogout}>
              Log Out
            </div>
          ) : (
            <Link to={"/login"} className={classes.join_btn}>Sign In</Link>
          )}
        </div>
        <HiOutlineMenu
          onClick={handleToggle}
          size={40}
          className={`${classes.menu_icon} ${drop ? classes.clicked : ""}`}
        />
      </div>
      <div>
        <div
          className={`${classes.header__dropdown} ${drop ? classes.show : ""}`}
        >
          <div>
            <IoMdClose
              onClick={handleToggle}
              className={classes.termintate_icon}
              color="black"
              size={30}
            />
          </div>
          {/* dropdown content start here */}
          <div className={classes.dropdown_content}>
            <a href="#">Home</a>
            <a href="#">How it works</a>
            {userExist ? (
              <div className={classes.log__out} onClick={handleLogout}>
                Log Out
              </div>
            ) : (
              <Link to="/login" className={classes.join_btn_brop}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
