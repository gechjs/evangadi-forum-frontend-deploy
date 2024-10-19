import React from "react";
import classes from "./AnswerCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function AnswerCard({ answer }) {
  console.log(answer);

  return (
    <div className={classes.question__container}>
      <div className={classes.user__and__question}>
        <div className={classes.user__info}>
          <div className={classes.user__icon}>
            {/* user icon */}
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className={classes.user__email}>{answer?.user_name}</div>
        </div>
        <div className={classes.user__question}>{answer.content}</div>
      </div>

      <div>
       
      </div>
    </div>
  );
}

export default AnswerCard;
