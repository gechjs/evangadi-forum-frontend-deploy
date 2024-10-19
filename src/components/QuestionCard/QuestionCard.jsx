import React, { useContext } from "react";
import classes from "./QuestionCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import EditContext from "../../context/EditContext";

function QuestionCard({ question }) {
  const { updateEditState, updateQuestion } = useContext(EditContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleEditClick = (e) => {
    e.stopPropagation();
    updateEditState(true);
    updateQuestion({question});
  };

  const toAnswers = (id) => {
    navigate(`/answers/${id}`);
  };

  return (
    <div
      onClick={() => toAnswers(question?.question_id)}
      key={question?.id}
      className={classes.question__container}
    >
      <div className={classes.user__and__question}>
        <div className={classes.user__info}>
          <div className={classes.user__icon}>
            {/* user icon */}
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className={classes.user__email}>{question?.username}</div>
        </div>
        <div className={classes.user__question}>{question?.title}</div>
      </div>

      <div>
        {/* Arrow/edit icon */}
        {user.userid == question.user_id ? (
          <FaRegEdit onClick={handleEditClick} className={classes.edit__icon} />
        ) : (
          <MdOutlineKeyboardArrowRight
            className={classes.bold__arrow}
            size={50}
          />
        )}
      </div>
    </div>
  );
}

export default QuestionCard;
