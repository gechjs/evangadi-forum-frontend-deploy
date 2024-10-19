import classes from "./css/postAnswer.module.css";
import { IoArrowForwardCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PostAnswerPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    
  };
  return (
    <div className={classes.postPageContainer}>
      <div className={classes.steps}>
        <h2>QUESTION</h2>

        <div className={classes.flex_container} >
        <div className={classes.icon_container}>
              {" "}
              <IoArrowForwardCircle color={"#516CEF"} size={34} />
            </div>
          <div>
            <div className={classes.title}>
              <h1>
                {/* question title from database goes here */}
                what is react{" "}
              </h1>
            </div>

            <div className={classes.underline}></div>
            <div className={classes.content_container}>
              {/* content of the question goes here */}
              how does rendering work in react
            </div>
           
          </div>
        
        </div>
      </div>
      <hr />
      <h3 className={classes.postTitle}>Answer From The Community</h3>
      <hr />
      <div>{}</div>
      <form onSubmit={handleSubmit}>
        <textarea className={classes.textarea} placeholder="Your answer ..." />
        <button className={classes.button} type="submit">
          Post Answer
        </button>
      </form>
    </div>
  );
};

export default PostAnswerPage;
