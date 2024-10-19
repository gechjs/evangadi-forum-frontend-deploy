import React from "react";
import classes from "./Footer.module.css";
import footerLogo from "../../assets/logo.png";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
function Footer() {
  return (
    <footer>
      <div className={classes.footer__container}>
        <div className={classes.footer__logo}>
          <img src={footerLogo} alt="Evangadi Logo hgchjhgvhjgcghc" />
        <div className={classes.social_icons}>
            <div><FaFacebookF size={25}/></div>
            <div><AiFillInstagram size={30}/></div>
            <div><FaYoutube size={30}/></div>
          </div>
        </div>
        <div className={classes.footer__links}>
          <h3>Useful Link</h3>
          <ul>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className={classes.footer__contact}>
          <h3>Contact Info</h3>
          <p>
            <a href="mailto:support@evangadi.com">support@evangadi.com</a>
          </p>
          <p>+1-202-386-2702</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
