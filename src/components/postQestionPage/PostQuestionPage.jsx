import React, { useState } from "react";
import classes from "./css/postPage.module.css";
import { IoArrowForwardCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";

const PostQuestionPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submission, setSubmission] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!token) {
      alert("You need to be logged in to post a question.");
      navigate("/login");
      return;
    }
  
    try {
      await axiosInstance.post(
        "/questions",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setSubmission(true);
      setTitle("");
      setContent("");
      

      setTimeout(() => {
        navigate("/");
      }, 2000); 
  
    } catch (error) {
      console.error(error);
      alert("Failed to submit the question. Please try again.");
    }
  };
  

  return (
    <div className={classes.outerContainer}>
      <div className={classes.postPageContainer}>
        <div className={classes.steps}>
          <h3>Steps To Write A Good Question.</h3>
          <div className={classes.underline}></div>
          <ul className={classes.stepsContainer}>
            <li>
              <span>
                <IoArrowForwardCircle size={20} />
              </span>{" "}
              Summarize your problems in a one-line title.
            </li>
            <li>
              <span>
                <IoArrowForwardCircle size={20} />
              </span>{" "}
              Describe your problem in more detail.
            </li>
            <li>
              <span>
                <IoArrowForwardCircle size={20} />
              </span>{" "}
              Describe what you tried and what you expected to happen.
            </li>
            <li>
              <span>
                <IoArrowForwardCircle size={20} />
              </span>{" "}
              Review your question and post it here.
            </li>
          </ul>
        </div>
        <h3 className={classes.postTitle}>Post Your Question</h3>
        {submission && <p className={classes.submission}>question posted successfully</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={classes.title}
            placeholder="Question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className={classes.textarea}
            placeholder="Question detail ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
         


          <button className={classes.button} type="submit">
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostQuestionPage;
