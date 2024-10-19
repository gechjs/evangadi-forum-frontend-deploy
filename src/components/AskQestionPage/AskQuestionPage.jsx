import React, { useState, useRef } from "react";
import classes from "./css/postPage.module.css";
import { IoArrowForwardCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";
import { BeatLoader } from "react-spinners";

const QuestionPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submission, setSubmission] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Create refs for the input fields
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

   
    if (!title && !content) {
      setError("Please fill both title and content.");
      titleRef.current.focus(); 
      return;
    }
    if (!title) {
      setError("Please provide a title.");
      titleRef.current.focus(); 
      return;
    }
    if (!content) {
      setError("Please provide the detail of the question.");
      contentRef.current.focus();
      return;
    }

    if (!token) {
      alert("You need to be logged in to post a question.");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      await axiosInstance.post(
        "/questions",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setContent("");
      setTimeout(() => {
        setIsLoading(false);
        setSubmission(true);
      }, 700);
      setTimeout(() => {
        setSubmission(false);
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("Failed to submit the question. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.postPageContainer}>
        <div className={classes.steps}>
          <h3>Steps To Write A Good Question</h3>
          <div className={classes.underline}></div>
          <ul className={classes.stepsContainer}>
            <li>
              <IoArrowForwardCircle size={20} /> Summarize your problems in a
              one-line title.
            </li>
            <li>
              <IoArrowForwardCircle size={20} /> Describe your problem in more
              detail.
            </li>
            <li>
              <IoArrowForwardCircle size={20} /> Describe what you tried and
              what you expected to happen.
            </li>
            <li>
              <IoArrowForwardCircle size={20} /> Review your question and post
              it here.
            </li>
          </ul>
        </div>
        <h3 className={classes.postTitle}>Post Your Question</h3>
        <div className={classes.spinner}>
          <div>{isLoading && <BeatLoader color="orange" size={40} />}</div>
          <div>
            {submission && (
              <div className={classes.submissionAlert}>
                Question submitted successfully. Redirecting to homepage.{" "}
                <BeatLoader color="orange" size={16} />
              </div>
            )}
          </div>
        </div>

        {error && <div className={classes.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={classes.title}
            placeholder="Question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={titleRef}
          />

          <textarea
            className={classes.textarea}
            placeholder="Question detail ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            ref={contentRef} 
          />

          <button className={classes.button} type="submit" disabled={isLoading}>
            {isLoading ? "Posting..." : "Post Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionPage;
