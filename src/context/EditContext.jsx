import { createContext, useState } from "react";

const EditContext = createContext();

// Create a provider component
export const EditProvider = ({ children }) => {
  const [edit, setEdit] = useState(false);
  const [question, setQuestion] = useState(null); // New state

  // Update function (can be called from any component that consumes the context)
  const updateEditState = (newState) => {
    setEdit(newState);
  };

  const updateQuestion = (newQuestion) => {
    setQuestion(newQuestion);
  };

  return (
    <EditContext.Provider
      value={{ edit, updateEditState, question, updateQuestion }}
    >
      {children}
    </EditContext.Provider>
  );
};

export default EditContext;
