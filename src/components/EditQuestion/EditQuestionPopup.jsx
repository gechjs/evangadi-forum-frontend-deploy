import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import classes from "./EditQuestionPopup.module.css"; // Import custom CSS file
import EditContext from "../../context/EditContext";
import axiosInstance from "../../axios/axiosConfig";

function EditQuestionPopup({ onClose }) {
  const { updateEditState } = useContext(EditContext);
  const { question } = useContext(EditContext);
  const [title, setTitle] = useState(question.question.title);
  const [content, setContent] = useState(question.question.content);
  const questionId = question.question.question_id;
  const token = localStorage.getItem("token");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if both title and content are unchanged
    if (
      question.question.title === title &&
      question.question.content === content
    ) {
      alert("No changes detected. Please update either the title or content.");
      return;
    }

    try {
      axiosInstance.patch(
        `/questions/${questionId}`,
        {
          // This is the body of the request
          title,
          content,
        },
        {
          // This is the config object for headers
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Question updated Successfully!");
      updateEditState(false);
      window.location.href = window.location.href;
    } catch (error) {
      alert("Something went wrong");
      updateEditState(false);
      console.log(error);
    }
    // Handle form submission here
    console.log("Updated Question:", { title, content });
    updateEditState(false);
    // You may also want to call a function to save these changes or update your context
  };

  return (
    <div className={classes.popup__overlay}>
      <div className={classes.popup__container}>
        <button onClick={onClose} className={classes.close__button}>
          <X size={30} />
        </button>
        <div className={classes.popup__content}>
          <div className={classes.question__section}>
            <h2>Edit your question</h2>
            <form onSubmit={handleSubmit}>
              <div className={classes.question__title}>
                <label htmlFor="name">Question title</label> <br />
                <hr />
                <textarea
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className={classes.post__answer__section}>
                <label htmlFor="email"></label>
                <hr />
                <textarea
                  id="content"
                  value={content}
                  onChange={handleContentChange}
                />
                <button type="submit" className={classes.post__button}>
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditQuestionPopup;
